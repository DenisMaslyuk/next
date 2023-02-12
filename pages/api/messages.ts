import { Message } from '@/models/message'
import type { NextApiRequest, NextApiResponse } from 'next'

const messages: Message[] = [
  { name: 'John Doe', message: 'Hello' },
  { name: 'Jane Doe', message: 'Hello' },
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message[]>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        res.status(200).json(messages)
      } catch (error) {
        res.status(400).json([])
        console.log(error)
      }
      break
    case 'POST':
      try {
        console.log(JSON.parse(body))
        messages.unshift(JSON.parse(body))
        res.status(200).json(messages)
      } catch (error) {
        res.status(400).json([])
        console.log(error)
      }
      break
  }
}
