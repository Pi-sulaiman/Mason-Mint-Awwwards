import { NextApiResponse, NextApiRequest } from 'next'
import db from '@/utils/db'
import { getError } from '@/utils/error'
import ProductModel from '../../../models/Product'
import { generateSlug } from '@/utils/string/generateSlug'
import { ObjectId } from 'mongodb'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(400).json({ success: false, message: 'Invalid request method' })
    return
  }
  try {
    await db.connect()
    const body = req.body
    const _id = new ObjectId()
    const slug = generateSlug(body.ProductName)
    const newProduct = new ProductModel({
      ...req.body,
      _id,
      id: _id.toString(),
      slug,
    })
    const product = await newProduct.save()
    res.status(200).json({ success: true, data: product })
  } catch (error) {
    res.status(500).json({ success: false, message: getError(error as Error) })
  }
}

export default handler
