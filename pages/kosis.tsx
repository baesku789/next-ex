import LinkItem from '../components/items/LinkItem';

export default function Kosis() {
    return (
        <div className={'p-10'}>
            <ul className={'flex flex-col gap-10'}>
                <LinkItem href={'/economy'} title={'경제 일반 ㆍ 경기'} />
                <LinkItem href={'/prices'} title={'물가'} />
            </ul>
        </div>
    );
}
