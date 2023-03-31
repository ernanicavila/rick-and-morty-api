import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Box, Text, Image, Flex, Heading } from '@chakra-ui/react';
import CharacterCard from '@/components/CharacterCard';
import favService from '@/services/Favorites';
import { useRouter } from 'next/router';
import { ICharacterDetail } from '@/interfaces';
import { useQuery } from 'react-query';
function Favorites() {
	const [fav, setFav] = useState<object[]>([]);
	const route = useRouter();

	useEffect(() => {
		const fav = favService.get();
		setFav(fav);
	}, []);

	const getFavorites = useQuery('favorites', () => favService.get());
	console.log(getFavorites);

	const handleFavorite = (el: any): void => {
		const array = [...fav, el];
		const get = favService.get();
		const check = get?.some((e: { id: number }) => e.id === el.id);

		if (check) {
			const filtered = array.filter((e: any) => e.id !== el.id);
			setFav(filtered);
			favService.create(filtered);
			getFavorites.refetch();
		} else {
			setFav(array);
			favService.create(array);
			getFavorites.refetch();
		}
	};
	return (
		<Layout>
			<Heading>Favoritos</Heading>
			{getFavorites?.data?.map((el: ICharacterDetail) => (
				<CharacterCard
					name={el.name}
					image={el.image}
					key={el.id}
					status={el.status}
					onClick={() => route.push(`/characters/${el.id}`)}
					favClick={() => handleFavorite(el)}
					isChecked={fav.some((c: any) => c.id === el.id)}
				/>
			))}
		</Layout>
	);
}

export default Favorites;
