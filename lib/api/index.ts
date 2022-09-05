import axios from 'axios';
import { KosisListItem } from './api';

const instance = axios.create({
	baseURL: 'https://kosis.kr/openapi',
	params: {
		apiKey: 'MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=',
	},
});

export async function getKosisList() {
	const { data } = await instance.get<KosisListItem[]>('/statisticsList.do', {
		params: {
			method: 'getList',
			format: 'json',
			jsonVD: 'Y',
			vwCd: 'MT_ZTITLE',
			parentListId: 'J1',
			version: 'v2_1',
		},
	});

	console.log(`data ${JSON.stringify(data)}`);

	return data;
}
