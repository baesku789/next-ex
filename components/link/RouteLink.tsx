import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../../recoil/routes';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getRouteHref } from '../../lib/utils';

interface RouteLinkProps {
    title: string;
    children: ReactNode;
}

export default function RouteLink({ title, children }: RouteLinkProps) {
    const routes = useRecoilValue(recoilRoutes);

    const href = getRouteHref(routes, title);

    return (
        <Link href={href}>{children}</Link>
    );
}