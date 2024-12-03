import React, { useState } from 'react';
import './App.css';
import NumberPicker from './components/NumberPicker';
import config from './config';

type Results = {
  number?: number,
  index?: number,
  error?: string
};

interface ApiResponse {
  number: number;
  index: number;
}


const App = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [results, setResults] = useState<Results>()

  const checkNumber = async (number: number) => {
    try {
      setLoading(true)
      const response = await fetch(`${config.API_URL}/${number}`)
      
      if (response.status === 404) {
        setResults({ error: "Number not found" })
        return
      }

      if (!response.ok) {
        setResults({ error: "Unexpected error" })
      }

      const resJson: ApiResponse = await response.json()

      setResults(resJson)
    } catch (error) {
      console.error('Could not fetch', error);
    } finally {
      setLoading(false)
    }
  }

  const renderResult = () => {
    if (!results) {
      return null
    }

    if (results.error) {
      return results.error
    }

    if (results.number === 0 || results.number) {
      return `Found ${results.number} on index ${results.index}`
    }
  }

  return (
    <div className="App">
      <NumberPicker checkNumber={checkNumber} loading={loading} />
      <p>
        {renderResult()}
      </p>
    </div>
  );
}

export default App;
