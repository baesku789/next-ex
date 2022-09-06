import React, { InputHTMLAttributes } from 'react';

const Input = (props: InputHTMLAttributes<any>) => {
	return (
		<input
			className={'h-48'}
			{...props}
		/>
	);
};

export default Input;
