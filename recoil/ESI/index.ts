import { atom } from 'recoil';

export const ESIMax = atom<number>({
    key: 'currentESIMax',
    default: 0
})