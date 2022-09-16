import axios from 'axios';
import { StatisticsDataItem, StatisticsListItem } from './api';

export const instance = axios.create({
    baseURL: 'https://kosis.kr/openapi',
    params: {
        apiKey: 'MzJkNDQyM2RiYjUzMGQxOWYwOGQ4ODlkMmE1ZTczZDQ=',
        format: 'json',
        jsonVD: 'Y'
    }
});

export async function getKosisList() {
    const { data } = await instance.get<StatisticsListItem[]>('/statisticsList.do', {
        params: {
            method: 'getList',
            vwCd: 'MT_ZTITLE',
            parentListId: 'J1',
            version: 'v2_1'
        }
    });

    return data;
}

export async function getPricesList() {
    const { data } = await instance.get<StatisticsListItem[]>('/statisticsList.do', {
        params: {
            method: 'getList',
            vwCd: 'MT_ZTITLE',
            parentListId: 'P2'
        }
    });

    return data;
}

export async function getESIList(startPrdDe = 202201, endPrdDe = 202208) {
    const { data } = await instance.get<StatisticsDataItem[]>('/statisticsData.do', {
        params: {
            method: 'getList',
            userStatsId: 'baesku789/301/DT_513Y001/2/1/20220905184615_1',
            prdSe: 'M',
            startPrdDe,
            endPrdDe
        }
    });

    return data;
}

export async function getCPIList(startPrdDe = 202201, endPrdDe = 202208) {
    const { data } = await instance.get<StatisticsDataItem[]>('/statisticsData.do', {
        params: {
            method: 'getList',
            userStatsId: 'baesku789/101/DT_1J20003/2/1/20220916182202_1',
            prdSe: 'M',
            newEstPrdCnt: 1,
            startPrdDe,
            endPrdDe
        }
    });

    return data;
}

