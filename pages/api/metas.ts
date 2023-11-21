import type { NextApiRequest, NextApiResponse } from 'next';
import type { Metadata } from '../../types/metadata';
import fs from 'fs';

const metas = async (req: NextApiRequest, res: NextApiResponse) => {
	const metadatas: Metadata[] = [];
	try {
		const postFiles = fs.readdirSync('./pages/blog');
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
