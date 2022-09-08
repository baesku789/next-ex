import { atom } from 'recoil';
import { generateKey } from '../../lib/utils';

export const ESIMax = atom<number>({
    key: `currentESIMax_${generateKey()}`,
    default: 0
})