import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import citationService from "../../services/citationServices";
import favoriteService from "../../services/favoriteServices";

import {
  Citation,
  Kaamelott,
  citationState,
  IEditCitation,
  Favorite,
} from "../../utils/interface";
import { toast } from "react-toastify";

const initialState: citationState = {
  data: [],
  singleCitation: null,

  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const createACitation = createAsyncThunk(
  "citation/create-a-citations",
  async (citation: string, thunkAPI) => {
    try {
      return await citationService.createACitation(citation);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllCitations = createAsyncThunk(
  "citation/get-all-citations",
  async (_, thunkAPI) => {
    try {
      return await citationService.getAllCitations();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACitation = createAsyncThunk(
  "citation/get-a-citation",
  async (id: number, thunkAPI) => {
    try {
      return await citationService.getACitation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACitationFavo = createAsyncThunk(
  "citation/get-a-citation-favorite",
  async (id: number, thunkAPI) => {
    try {
      return await favoriteService.getACitationFavo(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getRandomKaamelott = createAsyncThunk(
  "citation/get-random-kaamelott",
  async (_, thunkAPI) => {
    try {
      return await citationService.getRandomKaamelott();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getACitationRandom = createAsyncThunk(
  "citation/get-a-citation-random",
  async (_, thunkAPI) => {
    try {
      return await citationService.getACitationRandom();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACitation = createAsyncThunk(
  "citation/delete-a-citation",
  async (id: number, thunkAPI) => {
    try {
      return await citationService.deleteACitation(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateACitation = createAsyncThunk(
  "citation/update-a-citation",
  async (data: IEditCitation, thunkAPI) => {
    try {
      return await citationService.updateACitation(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const citationSlice = createSlice({
  name: "citation",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createACitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createACitation.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        if (state.isSuccess) {
          toast.success("la Citation créée avec succès !");
        }
      })
      .addCase(createACitation.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
        if (state.isError) {
          toast.error("Cette Citation existe déjà !");
        }
      })
      .addCase(getAllCitations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getAllCitations.fulfilled,
        (state, action: PayloadAction<Array<Citation>>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
          state.message = "success";
        }
      )
      .addCase(getAllCitations.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getACitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getACitation.fulfilled,
        (state, action: PayloadAction<Citation[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.singleCitation = action.payload[0];
          state.message = "success";
        }
      )
      .addCase(getACitation.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
        if (state.isError) {
          toast.error("Cette Citation n'existe pas !");
        }
      })
      .addCase(getACitationFavo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getACitationFavo.fulfilled,
        (state, action: PayloadAction<Favorite[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.singleCitation = action.payload[0];
          state.message = "success";
        }
      )
      .addCase(getACitationFavo.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
        if (state.isError) {
          toast.error("Cette Citation n'existe pas !");
        }
      })
      .addCase(getRandomKaamelott.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getRandomKaamelott.fulfilled,
        (state, action: PayloadAction<Kaamelott>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;

          state.singleCitation = {
            citation: action.payload.citation.citation,
            personnage: action.payload.citation.infos.personnage,
            episode: action.payload.citation.infos.episode,
          };
          state.message = "success";
        }
      )
      .addCase(getRandomKaamelott.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(getACitationRandom.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(
        getACitationRandom.fulfilled,
        (state, action: PayloadAction<Citation[]>) => {
          state.isError = false;
          state.isLoading = false;
          state.isSuccess = true;
          state.singleCitation = action.payload[0];
          state.message = "success";
        }
      )
      .addCase(getACitationRandom.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(deleteACitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACitation.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        if (state.isSuccess) {
          toast.success("La Citation a été supprimée avec succès !");
        }
      })

      .addCase(deleteACitation.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      })
      .addCase(updateACitation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACitation.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "success";
        if (state.isSuccess) {
          toast.success("la Citation a été mise à jour avec succès !");
        }
      })

      .addCase(updateACitation.rejected, (state, action) => {
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message ?? "An error occurred.";
        state.isLoading = false;
      });
  },
});
export default citationSlice.reducer;
