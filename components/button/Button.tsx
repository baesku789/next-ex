import { ButtonHTMLAttributes } from 'react';

interface ButtonProps {
    attr:ButtonHTMLAttributes<any>
    text:string
}

export default function Button(props:ButtonProps) {
    return (
        <button {...props.attr}>
            {props.text}
        </button>
    )
}
