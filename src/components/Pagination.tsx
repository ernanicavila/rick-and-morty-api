import { Flex, Tooltip, IconButton, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { IPagination } from '@/interfaces';

function Pagination({ current = 0, total = 0, setPage }: IPagination) {
	return (
		<Flex>
			<Tooltip label="Página Anterior">
				<IconButton
					aria-label="Página Anterior"
					onClick={() => setPage(current - 1)}
					isDisabled={current - 1 === 0}
					icon={<FiChevronLeft />}
					colorScheme="blue"
				/>
			</Tooltip>

			<Flex alignItems="center">
				<Text m="0 8px">
					Página{' '}
					<Text fontWeight="bold" as="span">
						{total === 0 ? 0 : current}
					</Text>{' '}
					de{' '}
					<Text fontWeight="bold" as="span">
						{total === 0 ? 0 : total}
					</Text>
				</Text>
			</Flex>

			<Tooltip label="Próxima Página">
				<IconButton
					icon={<FiChevronRight />}
					aria-label="Próxima Página"
					onClick={() => setPage(current + 1)}
					isDisabled={current === total}
					colorScheme="blue"
				/>
			</Tooltip>
		</Flex>
	);
}

export default Pagination;
