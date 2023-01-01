import React, { useEffect, useState, useRef } from "react";
import "@/style/modules/Flotte.less";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useParams, useLocation, useHref, useNavigate } from "react-router-dom";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Tabs,
  Card,
  Skeleton,
  notification,
  Typography,
  Input,
  Badge,
} from "antd";
import { ProCard } from "@ant-design/pro-components";
import moment from "moment";

import FormItem from "antd/es/form/FormItem";
import { divIcon } from "leaflet";

//UserInterfaceEvaluation
const EvaluationSavedSuccess = () => {
  const { annee } = useParams();
  const location = useLocation();

  const styleCard: React.CSSProperties = {
    minHeight: "100vh",
  };

  return (
    <div
      className="mb-6  bg-slate-200 flex justify-center items-center "
      style={styleCard}
    >
      <div
        className="w-92 bg-white text-center text-3xl p-5 rounded-lg 
       shadow-lg text-blue-800"
      >
        Merci d'avoir rempli le formulaire d'auto-evaluation !
      </div>
    </div>
  );
};

export default EvaluationSavedSuccess;
