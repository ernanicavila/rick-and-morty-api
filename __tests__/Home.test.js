import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../src/Redux/store';
import Home from '../src/modules/Home';
import { fetchRick, fetchPagination, teste } from '../utils/mock';
import { QueryClient, QueryClientProvider } from 'react-query';
import mockAxios from 'jest-mock-axios';

jest.mock('next/router', () => require('next-router-mock'));

describe('Testes da tela de Home', () => {
	const query = new QueryClient();
	it('Testa o fluxo completo de Home', async () => {
		const { debug } = render(
			<QueryClientProvider client={query}>
				<Provider store={store}>
					<Home />
				</Provider>
			</QueryClientProvider>,
		);
		mockAxios.get.mockResolvedValueOnce();

		await waitFor(() => {
			screen.getByText(/annie/i);
			// debug();
		});
		const search = screen.getByPlaceholderText(/nome do personagem/i);
		const btn = screen.getByRole('button', {
			name: /filtrar/i,
		});

		await waitFor(async () => {
			await userEvent.type(search, 'Annie');
			expect(search).toHaveValue('Annie');
		});

		await userEvent.click(btn);
		await waitFor(async () => {
			const btns = screen.getAllByRole('button', {
				name: /visualizar perfil/i,
			});
			expect(btns).toHaveLength(2);
			debug();
		});

		// const email = await screen.findByRole('textbox', {
		// 	name: /email/i,
		// });
		// const password = screen.getByLabelText(/senha/i);
		// const btn = screen.getByRole('button', {
		// 	name: /entrar/i,
		// });

		// await waitFor(async () => {
		// 	await userEvent.type(email, INVALID_EMAIL);
		// 	screen.getByText(/Email está no formato invalido/i);
		// });

		// await waitFor(async () => {
		// 	await userEvent.clear(email);
		// 	screen.getByText(/campo obrigatório/i);
		// });

		// await waitFor(async () => {
		// 	await userEvent.type(email, VALID_EMAIL);
		// 	expect(email).toHaveValue(VALID_EMAIL);
		// });

		// await waitFor(async () => {
		// 	await userEvent.type(password, INVALID_PASSWORD);
		// 	screen.getByText(/Necessário no minimo 6 caracteres/i);
		// });

		// await waitFor(async () => {
		// 	await userEvent.clear(password);
		// 	screen.getByText(/Necessário a utilização de senha/i);
		// });

		// await waitFor(async () => {
		// 	await userEvent.type(password, VALID_PASSWORD);
		// 	expect(password).toHaveValue(VALID_PASSWORD);
		// });

		// await waitFor(async () => {
		// 	await userEvent.click(btn);
		// });
	});
});
