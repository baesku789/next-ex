import React, { ChangeEvent, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { ESIListItem as ESIListItemAPI } from '../lib/api/api';
import { useSetRecoilState } from 'recoil';
import { ESIMax } from '../recoil/ESI';
import { generateKey } from '../lib/utils';
import DataContainer from '../components/container/DataContainer';
import BarItem from '../components/items/BarItem';
import MaxMin from '../components/statistics/MaxMin';

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
    const defaultStartDate = 202201;
    const defaultEndDate = 202208;

    // 조회 기간
    const [startDate, setStartDate] = useState(defaultStartDate);
    const [endDate, setEndDate] = useState(defaultEndDate);

    const setESIMax = useSetRecoilState(ESIMax);

    const { data, isError, refetch, isRefetching } = useQuery<ESIListItemAPI[]>(['ESIList'], () => fetch('/api/ESI', {
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

    const numberedData = data.map(i => parseFloat(i.DT));
    const max = Math.max(...numberedData);
    const min = Math.min(...numberedData);
    const maxDate = data.filter(i => i.DT === max.toString())[0].PRD_DE;
    const minDate = data.filter(i => i.DT === min.toString())[0].PRD_DE;

    useEffect(() => {
        setESIMax(max);
    });

    return (
        <div className={'flex items-center flex-col h-screen max-w-600 mx-auto box-border'}>
            <div className={'flex gap-10 my-20 justify-center items-center px-20 w-full box-border'}>
                <div className={'flex flex-col row gap-10 w-4/6'}>
                    <Input
                        type='text'
                        placeholder={defaultStartDate.toString()}
                        onChange={onDateChange}
                        maxLength={6}
                        name={'startDate'}
                    />
                    <Input
                        type='text'
                        placeholder={defaultEndDate.toString()}
                        onChange={onDateChange}
                        maxLength={6}
                        name={'endDate'}
                    />
                </div>
                <Button width={'w-70'} attr={attr} text={'검색'} />
            </div>
            <MaxMin max={max} maxDate={maxDate} min={min} minDate={minDate} />
            <DataContainer data={data} isError={isError} isRefetching={isRefetching}>
                {data.map((item, index) =>
                    <BarItem key={generateKey(index)} date={item.PRD_DE} max={max} index={item.DT} />
                )}
            </DataContainer>
        </div>
    );
}

export default ESI;
