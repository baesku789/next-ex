import { useRecoilValue } from 'recoil';
import { recoilRoutes } from '../../recoil/routes';
import Link from 'next/link';
import { ReactNode } from 'react';

interface RouteLinkProps {
    title:string
    children:ReactNode
}

export default function RouteLink({title, children}:RouteLinkProps){
    const routes = useRecoilValue(recoilRoutes)

    const href = routes.filter(route => route.title === title)[0] ? routes.filter(route => route.title === title)[0].href : ''

    return (
        <Link href={href}>{children}</Link>
    )
}