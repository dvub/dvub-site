import type { NextApiRequest, NextApiResponse } from 'next';
import type Metadata from '../../types/metadata';
import fs from 'fs';
import path from 'path';

const metas = async (req: NextApiRequest, res: NextApiResponse) => {
	const metadatas: Metadata[] = [];
	try {
		const blogPath = path.resolve(process.cwd(), './pages/blog/');

		const postFiles = fs.readdirSync(blogPath);
		for (let post of postFiles) {
			const { meta } = await import(`../blog/${post}`); // dynamic imports

			metadatas.push(meta);
		}
		res.status(200).json(metadatas);
	} catch (error) {
		console.log(error);
		return;
	}
};

export default metas;
