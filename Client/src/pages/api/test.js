const prisma = require('../../../libs/prismaClient')


export default async function handler(req, res) {
  await prisma.$connect()
  // Take user input
  const { name } = req.body
  // Insert a document into the collection
  await prisma.Justech.create({
    data: {
      name
    }
  })
  // Send a response
  res.status(200).json({
    data: await prisma.Justech.findMany({}),
    message: 'Todo added successfully'
  })
}
