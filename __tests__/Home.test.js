import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../src/Redux/store';
import Home from '../src/modules/Home';
import { annie } from '../utils/mock';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('axios', () => {
	return {
		create: jest.fn(() => ({
			get: jest.fn(() =>
				Promise.resolve({
					data: {
						results: annie,
					},
				}),
			),
		})),
	};
});
describe('Testes da tela de Home', () => {
	const query = new QueryClient();
	it('Testa o filtro da pesquisa', async () => {
		const { debug } = render(
			<QueryClientProvider client={query}>
				<Provider store={store}>
					<Home />
				</Provider>
			</QueryClientProvider>,
		);

		await waitFor(() => {
			screen.findByText(/annie/i);
		});
		const search = screen.getByPlaceholderText(/nome do personagem/i);
		const status = screen.getByTestId(/selectStatus/i);
		const gender = screen.getByTestId(/selectGenre/i);
		const btn = screen.getByRole('button', {
			name: /filtrar/i,
		});
		await waitFor(async () => {
			await userEvent.type(search, 'Annie');
			await userEvent.selectOptions(status, 'Vivo');
			await userEvent.selectOptions(gender, 'Feminino');
			expect(search).toHaveValue('Annie');
			expect(status).toHaveValue('alive');
			expect(gender).toHaveValue('female');
		});

		await userEvent.click(btn);
		await waitFor(async () => {
			const btns = screen.getAllByRole('button', {
				name: /visualizar perfil/i,
			});
			expect(btns).toHaveLength(1);
		});

		const btns = screen.getByRole('checkbox', {
			name: /favoritar/i,
		});
		await userEvent.click(btns);

		const local = JSON.parse(localStorage.getItem('favorites'));
		expect(local).toHaveLength(1);
	});
});
