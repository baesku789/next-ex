import { GetStaticProps } from 'next';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import { getPricesList } from '../lib/api';
import ListContainer from '../components/container/ListContainer';
import DataContainer from '../components/container/DataContainer';
import React from 'react';
import ListHeader from '../components/header/ListHeader';

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['PricesList'], () => getPricesList());

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

export default function Prices() {
    const { data, isError } = useQuery(
        ['PricesList'],
        getPricesList
    );

    return (
        <ListContainer className={'flex flex-col gap-10'}>
            <ListHeader length={data.length} />
            <DataContainer data={data} isError={isError} type={'router'} />
        </ListContainer>
    );
}
