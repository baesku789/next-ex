import type { NextApiRequest, NextApiResponse } from 'next';
import { cors, runMiddleware } from './cors';
import { ESIListItem } from '../../lib/api/api';
import { instance } from '../../lib/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const body = JSON.parse(req.body)
    const {startDate, endDate} = body

    await runMiddleware(req, res, cors).catch(err => console.log(err))

    try {
        if( typeof startDate === 'number' && typeof endDate === 'number'){
            const { data } = await instance.get<ESIListItem[]>('/statisticsData.do', {
                params: {
                    method: 'getList',
                    userStatsId: 'baesku789/301/DT_513Y001/2/1/20220905184615_1',
                    prdSe: 'M',
                    startPrdDe:startDate || 202207,
                    endPrdDe:endDate || 202208,
                },
            });

            return res.status(200).json(data)
        }
        throw new Error("startDate 또는 endDate의 타입이 'number'가 아닙니다!")
    }catch (e) {
        let message = 'Error'
        if(e instanceof Error) {
            message = e.message
        }
        return res.status(500).json({err: message})
    }
}