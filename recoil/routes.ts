import { generateKey } from '../lib/utils';
import { atom } from 'recoil';

export type RecoilRoutesType = { title: string, href: string }[]

export const recoilRoutes = atom({
    key: `recoilRoutes_${generateKey()}`,
    default: [
        {
            title: '경제심리지수',
            href: '/ESI'
        }
    ]
});