import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";

const initialState = {
  user: {},
  loading: false,
  error: false,
  success: false,
  message: null,
};

export const profile = createAsyncThunk(
  "user/profile",
  async (user, thunkAPI) => {
    const token = await thunkAPI.getState().auth.user.token;
    const data = await userService.profile(user, token);

    return data;
  }
);

export const updateProfile = createAsyncThunk(
  "user/update",
  async (user, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;

    const data = await userService.updateProfile(user, token);

    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }

    return data;
  }
);

export const getUserDetails = createAsyncThunk(
  "user/get",
  async(id,thunkAPI) =>{
    const data = await userService.getUserDetails(id)

    return data
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.success = true;
        state.error = false;
        state.loading = false;
        state.user = action.payload;
        state.message = "Usuário atualizado com sucesso!";
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(getUserDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = false;
        state.user = action.payload;
      });
  },
});

export const { resetMessage } = userSlice.actions;
export default userSlice.reducer;

