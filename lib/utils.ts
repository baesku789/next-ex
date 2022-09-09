export const generateKey = (pre?) => {
	return `${pre}_${new Date().getTime()}`;
};

// 202202 => 2022년 02월
export const getFormattedDate = (date:string) => {
	const year = date.slice(0,4)
	const month = date.slice(4)

	return `${year}년 ${month}월`
}

/**
 * 최고치 대비 현재 수치 비율 반환
 * @param max 최고치
 * @param current 현재 수치
 * @return ratio 비율
 */
export const getBarData = (max:number, current:number|string) => {
	if(typeof current !== 'number') current = parseFloat(current)
	return (current / max) * 100
}
