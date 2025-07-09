import { createSlice } from '@reduxjs/toolkit';

type User = {
  id: number;
  name: string;
  email: string;
}
interface UserState {
  value: User[];
}

const initialState: UserState = {
  value: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action: { payload: User[] }) => {
      action.payload.forEach(newUser => {
        const exists = state.value.find(user => user.id === newUser.id);
        if (!exists) {
          state.value.push(newUser);
        }
      });
    }
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
