import { RecoilRoutesType } from '../recoil/routes';

export const generateKey = (pre?) => {
    return `${pre}_${new Date().getTime()}`;
};

// 202202 => 2022년 02월
export const getFormattedDate = (date: string, type?: 'dot') => {
    const year = date.slice(0, 4);
    const month = date.slice(4);

    if (type && type === 'dot') return `${year}.${month}`;
    return `${year}년 ${month}월`;
};

/**
 * 최고치 대비 현재 수치 비율 반환
 * @param max 최고치
 * @param current 현재 수치
 * @return ratio 비율
 */
export const getBarData = (max: number, current: number | string) => {
    if (typeof current !== 'number') current = parseFloat(current);
    return (current / max) * 100;
};

/**
 * 제목에 맞는 href 반환
 * @param routes
 * @param title
 */
export const getRouteHref = (routes: RecoilRoutesType, title) => {
    return routes.filter(route => route.title === title)[0] ? routes.filter(route => route.title === title)[0].href : '';
};