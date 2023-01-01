import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";
import modalReducer from "./modal/modalSlice";
import uiReducer from "./ui/uiSlice";
import cautionReducer from "./caution/cautionSlice";
import projectReducer from "./project/projectSlice";
import timesheetReducer from "./timesheet/timesheetSlice";
import flotteContractReducer from "./flotte/contract/flotteContractSlice";
import flotteClientReducer from "./flotte/client/flotteClientSlice";
import flotteVehiculeReducer from "./flotte/vehicule/flotteVehiculeSlice";
import themeReducer from "./evaluations/themes/themesContractSlice";
import questionReducer from "./evaluations/questions/questionsContractSlice";
import evaluationReducer from "./evaluations/evaluations/evaluationContractSlice";
import userEvaluationReducer from "./evaluations/userEvaluations/userEvaluationContractSlice";

export const store = configureStore({
  reducer: {
    // cart: cartReducer,
    modal: modalReducer,
    ui: uiReducer,

    caution: cautionReducer,
    project: projectReducer,
    timesheet: timesheetReducer,

    flotteContract: flotteContractReducer,
    flotteClient: flotteClientReducer,
    flotteVehicule: flotteVehiculeReducer,

    evaluationTheme: themeReducer,
    evaluationQuestion: questionReducer,
    evaluationEval: evaluationReducer,
    userEvaluation: userEvaluationReducer,
  },
});
