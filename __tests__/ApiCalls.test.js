import { render, screen, waitFor, renderHook } from '@testing-library/react';
import characterService from '../src/services/Characters';
import axios from 'axios';
import { annie } from '../utils/mock';
jest.mock('axios', () => ({
	...jest.requireActual('axios'),
	get: jest.fn(),
}));

beforeEach(() => {
	jest.restoreAllMocks();
});
describe('test', () => {
	it('api', async () => {
		axios.get.mockImplementation(() =>
			Promise.resolve({ data: { results: annie } }),
		);
		const { result } = renderHook(() => characterService.list());
		act(() => {
			result.current.list();
		});
		await expect(result.current.data).toBe(true);
	});
});
