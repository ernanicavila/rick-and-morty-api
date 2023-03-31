import { render, screen } from '@testing-library/react';
import Home from '../src/modules/Home';
import { fetchMock, fetchPagination } from '../utils/mock';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('react-query', () => ({
	useQuery: () => ({
		isLoading: false,
		error: {},
		data: { data: { results: fetchPagination } },
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

	it('Confere o fluxo de filtro funciona', async () => {
		render(<Home />);
		const input = screen.getByPlaceholderText(/digite o nome do personagem/i);
		expect(input).toBeInTheDocument();

		await userEvent.type(input, 'Rick Sanchez');
		expect(input).toHaveValue('Rick Sanchez');

		const rick = screen.getByText(/nome: rick sanchez/i);
		expect(rick).toBeInTheDocument();

		await userEvent.type(input, 'Rick Sanchez');
		const button = screen.getAllByRole('button', {
			name: /Visualizar Perfil/i,
		})[0];

		await userEvent.click(button);
	});

	it('Verifica a paginação', async () => {
		render(<Home />);
		const check1 = screen.getByText(/rick sanchez/i);
		const check2 = screen.getByText(/Ants in my Eyes Johnson The Seccond/i);

		const btn1 = screen.getByRole('button', {
			name: /próxima página/i,
		});
		const btn2 = screen.getByRole('button', {
			name: /página anterior/i,
		});

		expect(check1).toBeInTheDocument();
		await userEvent.click(btn1);
		expect(check2).toBeInTheDocument();
		await userEvent.click(btn2);
	});
});
