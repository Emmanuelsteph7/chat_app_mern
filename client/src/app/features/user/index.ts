import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LoginFormI } from 'pages/login/components/loginForm';
import { RegisterFormI } from 'pages/register/components/registerForm';
import { loginService, registerService } from 'services/auth';
import { UserI } from 'types/client';

interface UserState {
  loading: boolean;
  user: UserI | undefined | null;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  loading: false,
  user: null,
  error: '',
  isAuthenticated: false
};

type AlertI = ({ message, title }: { message: string; title?: string | undefined }) => void;

interface LoginUserOptions {
  payload: LoginFormI;
  successAlert: AlertI;
  errorAlert: AlertI;
}

interface RegisterUserOptions {
  payload: RegisterFormI;
  successAlert: AlertI;
  errorAlert: AlertI;
}

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ payload, successAlert, errorAlert }: LoginUserOptions, { rejectWithValue }) => {
    try {
      const res = await loginService(payload);

      sessionStorage.setItem('user', JSON.stringify(res.data?.data));

      if (res.data?.data) {
        successAlert({
          message: 'Login Successful',
          title: 'Success'
        });
      }

      return res.data?.data as UserI;
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

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ payload, successAlert, errorAlert }: RegisterUserOptions, { rejectWithValue }) => {
    try {
      const res = await registerService(payload);
      sessionStorage.setItem('user', JSON.stringify(res.data?.data));

      if (res.data?.data) {
        successAlert({
          message: 'Registration Successful',
          title: 'Success'
        });
      }

      return res.data as UserI;
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

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, actions) => {
      state.loading = false;
      state.error = null;
      state.user = actions.payload;
      state.isAuthenticated = true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    removeUser: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builders.addCase(loginUser.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.user = actions.payload;
      state.isAuthenticated = true;
    });
    builders.addCase(registerUser.fulfilled, (state, actions) => {
      state.loading = false;
      state.error = null;
      state.user = actions.payload;
      state.isAuthenticated = true;
    });
    builders.addCase(loginUser.rejected, (state, actions) => {
      state.loading = false;
      state.error = (actions.payload as string) || 'Error during login';
      state.user = null;
      state.isAuthenticated = false;
    });
    builders.addCase(registerUser.rejected, (state, actions) => {
      state.loading = false;
      state.error = (actions.payload as string) || 'Error during login';
      state.user = null;
      state.isAuthenticated = false;
    });
  }
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
