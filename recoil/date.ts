import { atom } from 'recoil';
import { generateKey } from '../lib/utils';

export const recoilDate = atom({
    key: `Date_${generateKey()}`,
    default:
        {
            startDate: 202201,
            endDate: 202208
        }
});