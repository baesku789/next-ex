import React from 'react';
import { GetStaticProps } from 'next';
import { getESIList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

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
	const { data, isError } = useQuery(['ESIList'], () => getESIList());

	if (isError) {
		return <div>Error</div>;
	}

	if (!data) {
		return <div>No data</div>;
	}

	return (
		<div>
			<h1>경제심리지수</h1>
			<div>
				{data.map((el, index) => {
					return (
						<div key={index}>
							<div>{el.PRD_DE}</div>
							<div>{el.DT}</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default ESI;
