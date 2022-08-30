import { GetStaticProps } from 'next';
import { dehydrate, QueryClient } from '@tanstack/query-core';
import { getKosisList } from '../lib/api';
import { AxiosResponse, KosisListItem } from '../lib/api/api';
import { useQuery } from '@tanstack/react-query';

const Kosis = () => {
	const { data }: AxiosResponse<KosisListItem[]> = useQuery(
		['kosisList'],
		getKosisList
	);

	return (
		<div className={'m-auto max-w-screen-sm h-[calc(50vh)] overflow-auto'}>
			<div className={'sticky top-0 bg-white'}>
				<h1>통계목록</h1>
				<div>총 개수 : {data.length}</div>
			</div>

			{data.map((el) => (
				<div
					className={'my-10 border-1 border-black pl-10'}
					key={el.LIST_NM}
				>
					<div>
						<strong>{el.LIST_NM}</strong>
					</div>
					<div>{el.VW_NM}</div>
				</div>
			))}
		</div>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery(['kosisList'], getKosisList);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};

export default Kosis;
