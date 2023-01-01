import { api } from "./../../api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import Themes from "../../../pages/evaluations/themes-modules/Themes";

export interface IEvaluation {
  evaluationsData: {
    id: number;
    theme_index: number;
    entreprise: string;
    departement: string;
    designation: string;
    themes: {}[];
  };
  qop: [];
  evaluationData: {};
  evaluationDraft: {};
  messageEvaluations: string;
  loadingEvaluations?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorEvaluations?: string | null;

  messageGetEvaluationById: string;
  loadingGetEvaluationById?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorGetEvaluationById?: string | null;

  messageCreateEvaluation: string;
  loadingCreateEvaluation?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorCreateEvaluation?: string | null;

  messageUpdateEvaluation: string;
  loadingUpdateEvaluation?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorUpdateEvaluation?: string | null;

  messageDeleteEvaluation: string;
  loadingDeleteEvaluation?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorDeleteEvaluation?: string | null;
}

const initialState = {
  evaluationsData: {}[""],
  evaluationData: {},
  /*  ev objet to fillout with eval fron dataEvaluation draft obj */
  evaluationDraft: {},
  qop: [],
  messageEvaluations: "",
  loadingEvaluations: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorEvaluations: null,

  messageGetEvaluationById: "",
  loadingGetEvaluationById: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorGetEvaluationById: null,

  messageCreateEvaluation: "",
  loadingCreateEvaluation: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorCreateEvaluation: null,

  messageUpdateEvaluation: "",
  loadingUpdateEvaluation: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorUpdateEvaluation: null,

  messageDeleteEvaluation: "",
  loadingDeleteEvaluation: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorDeleteEvaluation: null,
} as IEvaluation;

