import React, { useState } from "react"

type NumberPickerProps = {
  checkNumber: (num: number) => void;
  loading: boolean;
};

const NumberPicker: React.FC<NumberPickerProps> =  ({ checkNumber, loading }) => {
  const [number, setNumber] = useState<number>(0)

  const handleSetNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intNumber  = parseInt(e.target.value)

    setNumber(intNumber)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    checkNumber(number)
    setNumber(0)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={number} onChange={handleSetNumber} />
      <button type="submit" disabled={loading} >Check number</button>
    </form>
  )
}

export default NumberPicker
