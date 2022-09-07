import React, { ChangeEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import ESIList from '../components/ESI/ESIList';

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

	const { data, isError, refetch, isRefetching } = useQuery(['ESIList'], () => fetch('/api/ESI', {
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
		}
	}

	return (
		<div className={'flex items-center flex-col'}>
			<h1>경제심리지수</h1>
			<div className={'flex gap-10 my-20'}>
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
				<Button attr={attr} text={'검색'} />
			</div>
			<ESIList data={data} isError={isError} isRefetching={isRefetching}/>
		</div>
	);
}

export default ESI;
