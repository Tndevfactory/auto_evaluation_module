import * as React from "react";
import "./style/app.less";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import enFR from "antd/lib/locale/fr_FR";
// ltr rtl
import { ConfigProvider } from "antd";
// translator
import { IntlProvider } from "react-intl";

// i18n translted document
import { locales } from "./i18n/locales";
import arabic from "./i18n/languages/ar.json";
import english from "./i18n/languages/en.json";
import french from "./i18n/languages/fr.json";

//  path controller components
import Missing from "./components/Missing";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import GuestPath from "./components/GuestPath";
import Layout from "./components/Layout";
import Index from "./components/Index";
import Livraison from "./pages/flottes/livraison-modules/Livraison";

// Auth
import Login from "./pages/auth/Login";

// Home
import Home from "./pages/home/Index";
import Home1 from "./pages/home/home-modules/Home1";

// Cautions
import Cautions from "./pages/finance/caution-modules/Cautions";

// Project
import Projects from "./pages/project/project-modules/Projects";
import Kanban from "./pages/project/project-modules/kanban/Kanban";
import Timesheet from "./pages/project/timesheet-modules/Timesheet";

// evaluations
import Themes from "./pages/evaluations/themes-modules/Themes";
import Questions from "./pages/evaluations/questions-modules/Questions";
import Evaluations from "./pages/evaluations/evaluations-modules/Evaluations";

// userInterfaceEvaluation
import UserInterfaceEvaluationFormulaire from "./pages/evaluations/user-evaluations-modules/UserInterfaceEvaluationFormulaire";
import EvaluationSavedSuccess from "./pages/evaluations/user-evaluations-modules/EvaluationSavedSuccess";
import UserInterfaceEvaluation from "./pages/evaluations/user-evaluations-modules/UserInterfaceEvaluation";

//flottes
import FlottesContract from "./pages/flottes/contracts-modules/Contracts";
import FlottesClients from "./pages/flottes/clients-modules/Clients";
import Vehicules from "./pages/flottes/vehicules-modules/Vehicules";

// check localstorage here
//console.log(`${process.env.REACT_APP_BASE_PUBLIC_URL}/`);

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  const messages = {
    en: english,
    fr: french,
    ar: arabic,
  };

  const ROLES = {
    ADMIN: "user",
    USER: "user",
  };

  return (
    <ConfigProvider direction="ltr" locale={enFR}>
      <IntlProvider
        messages={messages["fr"]}
        locale={"fr"}
        defaultLocale={locales.arabic}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="user-interface-evaluation/:annee"
              element={<UserInterfaceEvaluationFormulaire />}
            />
            <Route
              path="evaluation-saved-with-success"
              element={<EvaluationSavedSuccess />}
            />
            <Route path={`/*`} element={<Layout />}>
              <Route element={<GuestPath />}>
                <Route path={`*`} element={<Login />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                {/* <Route path={`home`} element={<Home />} /> */}
              </Route>
              <Route path={`home/*`} element={<Home />}></Route>
              <Route path={`finance/*`} element={<Index />}>
                <Route path={`*`} element={<Cautions />} />
              </Route>
              <Route path={`flottes/*`} element={<Index />}>
                <Route path={`*`} element={<FlottesContract />} />
                <Route
                  path={`gestion-des-contrat`}
                  element={<FlottesContract />}
                />
                <Route
                  path={`gestion-des-clients`}
                  element={<FlottesClients />}
                />
                <Route path={`gestion-des-vehicules`} element={<Vehicules />} />
                <Route
                  path={`gestion-des-livraisons`}
                  element={<Livraison />}
                />
              </Route>
              <Route path={`projects/*`} element={<Index />}>
                <Route path={`*`} element={<Projects />} />
                <Route path={`kanban`} element={<Kanban />} />
                <Route path={`timesheet`} element={<Timesheet />} />
              </Route>

              <Route path={`evaluations/*`} element={<Index />}>
                <Route path={`*`} element={<Themes />} />
                <Route path={`gestion_des_themes`} element={<Themes />} />
                <Route path={`gestion_des_questions`} element={<Questions />} />
                <Route
                  path={`gestion_des_evaluations`}
                  element={<Evaluations />}
                />
                <Route
                  path={`user_evaluations`}
                  element={<UserInterfaceEvaluation />}
                />
              </Route>
            </Route>
            <Route path={`unauthorized`} element={<Unauthorized />} />
            {/* <Route path={`*`} element={<Missing />} /> */}
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </ConfigProvider>
  );
};

export default App;
