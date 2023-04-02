import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
	email: String;
}

const initialState: UserState = {
	email: '',
};

export const UserSlice = createSlice({
	reducers: {
		addEmail: (state, action: PayloadAction<string>) => {
			const email = action.payload;
			state.email = email;
		},
	},
	name: 'user',
	initialState: initialState,
});

// actions
export const { addEmail } = UserSlice.actions;

// selectors
export const selectUser = (state: RootState) => state;

export default UserSlice.reducer;
