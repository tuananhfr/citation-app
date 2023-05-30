import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import favoriteService from "../../services/favoriteServices";
import { Favorite, favoriteState, IFavorite } from "../../utils/interface";
import { toast } from "react-toastify";

const initialState: favoriteState = {
  data: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const createFavorite = createAsyncThunk(
  "favorite/add-favorite",
  async (data: IFavorite, thunkAPI) => {
    try {
      return await favoriteService.createFavorite(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getCitationFavorite = createAsyncThunk(
  "favorite/get-all-favorite",
  async (_, thunkAPI) => {
    try {
      return await favoriteService.getCitationFavorite();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFavorite.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        if (state.isSuccess) {
          toast.success(action.payload);
        }
      })
      .addCase(createFavorite.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getCitationFavorite.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getCitationFavorite.fulfilled,
        (state, action: PayloadAction<Array<Favorite>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.message = "success";
        }
      )
      .addCase(getCitationFavorite.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default favoriteSlice.reducer;
