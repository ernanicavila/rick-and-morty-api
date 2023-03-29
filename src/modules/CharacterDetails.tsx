import React from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import characterService from '@/services/Characters';
import Layout from '@/components/Layout';
import { Box, Text, Image, Flex } from '@chakra-ui/react';
export default function CharacterDetails() {
	const { query } = useRouter();
	const { id } = query;

	const getCharacter = useQuery(['getCharacter', id], () =>
		characterService.getById(Number(id)),
	);

	console.log(getCharacter);

	return (
		<Layout>
			<Box>
				<Flex
					p="8px"
					m={{ base: 'none', md: '0 auto' }}
					w={{ base: '100%', md: '700px' }}
					flexDir={{ base: 'column', md: 'row' }}
				>
					<Image
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
							Episódios em que aparece:
							{getCharacter?.data?.data?.episode.length}
						</Text>
					</Box>
				</Flex>
			</Box>
		</Layout>
	);
}
