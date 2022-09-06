import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { generateKey } from '../lib/utils';

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

	const { data, isError } = useQuery(['ESIList'], () =>
		getESIList(startDate, endDate)
	);

	const onDateChange = (e) => {
		if (e.name === 'startDate') {
			setStartDate(e.target.value);
		} else {
			setEndDate(e.target.value);
		}
	};

	if (isError) {
		return <div>Error</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	return (
		<div>
			<h1>경제심리지수</h1>
			<div className={'flex flex-col'}>
				<input
					type="text"
					placeholder={'202207'}
					onChange={onDateChange}
				/>
				<input
					type="text"
					placeholder={'202208'}
					onChange={onDateChange}
				/>
			</div>
			<div>
				{data.map((el, index) => {
					return (
						<div
							key={generateKey(index)}
							className={'my-10'}
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
