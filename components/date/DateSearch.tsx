import Input from '../input/Input';
import Button from '../button/Button';
import React, { ChangeEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { recoilDate } from '../../recoil/date';

interface DateSearchProps {
    refetch: () => void;
}

export default function DateSearch({ refetch }: DateSearchProps) {
    const defaultStartDate = 202201;
    const defaultEndDate = 202208;

    const [date, setDate] = useRecoilState(recoilDate);

    const onDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === 'startDate') {
            setDate({ ...date, startDate: parseInt(e.target.value) });
        } else {
            setDate({ ...date, endDate: parseInt(e.target.value) });
        }
    };

    const attr = {
        onClick: () => {
            refetch();
        }
    };

    useEffect(() => {
        setDate({
            startDate: 202201,
            endDate: 202208
        });
    }, [setDate]);

    return (
        <div className={'flex gap-10 my-20 justify-center items-center px-20 w-full box-border'}>
            <div className={'flex flex-col row gap-10 w-4/6'}>
                <Input
                    type='number'
                    placeholder={defaultStartDate.toString()}
                    onChange={onDateChange}
                    maxLength={6}
                    name={'startDate'}
                />
                <Input
                    type='number'
                    placeholder={defaultEndDate.toString()}
                    onChange={onDateChange}
                    maxLength={6}
                    name={'endDate'}
                />
            </div>
            <Button width={'w-70'} attr={attr} text={'검색'} />
        </div>
    );
}
