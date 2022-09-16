import { ESIListItem } from '../api/api';

export const getProcessedESIData = (data: ESIListItem[] | undefined) => {
    if (!data) return {
        max: undefined,
        min: undefined,
        maxDate: undefined,
        minDate: undefined
    };

    const numberedData = data.map(i => parseFloat(i.DT));
    const max = Math.max(...numberedData);
    const min = Math.min(...numberedData);
    const maxDate = data.filter(i => i.DT === max.toString())[0].PRD_DE;
    const minDate = data.filter(i => i.DT === min.toString())[0].PRD_DE;

    return {
        max,
        min,
        maxDate,
        minDate
    };
};