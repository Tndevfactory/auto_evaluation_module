import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./../../api";

export interface IUserEvaluation {
  userEvaluationsData: {
    id: number;
    theme_index: number;
    entreprise: string;
    departement: string;
    designation: string;
    username: string;
    user_id: string;
  };
  userEvaluationsDataByAnnee: {};
  allUserEvaluationsDataByAnnee: {};
  userEvaluationsDataByID: {};
  messageUserEvaluations: string;
  loadingUserEvaluations?: {
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

  errorGetUserEvaluationsByID?: string | null;
  messageGetUserEvaluationById: string;
  loadingGetUserEvaluationById?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };

  errorGetAllEvaluationByAnnee?: string | null;

  messageGetAllEvaluationByAnnee: string;

  loadingGetAllEvaluationByAnnee?: {
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
  userEvaluationsData: {}[""],
  userEvaluationsDataByAnnee: {},
  userEvaluationsDataByID: {},
  allUserEvaluationsDataByAnnee: {},

  messageUserEvaluations: "",
  loadingUserEvaluations: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorEvaluations: null,

  errorGetAllEvaluationByAnnee: null,
  messageGetAllEvaluationByAnnee: "",

  loadingGetAllEvaluationByAnnee: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },

  messageGetEvaluationById: "",
  loadingGetEvaluationById: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorGetEvaluationById: null,

  errorGetUserEvaluationsByID: "",
  messageGetUserEvaluationById: "",
  loadingGetUserEvaluationById: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },

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
} as IUserEvaluation;

