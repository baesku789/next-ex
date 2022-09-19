import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { StatisticsDataItem as ESIListItemAPI } from '../lib/api/api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ESIMax } from '../recoil/ESI';
import DataContainer from '../components/container/DataContainer';
import MaxMin from '../components/statistics/MaxMin';
import { getProcessedESIData } from '../lib/preprocessor';
import { recoilDate } from '../recoil/date';
import DateSearch from '../components/date/DateSearch';

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['ESIList'], () => getESIList());

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

function ESI() {
    const { startDate, endDate } = useRecoilValue(recoilDate);

    const setESIMax = useSetRecoilState(ESIMax);

    const { data, isError, refetch, isRefetching } = useQuery<ESIListItemAPI[]>(['ESIList'], () => fetch('/api/ESI', {
            body: JSON.stringify({
                startDate,
                endDate
            }),
            method: 'POST'
        }).then(res => res.json())
    );

    const { min, max, maxDate, minDate } = getProcessedESIData(data);

    useEffect(() => {
        setESIMax(max);
    }, [max, setESIMax]);

    return (
        <div className={'flex items-center flex-col h-screen max-w-600 mx-auto box-border px-10'}>
            <DateSearch refetch={refetch} />
            {data && !isError && <MaxMin max={max} maxDate={maxDate} min={min} minDate={minDate} />}
            <DataContainer data={data} isError={isError} isRefetching={isRefetching} type={'bar'} />
        </div>
    );
}

export default ESI;
