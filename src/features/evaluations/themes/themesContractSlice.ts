import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./../../api";

export interface ITheme {
  themesData: {
    id: number;
    theme_index: number;
    entreprise: string;
    departement: string;
    designation: string;
    descriptif: string;
  };
  themeData: {};
  themeOptions: {
    label: string;
    value: number;
  };
  messageThemes: string;
  loadingThemes?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorThemes?: string | null;

  messageGetThemeById: string;
  loadingGetThemeById?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorGetThemeById?: string | null;

  messageCreateTheme: string;
  loadingCreateTheme?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorCreateTheme?: string | null;

  messageUpdateTheme: string;
  loadingUpdateTheme?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorUpdateTheme?: string | null;

  messageDeleteTheme: string;
  loadingDeleteTheme?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorDeleteTheme?: string | null;
}

const initialState = {
  themesData: {}[""],
  themeData: {},
  themeOptions: {}[""],

  messageThemes: "",
  loadingThemes: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorThemes: null,

  messageGetThemeById: "",
  loadingGetThemeById: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorGetThemeById: null,

  messageCreateTheme: "",
  loadingCreateTheme: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorCreateTheme: null,

  messageUpdateTheme: "",
  loadingUpdateTheme: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorUpdateTheme: null,

  messageDeleteTheme: "",
  loadingDeleteTheme: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorDeleteTheme: null,
} as ITheme;

export const getThemes: any = createAsyncThunk(
  "theme/getThemes",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get("/themes");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getThemeById: any = createAsyncThunk(
  "theme/getThemeById",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get(`/get-theme-by-id/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const createTheme: any = createAsyncThunk(
  "theme/createTheme",
  async (data, thunkAPI) => {
    try {
      const resp = await api.post(`/create-theme`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const updateTheme: any = createAsyncThunk(
  "theme/updateTheme",
  async (data, thunkAPI) => {
    try {
      const resp = await api.put(`/update-theme`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteTheme: any = createAsyncThunk(
  "theme/deleteTheme",
  async (id, thunkAPI) => {
    try {
      const resp = await api.delete(`/delete-theme/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const themeContractSlice = createSlice({
  name: "themesAPI",
  initialState,
  reducers: {
    clearMessageTheme: (state) => {
      state.messageCreateTheme = "";
      state.messageUpdateTheme = "";
      state.messageDeleteTheme = "";
    },
    addThemeOptions: (state, { payload }) => {
      console.log("payload", payload);
      state.themeOptions = payload;
    },
  },
  extraReducers: (builder) => {
    //getThemes
    builder.addCase(getThemes.pending, (state, action) => {
      state.loadingThemes.isPending = true;
      state.loadingThemes.isSuccess = false;
      state.loadingThemes.isPending = false;
      state.errorThemes = null;
    });
    builder.addCase(getThemes.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.themesData = action.payload;
      state.loadingThemes.isSuccess = true;
      state.loadingThemes.isPending = false;
      state.loadingThemes.isIdle = false;
      state.errorThemes = null;
    });
    builder.addCase(getThemes.rejected, (state, action) => {
      state.loadingThemes.isIdle = true;
      state.loadingThemes.isSuccess = false;
      state.loadingThemes.isPending = false;

      if (action) {
        state.errorThemes = action.error.message;
      } else {
        state.errorThemes = "something went wrong ";
      }
    });

    //getThemeById
    builder.addCase(getThemeById.pending, (state, action) => {
      state.loadingGetThemeById.isPending = true;
      state.loadingGetThemeById.isSuccess = false;
      state.loadingGetThemeById.isPending = false;
      state.errorGetThemeById = null;
    });
    builder.addCase(getThemeById.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.themeData = action.payload;
      state.loadingGetThemeById.isSuccess = true;
      state.loadingGetThemeById.isPending = false;
      state.loadingGetThemeById.isIdle = false;
      state.errorGetThemeById = null;
    });
    builder.addCase(getThemeById.rejected, (state, action) => {
      state.loadingGetThemeById.isIdle = true;
      state.loadingGetThemeById.isSuccess = false;
      state.loadingGetThemeById.isPending = false;

      if (action) {
        state.errorGetThemeById = action.error.message;
      } else {
        state.errorGetThemeById = "something went wrong ";
      }
    });

    //createTheme
    builder.addCase(createTheme.pending, (state, action) => {
      state.loadingCreateTheme.isPending = true;
      state.loadingCreateTheme.isSuccess = false;
      state.loadingCreateTheme.isPending = false;
      state.messageCreateTheme = "";
      state.errorCreateTheme = null;
    });
    builder.addCase(createTheme.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageCreateTheme = action.payload;
      state.loadingCreateTheme.isSuccess = true;
      state.loadingCreateTheme.isPending = false;
      state.loadingCreateTheme.isIdle = false;
      state.errorCreateTheme = null;
    });
    builder.addCase(createTheme.rejected, (state, action) => {
      state.loadingCreateTheme.isIdle = true;
      state.loadingCreateTheme.isSuccess = false;
      state.loadingCreateTheme.isPending = false;
      state.messageCreateTheme = "";

      if (action) {
        state.errorCreateTheme = action.error.message;
      } else {
        state.errorCreateTheme = "something went wrong ";
      }
    });

    //updateTheme
    builder.addCase(updateTheme.pending, (state, action) => {
      state.loadingUpdateTheme.isPending = true;
      state.loadingUpdateTheme.isSuccess = false;
      state.loadingUpdateTheme.isPending = false;
      state.errorUpdateTheme = null;
      state.messageUpdateTheme = "";
    });
    builder.addCase(updateTheme.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageUpdateTheme = action.payload;
      state.loadingUpdateTheme.isSuccess = true;
      state.loadingUpdateTheme.isPending = false;
      state.loadingUpdateTheme.isIdle = false;
      state.errorUpdateTheme = null;
    });
    builder.addCase(updateTheme.rejected, (state, action) => {
      state.loadingUpdateTheme.isIdle = true;
      state.loadingUpdateTheme.isSuccess = false;
      state.loadingUpdateTheme.isPending = false;
      state.messageUpdateTheme = "";
      if (action) {
        state.errorUpdateTheme = action.error.message;
      } else {
        state.errorUpdateTheme = "something went wrong ";
      }
    });

    //deleteTheme
    builder.addCase(deleteTheme.pending, (state, action) => {
      state.loadingDeleteTheme.isPending = true;
      state.loadingDeleteTheme.isSuccess = false;
      state.loadingDeleteTheme.isPending = false;
      state.errorDeleteTheme = null;
      state.messageDeleteTheme = "";
    });
    builder.addCase(deleteTheme.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageDeleteTheme = action.payload;
      state.loadingDeleteTheme.isSuccess = true;
      state.loadingDeleteTheme.isPending = false;
      state.loadingDeleteTheme.isIdle = false;
      state.errorDeleteTheme = null;
    });
    builder.addCase(deleteTheme.rejected, (state, action) => {
      state.loadingDeleteTheme.isIdle = true;
      state.loadingDeleteTheme.isSuccess = false;
      state.loadingDeleteTheme.isPending = false;
      state.messageDeleteTheme = "";

      if (action) {
        state.errorDeleteTheme = action.error.message;
      } else {
        state.errorDeleteTheme = "something went wrong ";
      }
    });
  },
});

export const { clearMessageTheme, addThemeOptions } =
  themeContractSlice.actions;

export default themeContractSlice.reducer;
