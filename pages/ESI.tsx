import React, { ChangeEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { generateKey } from '../lib/utils';
import Input from '../components/input/Input';
import Button from '../components/button/Button';
import { ESIListItem } from '../lib/api/api';
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
	const [startDate, setStartDate] = useState(202207);
	const [endDate, setEndDate] = useState(202208);

	const { data, isError, refetch, isRefetching } = useQuery(['ESIList'], () =>
		getESIList(startDate, endDate)
	);

	const onDateChange = (e:ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'startDate') {
			setStartDate(parseInt(e.target.value));
		} else {
			setEndDate(parseInt(e.target.value));
		}
	};

	const attr = {
		onClick : () => refetch()
	}

	return (
		<div className={'flex items-center flex-col'}>
			<h1>경제심리지수</h1>
			<div className={'flex gap-10 my-20'}>
				<Input
					type="text"
					placeholder={'202207'}
					onChange={onDateChange}
					maxLength={6}
					name={'startDate'}
				/>
				<Input
					type="text"
					placeholder={'202208'}
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
