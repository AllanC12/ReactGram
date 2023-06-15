import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    loading: false,
    error: false,
    success: false,
    message: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null
        }
    }
})

export const {resetMessage} = userSlice.actions
export default userSlice.reducer