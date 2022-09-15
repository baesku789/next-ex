import { generateKey } from '../lib/utils';
import { atom } from 'recoil';

export type RecoilRoutesType = { title: string, href: string, tooltipChildren?: string }[]

export const recoilRoutes = atom({
    key: `recoilRoutes_${generateKey()}`,
    default: [
        {
            title: '경제 일반 ㆍ 경기',
            href: '/economy'
        },
        {
            title: '통계 목록',
            href: '/kosis'
        },
        {
            title: '경제심리지수',
            href: '/ESI',
            tooltipChildren: 'ESIDescription'
        }
    ]
});