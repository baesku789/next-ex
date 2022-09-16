import ListContainer from '../components/container/ListContainer';
import ListHeader from '../components/header/ListHeader';
import React from 'react';
import RouterItem from '../components/items/RouterItem';

export default function CpList() {
    return (
        <ListContainer className={'flex flex-col gap-10'}>
            <ListHeader length={1} />
            <RouterItem className={'py-10'} name={'소비자물가지수'} />
        </ListContainer>
    );
}