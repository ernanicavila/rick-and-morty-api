import { render, screen, waitFor } from '@testing-library/react';
import { fetchPagination } from '../utils/mock';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../src/Redux/store';
import Login from '../src/modules/Login';

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('react-query', () => ({
	useQuery: () => ({
		isLoading: false,
		error: {},
		data: { data: { results: fetchPagination } },
	}),
}));
const INVALID_EMAIL = 'teste';
const VALID_EMAIL = 'teste@teste.com';
const INVALID_PASSWORD = '123';
const VALID_PASSWORD = '123456';

// Feito os testes dessa forma por um erro no userEvent, erro no link a baixo
// https://github.com/testing-library/user-event/discussions/970
describe('Testes da tela de Login', () => {
	it('Testa o fluxo completo de Login', async () => {
		render(
			<Provider store={store}>
				<Login />
			</Provider>,
		);
		const email = await screen.findByRole('textbox', {
			name: /email/i,
		});
		const password = screen.getByLabelText(/senha/i);
		const btn = screen.getByRole('button', {
			name: /entrar/i,
		});

		await waitFor(async () => {
			await userEvent.type(email, INVALID_EMAIL);
			screen.getByText(/Email está no formato invalido/i);
		});

		await waitFor(async () => {
			await userEvent.clear(email); 
			screen.getByText(/campo obrigatório/i);
		});

		await waitFor(async () => {
			await userEvent.type(email, VALID_EMAIL);
			expect(email).toHaveValue(VALID_EMAIL);
		});

		await waitFor(async () => {
			await userEvent.type(password, INVALID_PASSWORD);
			screen.getByText(/Necessário no minimo 6 caracteres/i);
		});

		await waitFor(async () => {
			await userEvent.clear(password);
			screen.getByText(/Necessário a utilização de senha/i);
		});

		await waitFor(async () => {
			await userEvent.type(password, VALID_PASSWORD);
			expect(password).toHaveValue(VALID_PASSWORD);
		});

		await waitFor(async () => {
			await userEvent.click(btn);
		});
	});
});
