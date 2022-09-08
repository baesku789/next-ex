import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter()

	return (<div className={'pl-5 border-solid border-gray-50 border-b-2 h-30 flex justify-start items-center'}>
		<Image onClick={() => router.push('/')} src={'/images/home_black_24dp.svg'} width={24} height={24}/>
	</div>);
};

export default Header;
