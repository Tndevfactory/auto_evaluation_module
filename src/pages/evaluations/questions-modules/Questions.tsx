import React, { useEffect, useState } from "react";
import {
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
  Skeleton,
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
} from "@ant-design/icons";
import moment from "moment";
import CreateQuestion from "./CreateQuestion";
import QuestionDetails from "./QuestionDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  IQuestion,
  getQuestions,
  deleteQuestion,
  getQuestionById,
  addQuestionOptions,
  clearMessageQuestion,
} from "@/features/evaluations/questions/questionsContractSlice";
import {
  ITheme,
  getThemes,
  addThemeOptions,
  deleteTheme,
} from "@/features/evaluations/themes/themesContractSlice";
const { Title } = Typography;

function Questions() {
  const dispatch = useDispatch();
  var {
    questionsData,
    questionData,
    loadingQuestions,
    errorQuestions,
    loadingQuestionById,
    messageDeleteQuestion,
    messageUpdateQuestion,
    messageCreateQuestion,
  } = useSelector((store: any) => store.evaluationQuestion);
  const { themesData, loadingThemes, themeOptions } = useSelector(
    (store: any) => store.evaluationTheme
  );
  var { windowWidth } = useSelector((store: any) => store.ui);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [refresh, forceRefresh] = useState(0);
  const [modify, setModify] = useState(false);
  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [data, setData] = useState(questionsData);
  const [options, setOptions] = useState();
  const columns: ProColumns<IQuestion["questionsData"]>[] = [
    {
      title: "Id",
      dataIndex: "id",
      render: (code) => <a>{code}</a>,
      key: "id",
      search: false,
    },
    {
      title: "Designation",
      dataIndex: "question_designation",
      responsive: ["md"],
      key: "question_designation",
    },
    {
      title: "Theme",
      dataIndex: "theme_designation",
      responsive: ["md"],
      key: "theme_designation",
      search: false,
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (_, { id }) =>
        windowWidth > 620 ? (
          <Space size="small">
            {/*  <a
              onClick={() => {
                setModify(false);
                setVisibleDetails(true);
              }}
            >
              <EyeOutlined />
            </a> */}
            <Divider type="vertical" />
            <a
              onClick={() => {
                dispatch(getQuestionById(id));
                setModify(true);
                setVisibleDetails(true);
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="voulez-vous vraiment supprimer cette question ?"
                onConfirm={() => {
                  dispatch(deleteQuestion(id));
                  dispatch(getQuestions());
                }}
                okText="Oui"
                cancelText="Non"
              >
                <DeleteOutlined />
              </Popconfirm>
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
                  setModify(false);
                  setVisibleDetails(true);
                },
              },
              {
                key: "1",
                name: "Modifier",
                onClick: () => {
                  setModify(true);
                  setVisibleDetails(true);
                },
              },
              { key: "2", name: "Supprimer" },
            ]}
          />
        ),
    },
  ];

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
    const opt = questionsData?.map(
      ({ id, question_designation, theme_id }) => ({
        value: id,
        theme_id: theme_id,
        label: question_designation,
      })
    );
    //console.log("opt", JSON.stringify(opt));
    // setOptions(() => opt);
    // save themeoptions to redux state
    dispatch(addQuestionOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, [questionsData]);

  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    forceRefresh: forceRefresh,
    modify: modify,
    setModify: setModify,
  };

  useEffect(() => {
    setData(questionsData);
  }, [refresh]);

  useEffect(() => {
    dispatch(getQuestions());
    dispatch(clearMessageQuestion());
  }, []);

  useEffect(() => {
    setData(questionsData);
  }, [loadingQuestions.isSuccess]);

  useEffect(() => {
    dispatch(getQuestions());
    setData(questionsData);
  }, [messageDeleteQuestion]);

  useEffect(() => {
    dispatch(getQuestions());
    setData(questionsData);
  }, [messageUpdateQuestion]);

  useEffect(() => {
    dispatch(getQuestions());
    setData(questionsData);
  }, [messageCreateQuestion]);
  return (
    <div className="Contracts">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des Questions</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des Questions</Title>}
            bordered={false}
          >
            {loadingQuestions.isSuccess ? (
              <ProTable<IQuestion["questionsData"]>
                columns={columns}
                cardBordered
                columnsState={{
                  persistenceKey: "pro-table-singe-demos",
                  persistenceType: "localStorage",
                  onChange(value) {
                    console.log("value: ", value);
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
                headerTitle="Liste des questions"
                request={async (params) => {
                  console.log(`request params:`, params);
                  var dataFilter = questionsData;
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
                    data: data,
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
                    Ajouter une question
                  </Button>,
                ]}
              />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
      <CreateQuestion {...obj}></CreateQuestion>
      <QuestionDetails {...detailsObj}></QuestionDetails>
    </div>
  );
}

export default Questions;