export const getUserInterfaceEvaluations: any = createAsyncThunk(
  "evaluation/getAllUserInterfaceEvaluationByAnne",
  async (annee, thunkAPI) => {
    try {
      const resp = await api.get(`/get-user-interface-evaluations`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getUserInterfaceEvaluationByAnnee: any = createAsyncThunk(
  "evaluation/getEvaluationById",
  async (annee, thunkAPI) => {
    try {
      const resp = await api.get(
        `/get-user-interface-evaluation-by-annee/${annee}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getAllUserInterfaceEvaluationByAnnee: any = createAsyncThunk(
  "evaluation/getAllUserInterfaceEvaluationByAnne",
  async (annee, thunkAPI) => {
    try {
      const resp = await api.get(
        `/get-all-users-interface-evaluation-by-annee/${annee}`
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getUserInterfaceEvaluationById: any = createAsyncThunk(
  "UserEvaluation/getUserInterfaceEvaluationByIde",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get(`/get-users-interface-evaluation-by-id/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const userCreateEvaluation: any = createAsyncThunk(
  "evaluation/createEvaluation",
  async (data, thunkAPI) => {
    try {
      const resp = await api.post(`/user-create-evaluation`, data);
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

export const deleteUserEvaluation: any = createAsyncThunk(
  "evaluation/deleteUserEvaluation",
  async (id, thunkAPI) => {
    try {
      const resp = await api.delete(`/delete-user-evaluation/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const userEvaluationContractSlice = createSlice({
  name: "evaluationAPI",
  initialState,
  reducers: {
    clearMessageCreateUserEvaluation: (state) => {
      state.messageCreateEvaluation = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getUserInterfaceEvaluationByAnnee.pending,
      (state, action) => {
        state.loadingGetAllEvaluationByAnnee.isPending = true;
        state.loadingGetAllEvaluationByAnnee.isSuccess = false;
        state.loadingGetAllEvaluationByAnnee.isPending = false;
        state.errorGetAllEvaluationByAnnee = null;
      }
    );
    builder.addCase(
      getUserInterfaceEvaluationByAnnee.fulfilled,
      (state, action) => {
        // Add item to the cartItem array
        state.userEvaluationsDataByAnnee = action.payload;
        state.loadingGetAllEvaluationByAnnee.isSuccess = true;
        state.loadingGetAllEvaluationByAnnee.isPending = false;
        state.loadingGetAllEvaluationByAnnee.isIdle = false;
        state.errorGetAllEvaluationByAnnee = null;
      }
    );
    builder.addCase(
      getUserInterfaceEvaluationByAnnee.rejected,
      (state, action) => {
        state.loadingGetAllEvaluationByAnnee.isIdle = true;
        state.loadingGetAllEvaluationByAnnee.isSuccess = false;
        state.loadingGetAllEvaluationByAnnee.isPending = false;

        if (action) {
          state.errorGetAllEvaluationByAnnee = action.error.message;
        } else {
          state.errorGetAllEvaluationByAnnee = "something went wrong ";
        }
      }
    );

    //getAllUserInterfaceEvaluationByAnnee
    builder.addCase(
      getAllUserInterfaceEvaluationByAnnee.pending,
      (state, action) => {
        state.loadingGetAllEvaluationByAnnee.isPending = true;
        state.loadingGetAllEvaluationByAnnee.isSuccess = false;
        state.loadingGetAllEvaluationByAnnee.isPending = false;
        state.errorGetAllEvaluationByAnnee = null;
      }
    );

    builder.addCase(
      getAllUserInterfaceEvaluationByAnnee.fulfilled,
      (state, action) => {
        // Add item to the cartItem array
        state.allUserEvaluationsDataByAnnee = action.payload;
        state.loadingGetAllEvaluationByAnnee.isSuccess = true;
        state.loadingGetAllEvaluationByAnnee.isPending = false;
        state.loadingGetAllEvaluationByAnnee.isIdle = false;
        state.errorGetAllEvaluationByAnnee = null;
      }
    );

    builder.addCase(
      getAllUserInterfaceEvaluationByAnnee.rejected,
      (state, action) => {
        state.loadingGetAllEvaluationByAnnee.isIdle = true;
        state.loadingGetAllEvaluationByAnnee.isSuccess = false;
        state.loadingGetAllEvaluationByAnnee.isPending = false;

        if (action) {
          state.errorGetAllEvaluationByAnnee = action.error.message;
        } else {
          state.errorGetAllEvaluationByAnnee = "something went wrong ";
        }
      }
    );

    builder.addCase(getUserInterfaceEvaluationById.pending, (state, action) => {
      state.loadingGetUserEvaluationById.isPending = true;
      state.loadingGetUserEvaluationById.isSuccess = false;
      state.loadingGetUserEvaluationById.isPending = false;
      state.errorGetUserEvaluationsByID = null;
    });

    builder.addCase(
      getUserInterfaceEvaluationById.fulfilled,
      (state, action) => {
        // Add item to the cartItem array
        state.userEvaluationsDataByID = action.payload;
        state.loadingGetUserEvaluationById.isSuccess = true;
        state.loadingGetUserEvaluationById.isPending = false;
        state.loadingGetUserEvaluationById.isIdle = false;
        state.errorGetUserEvaluationsByID = null;
      }
    );

    builder.addCase(
      getUserInterfaceEvaluationById.rejected,
      (state, action) => {
        state.loadingGetUserEvaluationById.isIdle = true;
        state.loadingGetUserEvaluationById.isSuccess = false;
        state.loadingGetUserEvaluationById.isPending = false;

        if (action) {
          state.errorGetUserEvaluationsByID = action.error.message;
        } else {
          state.errorGetUserEvaluationsByID = "something went wrong ";
        }
      }
    );

    //createTheme
    builder.addCase(userCreateEvaluation.pending, (state, action) => {
      state.loadingCreateEvaluation.isPending = true;
      state.loadingCreateEvaluation.isSuccess = false;
      state.loadingCreateEvaluation.isPending = false;
      state.messageCreateEvaluation = "";
      state.errorCreateEvaluation = null;
    });
    builder.addCase(userCreateEvaluation.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageCreateEvaluation = action.payload;
      state.loadingCreateEvaluation.isSuccess = true;
      state.loadingCreateEvaluation.isPending = false;
      state.loadingCreateEvaluation.isIdle = false;
      state.errorCreateEvaluation = null;
    });
    builder.addCase(userCreateEvaluation.rejected, (state, action) => {
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
    builder.addCase(deleteUserEvaluation.pending, (state, action) => {
      state.loadingDeleteEvaluation.isPending = true;
      state.loadingDeleteEvaluation.isSuccess = false;
      state.loadingDeleteEvaluation.isPending = false;
      state.errorDeleteEvaluation = null;
      state.messageDeleteEvaluation = "";
    });
    builder.addCase(deleteUserEvaluation.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageDeleteEvaluation = action.payload;
      state.loadingDeleteEvaluation.isSuccess = true;
      state.loadingDeleteEvaluation.isPending = false;
      state.loadingDeleteEvaluation.isIdle = false;
      state.errorDeleteEvaluation = null;
    });
    builder.addCase(deleteUserEvaluation.rejected, (state, action) => {
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

export const { clearMessageCreateUserEvaluation } =
  userEvaluationContractSlice.actions;

export default userEvaluationContractSlice.reducer;