export const getEvaluations: any = createAsyncThunk(
  "evaluation/getEvaluations",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get("/evaluations");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getEvaluationById: any = createAsyncThunk(
  "evaluation/getEvaluationById",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get(`/get-evaluation-by-id/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const createEvaluation: any = createAsyncThunk(
  "evaluation/createEvaluation",
  async (data, thunkAPI) => {
    try {
      const resp = await api.post(`/create-evaluation`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const updateEvaluation: any = createAsyncThunk(
  "evaluation/updateEvaluation",
  async (data, thunkAPI) => {
    try {
      const resp = await api.put(`/update-evaluation`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteEvaluation: any = createAsyncThunk(
  "evaluation/deleteEvaluation",
  async (id, thunkAPI) => {
    try {
      const resp = await api.delete(`/delete-evaluation/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const evaluationContractSlice = createSlice({
  name: "evaluationAPI",
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.messageUpdateEvaluation = "";
    },
    updateEvaluationDraft: (state, { payload }) => {
      console.log("state.evaluationDraft", payload);
      state.evaluationDraft = payload;
    },
    setQop: (state, { payload }) => {
      console.log("state.evaluationDraft", payload);
      state.qop = payload;
    },
  },
  extraReducers: (builder) => {
    //getThemes
    builder.addCase(getEvaluations.pending, (state, action) => {
      state.loadingEvaluations.isPending = true;
      state.loadingEvaluations.isSuccess = false;
      state.loadingEvaluations.isPending = false;
      state.errorEvaluations = null;
    });
    builder.addCase(getEvaluations.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.evaluationsData = action.payload;
      state.loadingEvaluations.isSuccess = true;
      state.loadingEvaluations.isPending = false;
      state.loadingEvaluations.isIdle = false;
      state.errorEvaluations = null;
    });
    builder.addCase(getEvaluations.rejected, (state, action) => {
      state.loadingEvaluations.isIdle = true;
      state.loadingEvaluations.isSuccess = false;
      state.loadingEvaluations.isPending = false;

      if (action) {
        state.errorEvaluations = action.error.message;
      } else {
        state.errorEvaluations = "something went wrong ";
      }
    });

    //getThemeById
    builder.addCase(getEvaluationById.pending, (state, action) => {
      state.loadingGetEvaluationById.isPending = true;
      state.loadingGetEvaluationById.isSuccess = false;
      state.loadingGetEvaluationById.isPending = false;
      state.errorGetEvaluationById = null;
    });
    builder.addCase(getEvaluationById.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.evaluationData = action.payload;
      state.evaluationDraft = action.payload;

      state.loadingGetEvaluationById.isSuccess = true;
      state.loadingGetEvaluationById.isPending = false;
      state.loadingGetEvaluationById.isIdle = false;
      state.errorGetEvaluationById = null;
    });
    builder.addCase(getEvaluationById.rejected, (state, action) => {
      state.loadingGetEvaluationById.isIdle = true;
      state.loadingGetEvaluationById.isSuccess = false;
      state.loadingGetEvaluationById.isPending = false;

      if (action) {
        state.errorGetEvaluationById = action.error.message;
      } else {
        state.errorGetEvaluationById = "something went wrong ";
      }
    });

    //createTheme
    builder.addCase(createEvaluation.pending, (state, action) => {
      state.loadingCreateEvaluation.isPending = true;
      state.loadingCreateEvaluation.isSuccess = false;
      state.loadingCreateEvaluation.isPending = false;
      state.messageCreateEvaluation = "";
      state.errorCreateEvaluation = null;
    });
    builder.addCase(createEvaluation.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageCreateEvaluation = action.payload;
      state.loadingCreateEvaluation.isSuccess = true;
      state.loadingCreateEvaluation.isPending = false;
      state.loadingCreateEvaluation.isIdle = false;
      state.errorCreateEvaluation = null;
    });
    builder.addCase(createEvaluation.rejected, (state, action) => {
      state.loadingCreateEvaluation.isIdle = true;
      state.loadingCreateEvaluation.isSuccess = false;
      state.loadingCreateEvaluation.isPending = false;
      state.messageCreateEvaluation = "";

      if (action) {
        state.errorCreateEvaluation = action.error.message;
      } else {
        state.errorCreateEvaluation = "something went wrong ";
      }
    });

    //updateTheme
    builder.addCase(updateEvaluation.pending, (state, action) => {
      state.loadingUpdateEvaluation.isPending = true;
      state.loadingUpdateEvaluation.isSuccess = false;
      state.loadingUpdateEvaluation.isPending = false;
      state.errorUpdateEvaluation = null;
      state.messageUpdateEvaluation = "";
    });
    builder.addCase(updateEvaluation.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageUpdateEvaluation = action.payload;
      state.loadingUpdateEvaluation.isSuccess = true;
      state.loadingUpdateEvaluation.isPending = false;
      state.loadingUpdateEvaluation.isIdle = false;
      state.errorUpdateEvaluation = null;
    });
    builder.addCase(updateEvaluation.rejected, (state, action) => {
      state.loadingUpdateEvaluation.isIdle = true;
      state.loadingUpdateEvaluation.isSuccess = false;
      state.loadingUpdateEvaluation.isPending = false;
      state.messageUpdateEvaluation = "";
      if (action) {
        state.errorUpdateEvaluation = action.error.message;
      } else {
        state.errorUpdateEvaluation = "something went wrong ";
      }
    });

    //deleteTheme
    builder.addCase(deleteEvaluation.pending, (state, action) => {
      state.loadingDeleteEvaluation.isPending = true;
      state.loadingDeleteEvaluation.isSuccess = false;
      state.loadingDeleteEvaluation.isPending = false;
      state.errorDeleteEvaluation = null;
      state.messageDeleteEvaluation = "";
    });
    builder.addCase(deleteEvaluation.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageDeleteEvaluation = action.payload;
      state.loadingDeleteEvaluation.isSuccess = true;
      state.loadingDeleteEvaluation.isPending = false;
      state.loadingDeleteEvaluation.isIdle = false;
      state.errorDeleteEvaluation = null;
    });
    builder.addCase(deleteEvaluation.rejected, (state, action) => {
      state.loadingDeleteEvaluation.isIdle = true;
      state.loadingDeleteEvaluation.isSuccess = false;
      state.loadingDeleteEvaluation.isPending = false;
      state.messageDeleteEvaluation = "";

      if (action) {
        state.errorDeleteEvaluation = action.error.message;
      } else {
        state.errorDeleteEvaluation = "something went wrong ";
      }
    });
  },
});

export const { clearMessage, updateEvaluationDraft, setQop } =
  evaluationContractSlice.actions;

export default evaluationContractSlice.reducer;
