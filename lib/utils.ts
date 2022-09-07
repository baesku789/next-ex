export const generateKey = (pre) => {
	return `${pre}_${new Date().getTime()}`;
};

// 202202 => 2022년 02월
export const getFormattedDate = (date:string) => {
	const year = date.slice(0,4)
	const month = date.slice(4)

	return `${year}년 ${month}월`
}
