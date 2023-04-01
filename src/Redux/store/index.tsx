import { configureStore } from '@reduxjs/toolkit';
import UserSlice from '../slice';

export const store = configureStore({
	reducer: {
		user: UserSlice,
	},
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
