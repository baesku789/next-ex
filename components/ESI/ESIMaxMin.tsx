import { getFormattedDate } from '../../lib/utils';

interface ESIMaxMinProps {
    max: number | string;
    maxDate: number | string;
    min: number | string;
    minDate: number | string;
}

export default function ESIMaxMin({ max, maxDate, minDate, min }: ESIMaxMinProps) {
    return (
        <div className={'shadow-md p-10 mb-10 rounded-5'}>
            <div>최고치 : {getFormattedDate(maxDate.toString())} {max}</div>
            <div>최저치 : {getFormattedDate(minDate.toString())} {min}</div>
        </div>
    );
}
