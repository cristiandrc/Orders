'use client'
import { useState } from 'react'

const DateHandle = () => {
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [isCheck, setCheck] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.location.href = `/?dateStart=${startDate}&dateEnd=${endDate}&filterCedi=${isCheck}`
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="start">Fecha Inicio</label>
      <input
        id="start"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <label htmlFor="end">Fecha Final</label>
      <input
        id="end"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <label>
        CEDI:
        <input onClick={(e) => setCheck(!isCheck)} type="checkbox" />
      </label>
      <button type="submit">Enviar</button>
    </form>
  )
}

export default DateHandle
