import axios from 'axios';
import { ESIListItem, KosisListItem } from './api';

export const instance = axios.create({
	baseURL: 'https://kosis.kr/openapi',
	params: {
		apiKey: 'MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=',
		format: 'json',
		jsonVD: 'Y',
	},
});

export async function getKosisList() {
	const { data } = await instance.get<KosisListItem[]>('/statisticsList.do', {
		params: {
			method: 'getList',
			vwCd: 'MT_ZTITLE',
			parentListId: 'J1',
			version: 'v2_1',
		},
	});

	return data;
}

export async function getESIList(startPrdDe = 202201, endPrdDe = 202208) {
	const { data } = await instance.get<ESIListItem[]>('/statisticsData.do', {
		params: {
			method: 'getList',
			userStatsId: 'baesku789/301/DT_513Y001/2/1/20220905184615_1',
			prdSe: 'M',
			startPrdDe,
			endPrdDe,
		},
	});

	return data;
}
