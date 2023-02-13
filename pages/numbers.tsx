import styles from '@/styles/Numbers.module.css'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

export default function Numbers() {
  const [numbers, setNumbers] = useState<number[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newNumber = [
      ...numbers,
      Number((event.target as HTMLFormElement).number1.value),
    ]
    const res = await fetch('/api/numbers', {
      method: 'POST',
      body: JSON.stringify(newNumber),
    })
    setNumbers(newNumber)
  }

  const getNumbers = async () => {
    const res = await fetch('/api/numbers')
    const numbers = await res.json()
    setNumbers(numbers)
  }

  useEffect(() => {
    getNumbers()
  }, [])

  return (
    <>
      <main className="main">
        <Link href="/" className="link">
          Go to messages
        </Link>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="number1" className="label"></label>
          <input id="number1" type="number" className="input" required />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Previous</th>
                <th>Current</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {numbers
                .map((number, index) => (
                  <tr key={index}>
                    <td>{index > 0 && numbers[index - 1]}</td>
                    <td>{number}</td>
                    <td>
                      {index > 0 ? (numbers[index - 1] + number) / 2 : number}
                    </td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      </main>
    </>
  )
}
