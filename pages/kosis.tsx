import { GetStaticProps } from 'next';
import { getKosisList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { getRouteHref } from '../lib/utils';
import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../recoil/routes';
import { useRouter } from 'next/router';

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['kosisList'], getKosisList);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

const Kosis = () => {
    const { data, isRefetching, isError } = useQuery(
        ['kosisList'],
        getKosisList
    );

    const routes = useRecoilValue(recoilRoutes);

    const router = useRouter();

    if (isRefetching) {
        return <div>refetching...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    if (!data) {
        return <div>No data</div>;
    }

    return (
        <div className={'m-auto max-w-screen-sm h-[calc(80vh)] overflow-auto px-10 mt-10'}>
            <div className={'sticky top-0 bg-white z-10'}>
                <h1>통계목록</h1>
                <div>총 개수 : {data.length}</div>
            </div>

            {data.map((el) => (

                <div
                    className={'my-10 border-1 border-black pl-10 flex justify-between rounded-5'}
                    key={el.LIST_NM}
                    onClick={() => router.push(getRouteHref(routes, el.LIST_NM))}
                >
                    <div>
                        <div>

                            <strong>{el.LIST_NM}</strong>

                        </div>
                        <div>{el.VW_NM}</div>
                    </div>
                    {
                        getRouteHref(routes, el.LIST_NM) &&
                        <div className={'relative w-24 h-24 my-auto'}>
                            <Image src={'/images/arrow_forward_black.svg'} layout={'fill'} alt={'arrow'} />
                        </div>
                    }
                </div>

            ))}
        </div>
    );
};

export default Kosis;
