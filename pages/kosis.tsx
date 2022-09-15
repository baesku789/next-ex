import KosisItem from '../components/kosis/KosisItem';

export default function Kosis() {
    return (
        <div className={'p-10'}>
            <ul className={'flex flex-col gap-10'}>
                <KosisItem href={'/economy'} title={'경제 일반 ㆍ 경기'} />
                <KosisItem href={'/prices'} title={'물가'} />
            </ul>
        </div>
    );
}
