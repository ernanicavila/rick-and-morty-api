import { Flex, Tooltip, IconButton, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IPagination } from '@/interfaces';

function Pagination({ current = 0, total = 0, setPage }: IPagination) {
	console.log('pagination', current, total);
	return (
		<Flex>
			<Tooltip label="Página Anterior">
				<IconButton
					aria-label="Página Anterior"
					onClick={() => setPage(current - 1)}
					isDisabled={current - 1 === 1}
					icon={<FiChevronLeft />}
				/>
			</Tooltip>

			<Flex alignItems="center">
				<Text mr={8}>
					Página{' '}
					<Text fontWeight="bold" as="span">
						{total === 0 ? 0 : current + 1}
					</Text>{' '}
					de{' '}
					<Text fontWeight="bold" as="span">
						{total === 0 ? 0 : total}
					</Text>
				</Text>
			</Flex>

			<Tooltip label="Página Anterior">
				<IconButton
					icon={<FiChevronRight />}
					aria-label="Página Anterior"
					onClick={() => setPage(current + 1)}
					isDisabled={current + 1 === total}
				/>
			</Tooltip>
		</Flex>
	);
}

export default Pagination;
