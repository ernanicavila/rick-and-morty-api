import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '@/components/Layout';
import characterService from '@/services/Characters';
import { Heading, Flex, Input, Box } from '@chakra-ui/react';
import { IgetAll } from '@/interfaces';
import CharacterCard from '@/components/CharacterCard';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import useDebounce from '@/components/Debounce';

export default function Home() {
	const route = useRouter();
	const [search, setSearch] = useState('');
	const [page, setPage] = useState(1);
	const searchTerms = useDebounce(search, 500);
	const [meta, setMeta] = useState({
		current: 0,
		total: 0,
	});

	const getAll = useQuery(
		['characters', { searchTerms, page }],
		() =>
			characterService.list({
				search: searchTerms,
				page: page,
			}),
		{
			refetchOnWindowFocus: false,
			onSuccess: ({ data }) => {
				setMeta({
					current: page,
					total: data?.info?.pages,
				});
			},
		},
	);
	console.log(getAll.data?.data);
	return (
		<>
			<Layout>
				<Box m="24px">
					<Heading
						textAlign="center"
						m="32px"
						fontSize={{ base: '18px', md: '24px' }}
					>
						Rick And Morty Database
					</Heading>

					<Flex w={{ base: '100%', md: '350px' }}>
						<Input
							value={search}
							onChange={({ target: { value } }) => setSearch(value)}
							placeholder="Digite o nome do personagem"
						/>
					</Flex>
					<Flex
						mx="auto"
						justifyContent={{ base: 'center', md: 'space-between' }}
						flexWrap="wrap"
					>
						{getAll.data?.data?.results.map((el: IgetAll) => (
							<CharacterCard
								name={el.name}
								image={el.image}
								key={el.id}
								status={el.status}
								onClick={() => route.push(`/characters/${el.id}`)}
							/>
						))}
					</Flex>
				</Box>
				<Flex mx="auto" p="16px">
					<Pagination current={page} total={meta?.total} setPage={setPage} />
				</Flex>
			</Layout>
		</>
	);
}
