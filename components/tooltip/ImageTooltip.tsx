import Image from 'next/image';
import { Tooltip } from './Tooltip';
import { useState } from 'react';

interface ImageTooltipProps {
    imgUrl: string;
    width: number | string;
    height: number | string;
    TooltipChildren: () => JSX.Element;
    alt: string;
}

export default function ImageTooltip({ alt, imgUrl, width, height, TooltipChildren }: ImageTooltipProps) {
    const [display, setDisplay] = useState<'none' | 'flex'>('none');

    return (
        <div className={'relative flex justify-center items-center overflow-visible'} onClick={() => setDisplay('flex')}
             onMouseLeave={() => setDisplay('none')}>
            <Image alt={alt} src={imgUrl} width={width || 24} height={height || 24} />
            <Tooltip parentHeight={24} display={display}>
                <TooltipChildren />
            </Tooltip>
        </div>
    );
}
