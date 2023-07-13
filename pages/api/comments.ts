import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';
// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: any, res: any) {

  const { username, content,fileName} = req.body;


  const result = await prisma.comment.create({
    data: {
        username: username,
        content: content,
        postName: fileName
    },
  });
  res.json(result);
}