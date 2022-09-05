import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://kosis.kr/openapi',
	params: {
		apiKey: 'MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=',
	},
});

export async function getKosisList() {
	const { data, status } = await instance.get<Response>(
		'/statisticsList.do',
		{
			params: {
				method: 'getList',
				format: 'json',
				jsonVD: 'Y',
				vwCd: 'MT_ZTITLE',
				parentListId: 'J1',
				version: 'v2_1',
			},
		}
	);

	return data;
}
