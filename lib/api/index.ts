import axios from 'axios';

export async function getKosisList() {
	const { data, status } = await axios.get<Response>(
		'https://kosis.kr/openapi/statisticsList.do?method=getList&apiKey=MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=&vwCd=MT_ZTITLE&parentListId=J1&format=json&jsonVD=Y&version=v2_1'
	);

	return data;
}
