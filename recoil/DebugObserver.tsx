import React, { ReactNode, useEffect } from 'react';
import { useRecoilSnapshot } from 'recoil';

export default function DebugObserver ():ReactNode {
    const snapshot = useRecoilSnapshot()
    useEffect(() => {
        console.debug('아톰이 변경되었습니다.')
        for(const node of snapshot.getNodes_UNSTABLE({isModified: true})){
            console.debug(node.key, snapshot.getLoadable(node));
        }
    }, [snapshot])

    return null
}
