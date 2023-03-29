import { render, screen } from '@testing-library/react';
import Home from '../src/modules/Home';
import { fetchMock } from '../utils/mock';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('react-query', () => ({
	useQuery: () => ({
		isLoading: false,
		error: {},
		data: { data: { results: fetchMock } },
	}),
}));

describe('Testes da página inicial', () => {
	it('Verifica se a API é corretamente chamada', async () => {
		render(<Home />);

		const title = screen.getByText(/rick and morty database/i);
		const rick = screen.getByText(/nome: rick sanchez/i);

		expect(rick).toBeInTheDocument();
		expect(title).toBeInTheDocument();
	});

	it('Confere a chamada da função da API', async () => {
		
	});
});
