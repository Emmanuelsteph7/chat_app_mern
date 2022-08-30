import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsersService } from 'services/user';
import { UserI } from 'types/client';

interface UserState {
  loading: boolean;
  users: UserI[] | undefined | null;
  error: string | null;
}

const initialState: UserState = {
  loading: false,
  users: null,
  error: ''
};

type AlertI = ({ message, title }: { message: string; title?: string | undefined }) => void;

interface GetUsersOptions {
  payload: {
    search: string;
    token: string;
  };
  successAlert: AlertI;
  errorAlert: AlertI;
}

export const getUsers = createAsyncThunk(
  'user/getUsers',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: GetUsersOptions, { rejectWithValue }) => {
    try {
      const res = await getUsersService(payload.token, payload.search);

      return res.data?.data as UserI[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      errorAlert({
        message: error?.response?.data?.errMessage,
        title: 'Error'
      });
      return rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);

export const getUsersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, actions) => {
      state.loading = false;
      state.error = null;
      state.users = actions.payload;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(getUsers.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(getUsers.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.users = actions.payload;
    });
    builders.addCase(getUsers.rejected, (state, actions) => {
      state.loading = false;
      state.error = (actions.payload as string) || 'Error fetching users';
      state.users = null;
    });
  }
});

export const { setUsers } = getUsersSlice.actions;

export default getUsersSlice.reducer;
