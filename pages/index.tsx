import { Message } from '@/models/message'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

type HomeProps = {
  messages: Message[]
}

function Home({ messages: data }: HomeProps) {
  const [messages, setMessages] = useState<Message[]>(data)
  const [inputs, setInputs] = useState<Message>({
    name: '',
    message: '',
  })
  const [errors, setErrors] = useState<{ name?: string; message?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    })
  }

  const sentMessage = async () => {
    const res = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(inputs),
    })
    const messages = await res.json()
    setMessages(messages)
  }

  useEffect(() => {
    if (isSubmitting) {
      if (!inputs.name) {
        setErrors({ name: 'Name is required.' })
      } else if (!inputs.message) {
        setErrors({ message: 'Message is required.' })
      } else {
        setErrors({})
        sentMessage()
        // submit the form here
      }
      setIsSubmitting(false)
    }
  }, [isSubmitting, inputs])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
  }

  return (
    <>
      <main className="main">
        <Link href="/numbers" className="link">
          Go to numbers
        </Link>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="name" className="label">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={inputs.name}
            className="input"
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label htmlFor="message" className="label">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            onChange={handleInputChange}
            value={inputs.message}
            className={styles.textarea}
          />
          {errors.message && <p className={styles.error}>{errors.message}</p>}
          <button type="submit" className="button">
            Submit
          </button>
        </form>
        <div className={styles.messages}>
          {messages ? (
            messages.map((message, id) => (
              <div key={id} className={styles.card}>
                <div className={styles.cardHeader}>{message.name}</div>
                <div className={styles.cardBody}>{message.message}</div>
              </div>
            ))
          ) : (
            <p>No messages</p>
          )}
        </div>
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const res = await fetch(`http://${req.headers.host}/api/messages`)
  const messages = await res.json()
  return {
    props: { messages },
  }
}

export default Home
