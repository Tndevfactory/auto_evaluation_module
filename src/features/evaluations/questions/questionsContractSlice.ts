import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let baseURL = import.meta.env.VITE_BASE_API_SERVER;
if (import.meta.env.MODE === "development") {
  console.log(".env.MODE :", import.meta.env.MODE);
  baseURL = import.meta.env.VITE_BASE_API_SERVER;
} else {
  console.log(".env.MODE : ", import.meta.env.MODE);
  baseURL = import.meta.env.VITE_BASE_API_PRODUCTION_SERVER;
}

const api = axios.create({
  // baseURL: process.env.BASE_URL,
  baseURL: baseURL,
});

api.interceptors.request.use(function (config) {
  config.headers = { "X-Requested-With": "XMLHttpRequest" };
  config.headers = { Accept: "application/json" };
  config.headers = { "content-type": "application/json" };

  const token = localStorage.getItem("authToken")
    ? localStorage.getItem("authToken")
    : null;
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export interface IQuestion {
  questionsData: {
    id: number;
    theme_index: number;
    entreprise: string;
    departement: string;
    designation: string;
  };
  questionData: {};
  questionOptions: {
    label: string;
    value: number;
  };
  messageQuestions: string;
  loadingQuestions?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorQuestions?: string | null;

  messageGetQuestionById: string;
  loadingGetQuestionById?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorGetQuestionById?: string | null;

  messageCreateQuestion: string;
  loadingCreateQuestion?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorCreateQuestion?: string | null;

  messageUpdateQuestion: string;
  loadingUpdateQuestion?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorUpdateQuestion?: string | null;

  messageDeleteQuestion: string;
  loadingDeleteQuestion?: {
    isIdle: Boolean;
    isPending: Boolean;
    isSuccess: Boolean;
  };
  errorDeleteQuestion?: string | null;
}

const initialState = {
  questionsData: {}[""],
  questionData: {},
  questionOptions: {}[""],

  messageQuestions: "",
  loadingQuestions: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorQuestions: null,

  messageGetQuestionById: "",
  loadingGetQuestionById: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorGetQuestionById: null,

  messageCreateQuestion: "",
  loadingCreateQuestion: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorCreateQuestion: null,

  messageUpdateQuestion: "",
  loadingUpdateQuestion: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorUpdateQuestion: null,

  messageDeleteQuestion: "",
  loadingDeleteQuestion: {
    isIdle: true,
    isPending: false,
    isSuccess: false,
  },
  errorDeleteQuestion: null,
} as IQuestion;

export const getQuestions: any = createAsyncThunk(
  "question/getQuestions",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get("/questions");
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getQuestionById: any = createAsyncThunk(
  "question/getQuestionById",
  async (id, thunkAPI) => {
    try {
      const resp = await api.get(`/get-question-by-id/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const createQuestion: any = createAsyncThunk(
  "question/createQuestion",
  async (data, thunkAPI) => {
    try {
      const resp = await api.post(`/create-question`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const updateQuestion: any = createAsyncThunk(
  "question/updateQuestion",
  async (data, thunkAPI) => {
    try {
      const resp = await api.put(`/update-question`, data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const deleteQuestion: any = createAsyncThunk(
  "question/deleteQuestion",
  async (id, thunkAPI) => {
    try {
      const resp = await api.delete(`/delete-question/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
const questionContractSlice = createSlice({
  name: "questionsAPI",
  initialState,
  reducers: {
    clearMessageQuestion: (state) => {
      state.messageUpdateQuestion = "";
      state.messageDeleteQuestion = "";
      state.messageCreateQuestion = "";
    },
    addQuestionOptions: (state, { payload }) => {
      console.log("payload", payload);
      state.questionOptions = payload;
    },
  },
  extraReducers: (builder) => {
    //getThemes
    builder.addCase(getQuestions.pending, (state, action) => {
      state.loadingQuestions.isPending = true;
      state.loadingQuestions.isSuccess = false;
      state.loadingQuestions.isPending = false;
      state.errorQuestions = null;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.questionsData = action.payload;
      state.loadingQuestions.isSuccess = true;
      state.loadingQuestions.isPending = false;
      state.loadingQuestions.isIdle = false;
      state.errorQuestions = null;
    });
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.loadingQuestions.isIdle = true;
      state.loadingQuestions.isSuccess = false;
      state.loadingQuestions.isPending = false;

      if (action) {
        state.errorQuestions = action.error.message;
      } else {
        state.errorQuestions = "something went wrong ";
      }
    });

    //getThemeById
    builder.addCase(getQuestionById.pending, (state, action) => {
      state.loadingGetQuestionById.isPending = true;
      state.loadingGetQuestionById.isSuccess = false;
      state.loadingGetQuestionById.isPending = false;
      state.errorGetQuestionById = null;
    });
    builder.addCase(getQuestionById.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.questionData = action.payload;
      state.loadingGetQuestionById.isSuccess = true;
      state.loadingGetQuestionById.isPending = false;
      state.loadingGetQuestionById.isIdle = false;
      state.errorGetQuestionById = null;
    });
    builder.addCase(getQuestionById.rejected, (state, action) => {
      state.loadingGetQuestionById.isIdle = true;
      state.loadingGetQuestionById.isSuccess = false;
      state.loadingGetQuestionById.isPending = false;

      if (action) {
        state.errorGetQuestionById = action.error.message;
      } else {
        state.errorGetQuestionById = "something went wrong ";
      }
    });

    //createTheme
    builder.addCase(createQuestion.pending, (state, action) => {
      state.loadingCreateQuestion.isPending = true;
      state.loadingCreateQuestion.isSuccess = false;
      state.loadingCreateQuestion.isPending = false;
      state.messageCreateQuestion = "";
      state.errorCreateQuestion = null;
    });
    builder.addCase(createQuestion.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageCreateQuestion = action.payload;
      state.loadingCreateQuestion.isSuccess = true;
      state.loadingCreateQuestion.isPending = false;
      state.loadingCreateQuestion.isIdle = false;
      state.errorCreateQuestion = null;
    });
    builder.addCase(createQuestion.rejected, (state, action) => {
      state.loadingCreateQuestion.isIdle = true;
      state.loadingCreateQuestion.isSuccess = false;
      state.loadingCreateQuestion.isPending = false;
      state.messageCreateQuestion = "";

      if (action) {
        state.errorCreateQuestion = action.error.message;
      } else {
        state.errorCreateQuestion = "something went wrong ";
      }
    });

    //updateTheme
    builder.addCase(updateQuestion.pending, (state, action) => {
      state.loadingUpdateQuestion.isPending = true;
      state.loadingUpdateQuestion.isSuccess = false;
      state.loadingUpdateQuestion.isPending = false;
      state.errorUpdateQuestion = null;
      state.messageUpdateQuestion = "";
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageUpdateQuestion = action.payload;
      state.loadingUpdateQuestion.isSuccess = true;
      state.loadingUpdateQuestion.isPending = false;
      state.loadingUpdateQuestion.isIdle = false;
      state.errorUpdateQuestion = null;
    });
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.loadingUpdateQuestion.isIdle = true;
      state.loadingUpdateQuestion.isSuccess = false;
      state.loadingUpdateQuestion.isPending = false;
      state.messageUpdateQuestion = "";
      if (action) {
        state.errorUpdateQuestion = action.error.message;
      } else {
        state.errorUpdateQuestion = "something went wrong ";
      }
    });

    //deleteTheme
    builder.addCase(deleteQuestion.pending, (state, action) => {
      state.loadingDeleteQuestion.isPending = true;
      state.loadingDeleteQuestion.isSuccess = false;
      state.loadingDeleteQuestion.isPending = false;
      state.errorDeleteQuestion = null;
      state.messageDeleteQuestion = "";
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      // Add item to the cartItem array
      state.messageDeleteQuestion = action.payload;
      state.loadingDeleteQuestion.isSuccess = true;
      state.loadingDeleteQuestion.isPending = false;
      state.loadingDeleteQuestion.isIdle = false;
      state.errorDeleteQuestion = null;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.loadingDeleteQuestion.isIdle = true;
      state.loadingDeleteQuestion.isSuccess = false;
      state.loadingDeleteQuestion.isPending = false;
      state.messageDeleteQuestion = "";

      if (action) {
        state.errorDeleteQuestion = action.error.message;
      } else {
        state.errorDeleteQuestion = "something went wrong ";
      }
    });
  },
});

export const { clearMessageQuestion, addQuestionOptions } =
  questionContractSlice.actions;

export default questionContractSlice.reducer;
