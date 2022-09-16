import { getRouteHref } from '../../lib/utils';
import Image from 'next/image';
import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../../recoil/routes';
import { useRouter } from 'next/router';

interface RouterItemProps {
    name: string;
    sort: string;
}

export default function RouterItem({ name, sort }: RouterItemProps) {
    const routes = useRecoilValue(recoilRoutes);
    const router = useRouter();

    return (
        <div
            className={'border-1 border-black pl-10 flex justify-between rounded-5'}
            onClick={() => router.push(getRouteHref(routes, name))}
        >
            <div>
                <div>
                    <strong>{name}</strong>
                </div>
                <div>{sort}</div>
            </div>
            {
                getRouteHref(routes, name) &&
                <div className={'relative w-24 h-24 my-auto'}>
                    <Image src={'/images/arrow_forward_black.svg'} layout={'fill'} alt={'arrow'} />
                </div>
            }
        </div>
    );
}
