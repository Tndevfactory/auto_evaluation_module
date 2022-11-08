import { createSlice } from "@reduxjs/toolkit";
const sheet = [
  {
    key: 0,
    entreprise: "TAC-TIC",
    employe: "Bassem Soua",
    detail: [
      {
        id: 0,
        projet: "GIP",
        tache: "Authentification",
        typeTache: "développement",
        nbrHeures: 8,
        date: "29/10",
      },
      {
        id: 1,
        projet: "MSA",
        tache: "Gestion de fichiers",
        typeTache: "Conception",
        nbrHeures: 8,
        date: "31/10",
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "Conception",
        nbrHeures: 3,
        date: "01/11",
      },
      {
        id: 2,
        projet: "EW",
        tache: "Gestion des espace",
        typeTache: "Conception",
        nbrHeures: 5,
        date: "01/11",
      },
    ],
  },
  {
    key: 1,
    entreprise: "TAC-TIC",
    employe: "Wael Machlouch",
    detail: [
      {
        id: 0,
        projet: "MSA",
        typeTache: "développement",
        tache: "Authentification",
        nbrHeures: 8,
        date: "01/11",
      },
      {
        id: 1,
        projet: "EW",
        tache: "Gestion de sites",
        typeTache: "développement",
        nbrHeures: 6,
        date: "30/10",
      },
      {
        id: 5,
        projet: "ERP",
        tache: "gestion de projet",
        typeTache: "développement",
        nbrHeures: 4,
        date: "2/11",
      },

      {
        id: 7,
        projet: "CIOK",
        tache: "réunion",
        typeTache: "réunion",
        nbrHeures: 2,
        date: "29/10",
      },
      {
        id: 3,
        projet: "ERP",
        tache: "TimeSheet",
        typeTache: "développement",
        nbrHeures: 6,
        date: "29/10",
      },
      {
        id: 4,
        projet: "EW",
        tache: "Maps",
        typeTache: "développement",
        nbrHeures: 6,
        date: "2/11",
      },
      {
        id: 2,
        projet: "ERP",
        tache: "Gestion de cautions",
        typeTache: "développement",
        nbrHeures: 2,
        date: "30/10",
      },
    ],
  },
  {
    key: 2,
    entreprise: "TAC-TIC",
    employe: "Amira Riahi",
    detail: [
      {
        id: 0,
        projet: "EW",
        tache: "Authentification",
        typeTache: "test",
        nbrHeures: 8,
        date: "30/10",
      },
    ],
  },
  {
    key: 3,
    employe: "Asma Manaii",
    entreprise: "Smart Skills",
    detail: [
      {
        id: 0,
        projet: "MSA",
        tache: "Cautions",
        typeTache: "other",
        nbrHeures: 8,
        date: "01/11",
      },
    ],
  },
];

interface IDetail {
  id: number;
  projet: string;
  tache: string;
  typeTache: string;
  nbrHeures: number;
  date: string;
}
export interface ISheet {
  sheet: {
    key: number;
    employe: string;
    entreprise: string;
    detail: IDetail[];
  }[];
}

const initialState = {
  sheet: sheet,
} as ISheet;

const timesheetSlice = createSlice({
    name: "timesheet",
    initialState,
    reducers: {

    },
  });
  
  export const {  } = timesheetSlice.actions;
  
  export default timesheetSlice.reducer;
