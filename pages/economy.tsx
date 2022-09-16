import { GetStaticProps } from 'next';
import { getKosisList } from '../lib/api';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';
import ListContainer from '../components/container/ListContainer';
import DataContainer from '../components/container/DataContainer';
import React from 'react';
import ListHeader from '../components/header/ListHeader';

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['kosisList'], getKosisList);

    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    };
};

const Economy = () => {
    const { data, isError } = useQuery(
        ['kosisList'],
        getKosisList
    );

    return (
        <ListContainer className={'flex flex-col gap-10'}>
            <ListHeader data={data} />
            <DataContainer data={data} isError={isError} type={'router'} />
        </ListContainer>
    );
};

export default Economy;
