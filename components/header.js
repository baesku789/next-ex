import React from 'react';
import Image from 'next/image';

const Header = () => {
	return (<div className={'pl-5 border-solid border-gray-50 border-b-2 h-30 flex justify-start items-center'}>
		<Image src={'/images/home_black_24dp.svg'} width={24} height={24}/>
	</div>);
};

export default Header;
