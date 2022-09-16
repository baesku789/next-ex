import { atom } from 'recoil';

export const recoilDate = atom({
    key: 'Date',
    default:
        {
            startDate: 202201,
            endDate: 202208
        }
});