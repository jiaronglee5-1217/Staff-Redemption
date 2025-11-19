import React, { useState } from 'react';
import axios from 'axios';

function App() {

  type StaffRedemptionRes = {
  staff: string;
  team: string;
  redeemed_at: string;
  redemption_remark: string;
};
  const [file, setFile] = useState<File | null>(null);
  const [redemptionResponse, setRedemtionResponse] = useState<StaffRedemptionRes[]>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
    const  { data } = await axios.post('http://localhost:4000/api/upload-csv', file, {
      headers: {
        'Content-Type': 'text/csv'
      },
    });
    if (!Array.isArray(data.result)) {
      window.alert(data.result.message);
    } else {
      setRedemtionResponse(data.result);
    }
  } catch (err) {
    console.error(err);
  }
  };


  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', justifyContent: 'center'}}>
      <div  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignSelf: 'center'}}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload CSV</button>
      </div>

      <table border={1} cellPadding={8} hidden={!redemptionResponse} style={{ alignSelf: 'center', width: '100%', marginTop: 30 }}>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Team Name</th>
            <th>Redemption Time</th>
            <th>Remarks</th>
          </tr>
        </thead>

        <tbody>
          {redemptionResponse?.map((staff) => {
            return (
              <tr key={staff.staff}>
                <td>{staff.staff}</td>
                <td>{staff.team}</td>
                <td>{staff.redeemed_at}</td>
                <td>{staff.redemption_remark}</td>
              </tr>
            );
          })}
        </tbody>
    </table>
  </div>
  );
}

export default App;
