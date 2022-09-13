import React, { ChangeEvent, useEffect, useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import ESIList from '../components/ESI/ESIList';
import { ESIListItem } from '../lib/api/api';
import ESIMaxMin from '../components/ESI/ESIMaxMin';
import Head from 'next/head';
import { useSetRecoilState } from 'recoil';
import { ESIMax } from '../recoil/ESI';

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['ESIList'], () => getESIList());

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

function ESI() {
	const defaultStartDate = 202201
	const defaultEndDate = 202208

	// 조회 기간
	const [startDate, setStartDate] = useState(defaultStartDate);
	const [endDate, setEndDate] = useState(defaultEndDate);

	const setESIMax = useSetRecoilState(ESIMax)

	const { data, isError, refetch, isRefetching } = useQuery<ESIListItem[]>(['ESIList'], () => fetch('/api/ESI', {
		body:JSON.stringify({
			startDate,
			endDate
		}),
		method:'POST'
		}).then(res => res.json())
	);

	const onDateChange = (e:ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'startDate') {
			setStartDate(parseInt(e.target.value));
		} else {
			setEndDate(parseInt(e.target.value));
		}
	};

	const attr = {
		onClick : () => {
			refetch();
		},
	}

	const numberedData = data.map(i => parseFloat(i.DT))
	const max = Math.max(...numberedData)
	const min = Math.min(...numberedData)
	const maxDate = data.filter(i => i.DT === max.toString())[0].PRD_DE
	const minDate = data.filter(i => i.DT === min.toString())[0].PRD_DE

	useEffect(() => {
		setESIMax(max)
	})

	return (
		<div className={'flex items-center flex-col h-screen max-w-600 mx-auto pt-20 box-border'}>
			<Head>
				<title>경제 심리 지수</title>
			</Head>
			<h1>경제심리지수</h1>
			<div className={'flex gap-10 my-20 items-center px-20'}>
				<div className={'flex flex-col row gap-10'}>
					<Input
						type="text"
						placeholder={defaultStartDate.toString()}
						onChange={onDateChange}
						maxLength={6}
						name={'startDate'}
					/>
					<Input
						type="text"
						placeholder={defaultEndDate.toString()}
						onChange={onDateChange}
						maxLength={6}
						name={'endDate'}
					/>
				</div>
				<Button width={'w-70'} attr={attr} text={'검색'} />
			</div>
			<ESIMaxMin max={max} maxDate={maxDate} min={min} minDate={minDate}/>
			<ESIList data={data} isError={isError} isRefetching={isRefetching}/>
		</div>
	);
}

export default ESI;
