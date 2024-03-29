import { prisma } from '@real/database';
import getHsMetrics from 'helpers/getHsMetrics';
import type { NextApiRequest, NextApiResponse } from 'next';
import rateLimit from 'helpers/rateLimit';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await limiter.check(res, 100, 'API_LIMIT_TOKEN');
    }
    catch {
        return res.status(429).json({ message: 'Rate limit exceeded' });
    }

    const { highschool } = req.query;

    try {
        const studentResults = await prisma.elev.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const teacherResults = await prisma.profesor.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const parentResults = await prisma.parinte.findMany({
            where: {
                hs: highschool as string,
            },
        });

        const medieAdmitere = await prisma.medieAdmitere.findFirst({
            where: {
                hs: highschool as string,
            },
        });

        const metrics = getHsMetrics({ elevi: studentResults, profesori: teacherResults, parinti: parentResults, medieAdmitere: medieAdmitere?.medie.toNumber()});
        const records = studentResults.length + teacherResults.length + parentResults.length;

        res.status(200).json({ highschool, ...metrics, records});
        return;
    } catch (err) {
        res.status(500).json({ message: "Could not fetch metrics" });
        console.log(err);
        return;
    }

}