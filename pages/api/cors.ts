import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next';

// Initializing the cors middleware
export const cors = Cors({
    methods:['GET','POST', 'HEAD']
})

export function runMiddleware(
    req:NextApiRequest,
    res:NextApiResponse,
    fn:Function
) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result:any) => {
            if(result instanceof Error){
                return reject(result)
            }

            return resolve(result)
        })
    })
}