'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const DateHandle = () => {
  const router = useRouter()
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/?dateStart=${startDate}&dateEnd=${endDate}`)
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
      <button type="submit">Enviar</button>
    </form>
  )
}

export default DateHandle
