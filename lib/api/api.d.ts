export interface AxiosResponse<T> {
    data: T;
}

export interface StatisticsListItem {
    LIST_NM: string; // title
    VW_CD: string;
    VW_NM: string;
}

export interface ESIListItem {
    PRD_DE: string; // 202207
    DT: string;
}
