import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import config from "../../config";

// Token management functions
const TOKEN_KEY = "tokens";

const getTokens = () => {
  try {
    const tokens = localStorage.getItem(TOKEN_KEY);
    return tokens ? JSON.parse(tokens) : null;
  } catch (error) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }
};

const setTokens = (accessToken, refreshToken) => {
  localStorage.setItem(
    TOKEN_KEY,
    JSON.stringify({ accessToken, refreshToken })
  );
};

const removeTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const tokens = getTokens();
const initialState = {
  user: null,
  accessToken: tokens?.accessToken || null,
  refreshToken: tokens?.refreshToken || null,
  isAuthenticated: !!tokens?.accessToken,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.API_URL}auth/users/`,
        userData
      );
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        Object.values(error.response?.data || {})[0]?.[0] ||
        "Registration failed";
      return rejectWithValue(errorMessage);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const { data: tokens } = await axios.post(
        `${config.API_URL}/auth/jwt/create/`,
        {
          username,
          password,
        }
      );

      const { access: accessToken, refresh: refreshToken } = tokens;
      setTokens(accessToken, refreshToken);

      const userResponse = await axiosInstance.get("/auth/users/me/", {
        headers: {
          Authorization: `JWT ${accessToken}`,
        },
      });

      const user = userResponse.data;
      return { user, accessToken, refreshToken };
    } catch (error) {
      const message = error.response?.data?.detail || "Login failed";
      return rejectWithValue(message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "auth/refresh",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken } = getState().auth;
      const { data } = await axiosInstance.post("/auth/jwt/refresh/", {
        refresh: refreshToken,
      });

      const accessToken = data.access;
      setTokens(accessToken, refreshToken);
      return accessToken;
    } catch (error) {
      const message = error.response?.data?.detail || "Token refresh failed";
      return rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  removeTokens();
  return null;
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Refresh token cases
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })

      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer;
