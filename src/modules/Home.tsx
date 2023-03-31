import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '@/components/Layout';
import characterService from '@/services/Characters';
import { Heading, Flex, Input, Box, Button, Select } from '@chakra-ui/react';
import { ICharacterDetail } from '@/interfaces';
import CharacterCard from '@/components/CharacterCard';
import { useRouter } from 'next/router';
import Pagination from '@/components/Pagination';
import useDebounce from '@/components/Debounce';
import favService from '@/services/Favorites';

export default function Home() {
	const route = useRouter();
	const [search, setSearch] = useState({
		name: '',
		status: '',
		gender: '',
	});
	const [fav, setFav] = useState<object[]>([]);
	const [page, setPage] = useState(1);
	const searchTerms = useDebounce(search?.name, 500);
	const [meta, setMeta] = useState({
		current: 0,
		total: 0,
	});

	const getAll = useQuery(
		['characters', { page }],
		() =>
			characterService.list({
				search: searchTerms,
				page: page,
				status: search?.status,
				gender: search?.gender,
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

	const handleClick = () => {
		getAll.refetch();
		setPage(1);
	};
	const handleFavorite = (el: any): void => {
		const array = [...fav, el];
		const get = favService.get();
		const check = get?.some((e: { id: number }) => e.id === el.id);

		if (check) {
			const filtered = array.filter((e: any) => e.id !== el.id);
			setFav(filtered);
			favService.create(filtered);
		} else {
			setFav(array);
			favService.create(array);
		}
	};

	React.useEffect(() => {
		const get = localStorage.getItem('favorites');
		if (get) {
			setFav(JSON.parse(get));
		}
	}, []);
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

					<Box>
						<Heading fontSize={{ base: '16px', md: '18px' }}>Filtros</Heading>
						<Flex
							flexDir={{ base: 'column', md: 'row' }}
							w={{ base: '100%', md: '1000px' }}
						>
							<Flex flexWrap="wrap">
								<Input
									w={{ base: '100%', md: '300px' }}
									value={search.name}
									onChange={({ target: { value } }) =>
										setSearch({ ...search, name: value })
									}
									placeholder="Nome do personagem"
								/>
								<Select
									value={search.status}
									w={{ base: '100%', md: '300px' }}
									placeholder="Status"
									onChange={({ target: { value } }) =>
										setSearch({ ...search, status: value })
									}
								>
									<option value="alive">Vivo</option>
									<option value="dead">Morto</option>
									<option value="unknown">Desconhecido</option>
								</Select>
								<Select
									onChange={({ target: { value } }) =>
										setSearch({ ...search, gender: value })
									}
									value={search.gender}
									w={{ base: '100%', md: '300px' }}
									placeholder="Gênero"
								>
									<option value="male">Masculino</option>
									<option value="female">Feminino</option>
									<option value="genderless">Agênero</option>
									<option value="unknown">Desconhecido</option>
								</Select>
							</Flex>
							<Button colorScheme="blue" w="100px" onClick={handleClick}>
								Filtrar
							</Button>
						</Flex>
					</Box>
					<Flex
						mx="auto"
						justifyContent={{ base: 'center', md: 'space-between' }}
						flexWrap="wrap"
					>
						{getAll?.data?.data?.results?.map((el: ICharacterDetail) => (
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
					</Flex>
				</Box>
				<Flex mx="auto" p="16px">
					<Pagination current={page} total={meta?.total} setPage={setPage} />
				</Flex>
			</Layout>
		</>
	);
}
