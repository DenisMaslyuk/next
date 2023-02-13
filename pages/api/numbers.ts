import { Message } from '@/models/message'
import type { NextApiRequest, NextApiResponse } from 'next'

let number: number[] = []

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<number[]>,
) {
  const { method, body } = req
  switch (method) {
    case 'GET':
      try {
        res.status(200).json(number)
      } catch (error) {
        res.status(400).json([])
        console.log(error)
      }
      break
    case 'POST':
      try {
        number = [...JSON.parse(body)]
        res.status(200).json(number)
      } catch (error) {
        res.status(400).json([])
        console.log(error)
      }
      break
  }
}
