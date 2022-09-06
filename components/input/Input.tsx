import React, { InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<any>) => {
	return (
		<input
			className={'h-48 text-16 pl-10 border-2 border-transparent border-solid rounded-5 bg-gray-200'}
			{...props}
		/>
	);
};

export default Input;
