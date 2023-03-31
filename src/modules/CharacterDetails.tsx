import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import characterService from '@/services/Characters';
import Layout from '@/components/Layout';
import { Box, Text, Image, Flex, Link, Icon, Checkbox } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import favService from '@/services/Favorites';

export default function CharacterDetails() {
	const route = useRouter();
	const {
		query: { id },
	} = route;

	const getCharacter = useQuery(['getCharacter', id], () =>
		characterService.getById(Number(id)),
	);
	const [fav, setFav] = useState<object[]>([]);

	const getFavorites = useQuery('favorites', () => favService.get());

	useEffect(() => {
		const fav = favService.get();
		setFav(fav);
	}, []);

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
	console.log(getCharacter?.data?.data.id);
	return (
		<Layout>
			<Box>
				<Flex p="16px" alignItems="center">
					<Icon fontSize="16px" as={FiArrowLeft} />
					<Link
						fontSize={{ base: '16px', md: '18px' }}
						onClick={() => route.back()}
					>
						Voltar para página anterior
					</Link>
				</Flex>
				<Flex
					bgColor="white"
					border="1px solid black"
					rounded="md"
					boxShadow="lg"
					mx="auto"
					p="8px"
					m={{ base: 'none', md: '0 auto' }}
					w={{ base: '90%', md: '700px' }}
					flexDir={{ base: 'column', md: 'row' }}
				>
					<Image
						mx="auto"
						w="350px"
						rounded="md"
						src={getCharacter?.data?.data?.image}
						alt={`foto de ${getCharacter?.data?.data?.name} `}
					/>
					<Box p={{ base: '8px', md: '16px' }}>
						<Text>Nome: {getCharacter?.data?.data?.name}</Text>
						<Text>Espêcie: {getCharacter?.data?.data?.species}</Text>
						{getCharacter?.data?.data?.type !== '' && (
							<Text>Tipo: {getCharacter?.data?.data?.type}</Text>
						)}
						<Text>Genêro: {getCharacter?.data?.data?.gender}</Text>
						<Text>Status: {getCharacter?.data?.data?.status}</Text>
						<Text>Origem: {getCharacter?.data?.data?.origin.name}</Text>
						<Text>Localização: {getCharacter?.data?.data?.location.name}</Text>
						<Text>
							Episódios em que aparece:{' '}
							{getCharacter?.data?.data?.episode.length}
						</Text>
						<Checkbox
							type="checkbox"
							onChange={() => handleFavorite(getCharacter?.data?.data)}
							isChecked={fav.some(
								(c: any) => c.id === getCharacter?.data?.data?.id,
							)}
						>
							Favoritar
						</Checkbox>
					</Box>
				</Flex>
			</Box>
		</Layout>
	);
}
