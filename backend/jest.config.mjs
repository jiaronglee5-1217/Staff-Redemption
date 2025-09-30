
import { defaults } from 'jest-config';

export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'], 
  rootDir: './',  
  preset: 'ts-jest',  
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], 
  globals: {
    'ts-jest': {
      isolatedModules: true, 
    },
  },
};
