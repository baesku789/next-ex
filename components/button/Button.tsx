import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
    attr:ButtonHTMLAttributes<any>
    text:string
    width:string // w-60
}

/**
 * props 값은 tailwindcss로 작성
 * @param props
 * @constructor
 */
export default function Button(props:ButtonProps) {
    return (
        <button className={`h-48 ${props.width} border-2 box-border rounded-10 border-gray-200 py-10 px-5 hover:bg-gray-100`} {...props.attr}>
            {props.text}
        </button>
    )
}
