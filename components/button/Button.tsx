import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
    attr:ButtonHTMLAttributes<any>
    text:string
}

export default function Button(props:ButtonProps) {
    return (
        <button className={'h-48 border-2 rounded-10 border-gray-200 py-10 px-5 hover:bg-gray-100'} {...props.attr}>
            {props.text}
        </button>
    )
}
