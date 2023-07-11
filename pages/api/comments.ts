import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {

  const { duration, exerciseSession, title, description } = req.body;

  
  const result = await prisma.session.create({
    data: {
        username: req.body.username,
        content: req.body.content
    },
  });
  res.json(result);
}