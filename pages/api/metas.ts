import type { NextApiRequest, NextApiResponse } from 'next'
import type { Metadata } from '../../types/metadata'
import fs from 'fs';

const metas = async (req: NextApiRequest, res: NextApiResponse) => {

    const postInfos: Metadata[] = [];
    const postFiles = fs.readdirSync('./pages/blog');

    for (let post of postFiles) {
        try {
            const { meta } = await import(`../blog/${post}`); // dynamic imports

            postInfos.push(meta);

        } catch (error) {
            // if we have an error, just stop and don't return any data..

            console.log(error);
            return;
        }
        
        res.status(200).json(postInfos)
    }

};

export default metas