import React, { useEffect, useState } from "react";
import {
  Skeleton,
  Button,
  Space,
  Tag,
  Breadcrumb,
  Card,
  Col,
  Row,
  Typography,
  Divider,
  Popconfirm,
  Select,
  Input,
  Tooltip,
} from "antd";
import {
  ProTable,
  TableDropdown,
  ProColumns,
} from "@ant-design/pro-components";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SendOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import moment from "moment";
import CreateEvaluation from "./CreateEvaluation";
import EvaluationDetails from "./EvaluationDetails";
import EvaluationView from "./EvaluationView";
import EvaluationEnvoi from "./EvaluationEnvoi";
import { useDispatch, useSelector } from "react-redux";
import { getEvaluationById } from "../../../features/evaluations/evaluations/evaluationContractSlice";

import {
  ITheme,
  getThemes,
  addThemeOptions,
} from "@/features/evaluations/themes/themesContractSlice";

import {
  IQuestion,
  getQuestions,
  addQuestionOptions,
  deleteQuestion,
} from "@/features/evaluations/questions/questionsContractSlice";

import {
  IEvaluation,
  getEvaluations,
  deleteEvaluation,
} from "@/features/evaluations/evaluations/evaluationContractSlice";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;
function Evaluations() {
  const dispatch = useDispatch();
  const {
    evaluationsData,
    loadingEvaluations,
    errorEvaluations,
    evaluationData,
  } = useSelector((store: any) => store.evaluationEval);
  const { themesData, loadingThemes, errorThemes } = useSelector(
    (store: any) => store.evaluationTheme
  );
  const { questionsData, loadingQuestions, errorQuestions, questionOptions } =
    useSelector((store: any) => store.evaluationQuestion);

  var { windowWidth } = useSelector((store: any) => store.ui);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [visibleDetailsView, setVisibleDetailsView] = useState(false);
  const [visibleDetailsEnvoi, setVisibleDetailsEnvoi] = useState(false);
  const [refresh, forceRefresh] = useState(0);

  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [data, setData] = useState(evaluationsData);
  const [dataThemes, setDataThemes] = useState(themesData);
  const [dataQuestions, setDataQuestions] = useState(questionsData);
  const [options, setOptions] = useState();
  const [id, setId] = useState(1);

  const obj = {
    id: id,
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObjView = {
    id: id,
    visible: visibleDetailsView,
    setVisible: setVisibleDetailsView,
    forceRefresh: forceRefresh,
  };
  const detailsObjEnvoi = {
    id: id,
    visible: visibleDetailsEnvoi,
    setVisible: setVisibleDetailsEnvoi,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    id: id,
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    forceRefresh: forceRefresh,
  };

  useEffect(() => {
    dispatch(getEvaluations());
    dispatch(getThemes());
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    /*  {
      value: "1",
      label: "Apport Manageriale",
    } */
    const opt = themesData?.map(({ id, designation }) => ({
      value: id,
      label: designation,
    }));
    //console.log("opt", JSON.stringify(opt));
    /* setOptions(() => opt); */
    // save themeoptions to redux state
    dispatch(addThemeOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, []);

  useEffect(() => {
    /*  {
      value: "1",
      label: "Apport Manageriale",
    } */
    let opt = themesData?.map(({ id, designation }) => ({
      value: id,
      label: designation,
    }));

    let selectTheme = {
      value: 0,
      label: "Choisir un theme",
    };
    /*   opt = [...opt, selectTheme];*/
    // opt.sort((a, b) => a.label - b.label);
    //  opt.splice(1, 0, selectTheme);
    console.log("opt", opt);
    setOptions(() => opt);
    // save themeoptions to redux state
    dispatch(addThemeOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, [themesData]);

  useEffect(() => {
    /*  {
      value: "1",
      label: "Apport Manageriale",
    } */
    let opt = questionsData?.map(({ id, question_designation, theme_id }) => ({
      value: id,
      theme_id: theme_id,
      label: question_designation,
    }));
    let selectQuestion = {
      value: 0,
      theme_id: 0,
      label: "Choisir une question ",
    };
    //  opt.splice(1, 0, selectQuestion);
    console.log("opt", opt);
    setOptions(() => opt);
    // save themeoptions to redux state
    dispatch(addQuestionOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, [questionsData]);

  const handleOpenChange = (flag: boolean) => {
    setOpenSelectMenu(flag);
  };
  const handleCloseCaution = (id) => {
    forceRefresh(Math.random());
  };

  useEffect(() => {
    setData(evaluationsData);
  }, [refresh]);

  useEffect(() => {
    setData(evaluationsData);
  }, [loadingEvaluations.isSuccess]);

  useEffect(() => {
    setDataThemes(themesData);
  }, [loadingThemes.isSuccess]);

  useEffect(() => {
    setDataQuestions(questionsData);
  }, [loadingQuestions.isSuccess]);

  const columns: ProColumns<IEvaluation["evaluationsData"]>[] = [
    {
      title: "ID",
      dataIndex: "id",
      render: (code) => <a>{code}</a>,
      key: "id",
      search: false,
    },
    {
      title: "Entreprise",
      key: "entreprise",
      dataIndex: "entreprise",
      search: false,
    },
    {
      title: "Departement",
      dataIndex: "departement",
      responsive: ["md"],
      key: "departement",
    },

    {
      title: "Annee",
      key: "annee",
      dataIndex: "annee",
      search: false,
      responsive: ["sm"],
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (_, { id }) =>
        windowWidth > 620 ? (
          <Space size="small">
            <a
              onClick={() => {
                setId(id);
                dispatch(getEvaluationById(id));
                setVisibleDetailsView(true);
              }}
            >
              <Tooltip placement="top" title={"Visualiser"}>
                <EyeOutlined />
              </Tooltip>
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                setId(id);
                dispatch(getEvaluationById(id));
                setVisibleDetails(true);
              }}
            >
              <Tooltip placement="top" title={"Modifier"}>
                <EditOutlined />
              </Tooltip>
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="voulez-vous vraiment supprimer cette evaluation ?"
                onConfirm={() => {
                  dispatch(deleteEvaluation(id));
                  dispatch(getEvaluations());
                }}
                okText="Oui"
                cancelText="Non"
              >
                <DeleteOutlined />
              </Popconfirm>
            </a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                setId(id);
                setVisibleDetailsEnvoi(true);
                dispatch(getEvaluationById(id));
              }}
            >
              <Tooltip placement="top" title={"Envoyer"}>
                <SendOutlined />
              </Tooltip>
            </a>
          </Space>
        ) : (
          <TableDropdown
            key=" actionGroup "
            menus={[
              {
                key: "0",
                name: "Détail",
                onClick: () => {
                  setVisibleDetails(true);
                },
              },
              {
                key: "1",
                name: "Modifier",
                onClick: () => {
                  setVisibleDetails(true);
                },
              },
              { key: "2", name: "Supprimer" },
            ]}
          />
        ),
    },
  ];
  return (
    <div className="Contracts">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des Evaluations</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des Evaluations</Title>}
            bordered={false}
          >
            {loadingEvaluations.isSuccess ? (
              <ProTable<IEvaluation["evaluationsData"]>
                columns={columns}
                cardBordered
                columnsState={{
                  persistenceKey: "pro-table-singe-demos",
                  persistenceType: "localStorage",
                  onChange(value) {
                    // console.log("value: ", value);
                  },
                }}
                search={{
                  labelWidth: "auto",
                }}
                options={{
                  setting: {
                    listsHeight: 400,
                  },
                }}
                pagination={{
                  pageSize: 8,
                  onChange: (page) => console.log(page),
                }}
                headerTitle=""
                request={async (params) => {
                  // console.log(`request params:`, params);
                  var dataFilter = data;
                  if (params.code_client)
                    dataFilter = dataFilter.filter((item) =>
                      item.code_client
                        .toString()
                        .toUpperCase()
                        .search(params.code_client.toString().toUpperCase()) ===
                      -1
                        ? false
                        : true
                    );
                  if (params.code_dossier)
                    dataFilter = dataFilter.filter((item) =>
                      item.code_dossier
                        .toString()
                        .toUpperCase()
                        .search(
                          params.code_dossier.toString().toUpperCase()
                        ) === -1
                        ? false
                        : true
                    );
                  // if(params.nature_echeance) dataFilter=dataFilter.filter((item)=>item.nature_echeance.toString().toUpperCase().search(params.nature_echeance.toString().toUpperCase())===-1?false:true);
                  return {
                    data: dataFilter,
                    success: true,
                  };
                }}
                toolBarRender={() => [
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setVisibleForm(true);
                    }}
                  >
                    Ajouter une évaluation
                  </Button>,
                ]}
              />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
      <CreateEvaluation {...obj}></CreateEvaluation>
      <EvaluationDetails {...detailsObj}></EvaluationDetails>
      <EvaluationView {...detailsObjView}></EvaluationView>
      <EvaluationEnvoi {...detailsObjEnvoi}></EvaluationEnvoi>
    </div>
  );
}

export default Evaluations;
