import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ESIMax } from '../recoil/ESI';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { StatisticsListItem } from '../lib/api/api';
import { getProcessedESIData } from '../lib/preprocessor';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import MaxMin from '../components/statistics/MaxMin';
import DataContainer from '../components/container/DataContainer';
import { GetStaticProps } from 'next';
import { getCPIList } from '../lib/api';

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['CpiList'], () => getCPIList());

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default function Cpi() {
    const defaultStartDate = 202201;
    const defaultEndDate = 202208;

    // 조회 기간
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const setESIMax = useSetRecoilState(ESIMax);

    const {
        data,
        isError,
        refetch,
        isRefetching
    } = useQuery<StatisticsListItem[]>(['CpiList'], () => fetch('/api/cpi', {
            body: JSON.stringify({
                startDate,
                endDate
            }),
            method: 'POST'
        }).then(res => res.json())
    );

    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'startDate') {
            setStartDate(parseInt(e.target.value));
        } else {
            setEndDate(parseInt(e.target.value));
        }
    };

    const attr = {
        onClick: () => {
            refetch();
        }
    };

    const { min, max, maxDate, minDate } = getProcessedESIData(data);

    useEffect(() => {
        setESIMax(max);
    }, [max, setESIMax]);

    return (
        <div className={'flex items-center flex-col h-screen max-w-600 mx-auto box-border px-10'}>
            <div className={'flex gap-10 my-20 justify-center items-center px-20 w-full box-border'}>
                <div className={'flex flex-col row gap-10 w-4/6'}>
                    <Input
                        type='number'
                        placeholder={defaultStartDate.toString()}
                        onChange={onDateChange}
                        maxLength={6}
                        name={'startDate'}
                    />
                    <Input
                        type='number'
                        placeholder={defaultEndDate.toString()}
                        onChange={onDateChange}
                        maxLength={6}
                        name={'endDate'}
                    />
                </div>
                <Button width={'w-70'} attr={attr} text={'검색'} />
            </div>
            {data && !isError && <MaxMin max={max} maxDate={maxDate} min={min} minDate={minDate} />}
            <DataContainer data={data} isError={isError} isRefetching={isRefetching} type={'bar'} />
        </div>
    );
}
