import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [convertedUrl, setConvertedUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [revertedUrl, setRevertedUrl] = useState('');
  const [onClick, setOnclick] = useState(false);

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
   try {
        const res = await axios.post('http://localhost:4000/api/convert', { originalUrl }, {
        headers: {
        'Content-Type': 'application/json'
        }
    });
        setConvertedUrl(res.data.shortUrl);
        } catch (error) {
        console.error("Error converting URL:", error);
        alert("Failed to convert URL. See console for details.");
    }
  };

  const handleRevert = async (e: React.FormEvent) => {
    e.preventDefault();
    setOnclick(true);
   try {
        const res = await axios.post('http://localhost:4000/api/revert', { shortCode }, {
        headers: {
        'Content-Type': 'application/json'
        }
    });
        setRevertedUrl(res.data.revertedUrl);
        } catch (error) {
        console.error("Error reverting URL:", error);
        alert("Failed to  revert URL. See console for details.");
    }
  };

  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h2>Please enter your URL here</h2>
          <form onSubmit={handleConvert}>
            <input
              type="text"
              size={50}
              placeholder="Enter your URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)} />
            <button style={{ marginLeft: '2rem' }} type="submit">Convert</button>
          </form>
          {convertedUrl && (
            <div>
              <p>Converted URL:</p>
              <a href={convertedUrl} target="_blank" rel="noopener noreferrer">{convertedUrl}</a>
              <i style={{ marginLeft: 10 }}>(please remember the short code before refreshing the page)</i>
            </div>
        )}
      </div>
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem'}}>
          <h2>This is to revert the shorten version of URL back to original</h2>
          <i>(please enter the short code on the transfomed URL)</i>
        </div>
        <form onSubmit={handleRevert}>
          <input
            type="text"
            size={50}
            placeholder="Enter the short code given above, (right after 4000/)"
            value={shortCode}
            onChange={(e) => setShortCode(e.target.value)} />
          <button style={{ marginLeft: '2rem' }} type="submit">Revert</button>
        </form>
        <div>
          {onClick && (
            revertedUrl ? (
              <>
                <p>Reverted URL:</p>
                <a href={revertedUrl} target="_blank" rel="noopener noreferrer">{revertedUrl}</a>
              </>
            ) : (
              <p>URL is not found in database, please double check the short code you entered.</p>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default App;
