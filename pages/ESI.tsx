import React, { ChangeEvent, useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { generateKey } from '../lib/utils';
import Input from '../components/input/Input';

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

	const { data, isError, refetch } = useQuery(['ESIList'], () =>
		getESIList(startDate, endDate)
	);

	const onDateChange = (e:ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'startDate') {
			setStartDate(parseInt(e.target.value));
		} else {
			setEndDate(parseInt(e.target.value));
		}
	};

	if (isError) {
		return <div>Error</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	return (
		<div className={'flex items-center flex-col'}>
			<h1>경제심리지수</h1>
			<div className={'flex flex-col my-20'}>
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
			</div>
			<button onClick={() => refetch()}>검색</button>
			<div className={'flex'}>
				{data.map((el, index) => {
					return (
						<div
							key={generateKey(index)}
							className={'mx-10 first:ml-0'}
						>
							<div>{el.PRD_DE}</div>
							<div>
								<strong>{el.DT}</strong>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ESI;
