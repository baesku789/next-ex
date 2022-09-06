import React, { InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<any>) => {
	return (
		<input
			className={'h-48 text-16 pl-10'}
			{...props}
		/>
	);
};

export default Input;
