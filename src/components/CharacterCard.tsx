import React from 'react';
import { Text, Image, Flex, Button } from '@chakra-ui/react';
import { IgetAll } from '@/interfaces';
function CharacterCard({ name, status, image, onClick }: IgetAll) {
	return (
		<>
			<Flex
				p="8px"
				m='8px 0px'
				justifyContent="space-between"
				border="1px solid black"
				w="350px"
			>
				<Flex flexDir="column" justifyContent="center">
					<Text>Nome: {name}</Text>
					<Text>Status: {status}</Text>
					<Button
						mt="8px"
						as="button"
						size="sm"
						colorScheme="green"
						onClick={onClick}
					>
						Visualizar Perfil
					</Button>
				</Flex>
				<Image w="150px" src={image} alt={`foto de ${name}`} />
			</Flex>
		</>
	);
}

export default CharacterCard;
