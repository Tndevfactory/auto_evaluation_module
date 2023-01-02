import React, { useState, useRef, useEffect } from "react";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Button,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Space,
  Card,
  Collapse,
  Select,
  Typography,
  DatePicker,
  InputRef,
  Divider,
  Tooltip,
  Modal,
  Badge,
} from "antd";

import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

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
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  clearMessage,
} from "@/features/evaluations/evaluations/evaluationContractSlice";

import {
  SettingOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";

import { divIcon } from "leaflet";

const { Option } = Select;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;
dayjs.extend(customParseFormat);
let index = 0;

const CreateNewEvaluation: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  //begin
  const dFormat = "YYYY";
  const {
    evaluationsData,
    evaluationData,
    loadingEvaluations,
    loadingGetEvaluationById,
    messageUpdateEvaluation,
    errorUpdateEvaluation,
    loadingUpdateEvaluation,
  } = useSelector((store: any) => store.evaluationEval);

  const { themesData, themeOptions } = useSelector(
    (store: any) => store.evaluationTheme
  );

  const { questionsData, questionOptions } = useSelector(
    (store: any) => store.evaluationQuestion
  );

  var { windowWidth } = useSelector((store: any) => store.ui);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = () => (
    <SettingOutlined
      onClick={(event) => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );

  const [dataThemeOptions, setDataThemeOptions] = useState(themeOptions);
  const [dataQuestionOptions, setDataQuestionOptions] =
    useState(questionOptions);

  const [openModalCreateTheme, setOpenModalCreateTheme] = useState(false);
  const [openModalCreateQuestion, setOpenModalCreateQuestion] = useState(false);

  const [evaluation, setEvaluation] = useState({
    id: 1,
    entreprise: "SMART SKILLS",
    departement: "R&D",
    designation: "Auto-evaluation annuelle",
    annee: "2023",
    user_id: null,
    status: 0,
    themes: [
      {
        id: 0,
        theme_designation: "Choisir un theme",
        questions: [
          {
            id: 0,
            theme_id: 0,
            theme_designation: "Choisir une question",
            question_designation: "Choisir une question",
            response: null,
          },
        ],
      },
    ],
  });

  const [themeBlock, setAddThemeBlock] = useState({
    id: 0,
    entreprise: "TACTIC",
    departement: "R&D",
    theme_designation: "Choisir un theme",
    questions: [
      {
        id: 0,
        theme_id: 0,
        theme_designation: "Choisir un theme",
        question_designation: "Choisir une question",
        response: null,
      },
    ],
  });

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getThemes());
    dispatch(getQuestions());
  }, []);

  useEffect(() => {
    setDataThemeOptions(themeOptions);
  }, [themeOptions]);
  useEffect(() => {
    setDataQuestionOptions(questionOptions);
  }, [questionOptions]);

  const onClose = () => {
    dispatch(getEvaluations());
    setVisible(false);
  };

  // handling add theme block
  const handleAddThemeBlock = (e) => {
    // need theme id or valueID  and theme index

    const { themeid, themeindex } = e.target.dataset;

    console.log("themeid ", themeid);
    console.log("themeindex ", themeindex);

    // addong directly block
    let themes = [...evaluation.themes];

    themes.push(themeBlock);
    setEvaluation({
      ...evaluation,
      themes: themes,
    });
  };
  const handleRemoveThemeBlock = (e) => {
    // need question id or valueID  and theme id and question index

    const { themeid, themeindex } = e.target.dataset;

    console.log("themeid ", themeid);
    console.log("themeindex ", themeindex);

    // addong directly block
    let themes = [...evaluation.themes];
    themes.pop();
    setEvaluation({
      ...evaluation,
      themes: themes,
    });
  };

  // handling adding question block
  const handleAddQuestionBlock = (e) => {
    const { questionid, questionindex, themeid } = e.target.dataset;
    console.log("questionid ", questionid);
    console.log("questionindex ", questionindex);
    console.log("themeid ", themeid);

    //copy themesArrayCopy
    let themesArrayCopy = [...evaluation.themes];

    //find theme index inside copy
    let themeindex = themesArrayCopy.findIndex(
      (item) => item.id === parseInt(themeid)
    );

    console.log("themeindex ", themeindex);
    // copy the theme in themeObjectCopy
    let themeObjectCopy = { ...themesArrayCopy[themeindex] };
    console.log("themeObjectCopy ", themeObjectCopy);

    //copy questionsArray
    let questionsArrayCopy = [...themeObjectCopy.questions];
    console.log("questionsArrayCopy ", questionsArrayCopy);

    // push to new question block to questionsArrayCopy,
    // la question a ajouter doit porter le meme theme_id que tout le theme
    let q = questionsData.find((item) => item.id === parseInt(questionid));
    questionsArrayCopy.push(q);
    console.log("questionsArrayCopy ", questionsArrayCopy);

    //replace le questionArray dans themeObjectCopy
    let newTheme = {
      id: themeObjectCopy.id,
      theme_designation: themeObjectCopy.theme_designation,
      questions: [...questionsArrayCopy],
    };
    console.log("newTheme ", newTheme);

    //copy the questionarray in themearraycopy
    themesArrayCopy.splice(themeindex, 1, newTheme);
    console.log("themesArrayCopy ", themesArrayCopy);

    setEvaluation({
      ...evaluation,
      themes: themesArrayCopy,
    });
    console.log("evaluation ", evaluation);
  };

  const handleRemoveQuestionBlock = (e) => {
    const { questionid, questionindex, themeid } = e.target.dataset;
    console.log("questionid ", questionid);
    console.log("questionindex ", questionindex);
    console.log("themeid ", themeid);

    //copy themesArrayCopy
    let themesArrayCopy = [...evaluation.themes];

    //find theme index inside copy
    let themeindex = themesArrayCopy.findIndex(
      (item) => item.id === parseInt(themeid)
    );

    // copy the theme in themeObjectCopy
    let themeObjectCopy = { ...themesArrayCopy[themeindex] };
    console.log("themeObjectCopy ", themeObjectCopy);

    //copy questionsArray
    let questionsArrayCopy = [...themeObjectCopy.questions];
    console.log("questionsArrayCopy ", questionsArrayCopy);

    //push to new question block to questionsArrayCopy, la question a ajouter doit porter le meme theme_id que tout le theme
    let qIndex = questionsArrayCopy.findIndex(
      (item) => item.id === parseInt(questionid)
    );
    questionsArrayCopy.splice(qIndex, 1);
    console.log("questionsArrayCopy ", questionsArrayCopy);

    //replace le questionArray dans themeObjectCopy
    let newTheme = {
      id: themeObjectCopy.id,
      theme_designation: themeObjectCopy.theme_designation,
      questions: [...questionsArrayCopy],
    };
    console.log("newTheme ", newTheme);

    //copy the questionarray in themearraycopy
    themesArrayCopy.splice(themeindex, 1, newTheme);
    console.log("themesArrayCopy ", themesArrayCopy);

    setEvaluation({
      ...evaluation,
      themes: [...themesArrayCopy],
    });
    console.log("evaluation ", evaluation);
  };

  // Entreprise
  const handleOnchangeSelectEntreprise = (value) => {
    setEvaluation({ ...evaluation, entreprise: value });
  };

  // departement
  const handleOnchangeSelectDepartement = (value) => {
    setEvaluation({ ...evaluation, departement: value });
  };
  // general informations
  const handleOnchangeSelectDesignation = (e) => {
    const { name, value } = e.currentTarget;
    console.log("value ", value);
    setEvaluation({ ...evaluation, designation: value });
  };

  const onChangeDataPicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setEvaluation({
      ...evaluation,
      annee: dateString,
    });
    console.log("dateString", dateString);
    /*  let ev;
    ev = { ...evaluationDraft };
    ev.annee = dateString;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev)); */
  };

  // select theme to update ui
  const handleOnchangeSelectTheme = (e) => {
    const { value } = e.currentTarget;
    const { themeindex, themeid } = e.currentTarget.dataset;

    console.log("value themeID to go for ", value);
    console.log("themeindex current  ", themeindex);
    console.log("themeid current theme ID", themeid);

    // find the theme lookink for
    let theme = themesData.find((item) => item.id === parseInt(value));
    console.log("theme to go for ", theme);
    // copy the themes state
    let themesArrayCopy = [...evaluation.themes];
    console.log("themesArrayCopy ", themesArrayCopy);
    // filtering the questions belonging to theme found
    let questions = questionsData.filter(
      (item) => item.theme_id === parseInt(value)
    );

    console.log("questions ", questions);
    let newTheme = {
      id: theme.id,
      theme_designation: theme.designation,
      questions: [...questions.slice(0, 1)],
    };

    // replace the actual theme refering to his index
    themesArrayCopy.splice(themeindex, 1, newTheme);
    // updating ui
    setEvaluation({
      ...evaluation,
      themes: themesArrayCopy,
    });
  };

  const handleOnchangeSelectQuestion = (e) => {
    const { value } = e.currentTarget;
    const { questionid, themeid, questionindex } = e.currentTarget.dataset;

    console.log("value questionID to go for ", value);
    console.log("current questionindex", questionindex);
    console.log("current questionid ", questionid);
    console.log("current themeid", themeid);

    // find the index of the theme
    // copy the theme
    let themesArrayCopy = [...evaluation.themes];
    let themeindex = themesArrayCopy.findIndex(
      (item) => item.id === parseInt(themeid)
    );
    console.log("themeindex ", themeindex);
    // number of questions in visual
    let visualQuestionLength = themesArrayCopy[themeindex].questions.length;
    console.log("visualQuestionLength ", visualQuestionLength);

    // find the theme concerned about change
    let theme = themesData.find((item) => item.id === parseInt(themeid));
    console.log("theme ", theme);

    // findind the question to theme found
    let questions = questionsData.filter(
      (item) => item.theme_id === parseInt(themeid)
    );
    console.log("questions ", questions);
    // finding the question
    let q = questions.find((item) => item.id === parseInt(value));
    console.log("q ", q);
    // copy of the questions
    let questionsCopy = [...questions];
    console.log("questionsCopy ", questionsCopy);

    // save ryan question element
    //let element = questionsCopy[questionindex];
    let element = questionsData.find(
      (item) => item.id === parseInt(questionid)
    );
    console.log("element ", element);

    // get index of the murder q
    let elementIndex = questionsCopy.findIndex((item) => item.id === q.id);
    console.log("elementIndex ", elementIndex);
    // replacing by splice or changing position based on index od question further in the same at
    questionsCopy.splice(questionindex, 1, q);
    // save ryan and put it in the place of murder
    questionsCopy.splice(elementIndex, 1, element);
    // put ryan in the place of outsider
    questionsCopy.splice(questionindex, 1, q);
    console.log("questionsCopy ", questionsCopy);

    let newTheme = {
      id: theme.id,
      theme_designation: theme.designation,
      questions: [...questionsCopy.slice(0, visualQuestionLength)],
    };
    // replace the actual theme refering to his indexhandleCreate
    themesArrayCopy.splice(themeindex, 1, newTheme);
    // updating ui
    setEvaluation({
      ...evaluation,
      themes: themesArrayCopy,
    });
  };

  const handleSubmit = (values) => {
    dispatch(
      createEvaluation({
        entreprise: values.entreprise,
        departement: values.departement,
        designation: values.designation,
      })
    );
    dispatch(getEvaluations());
    forceRefresh(Math.random());
    setVisible(false);
  };

  //handling creating nouvelle evaluation , send all shebang
  const handleCreate = () => {
    console.log("evaluation", evaluation);
    dispatch(createEvaluation(evaluation));
  };

  return (
    <>
      <Modal
        title="Ajouter nouveau theme"
        centered
        open={openModalCreateTheme}
        onOk={() => setOpenModalCreateTheme(false)}
        onCancel={() => setOpenModalCreateTheme(false)}
        width={700}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item name="designation" label="Désignation" className="mt-3">
              <Input placeholder="Intitulé du theme" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Form.Item name="descriptif" label="Descriptif">
              <Input placeholder="Décrire le théme" />
            </Form.Item>
          </Col>
        </Row>
      </Modal>

      <Modal
        title="Ajouter nouvelle question"
        centered
        open={openModalCreateQuestion}
        onOk={() => setOpenModalCreateQuestion(false)}
        onCancel={() => setOpenModalCreateQuestion(false)}
        width={700}
      >
        <Row gutter={16}>
          <Col xs={4}>
            <Form.Item label="Theme"></Form.Item>
          </Col>
          <Col xs={20}>
            <Form.Item>
              <Select
                value={"dataQuestion.theme_designation"}
                style={{ width: 320 }}
              />
            </Form.Item>
          </Col>
          <Col xs={4}>
            <Form.Item label="Designation"></Form.Item>
          </Col>
          <Col xs={20}>
            <Form.Item>
              <TextArea
                rows={4}
                name="question_designation"
                value={"dataQuestion.question_designation"}
                required
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>

      <Drawer
        title="Fermer"
        width={windowWidth}
        className="ThemeForm"
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card
            title={
              <div className="text-blue-800 uppercase text-xl   flex justify-center">
                Formulaire de création d'auto-evaluation
              </div>
            }
          >
            <Form
              layout="vertical"
              hideRequiredMark
              onFinish={handleSubmit}
              className="pt-6"
            >
              <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item name="entreprise" label="Entreprise">
                    <Select
                      value={evaluation.entreprise}
                      onChange={handleOnchangeSelectEntreprise}
                      style={{ width: 320 }}
                      options={[
                        { value: "TOUS", label: "TOUS" },
                        { value: "TACTIC", label: "TACTIC" },
                        { value: "SMART SKILLS", label: "SMART SKILLS" },
                        {
                          value: "SMART INNOVATION",
                          label: "SMART INNOVATION",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item name="departement" label="Departement">
                    <Select
                      value={evaluation.departement}
                      onChange={handleOnchangeSelectDepartement}
                      style={{ width: 320 }}
                      options={[
                        { value: "TOUS", label: "TOUS" },
                        { value: "R&D", label: "R&D" },
                        { value: "IT", label: "IT" },
                        {
                          value: "IOT",
                          label: "IOT",
                        },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item label="Désignation">
                    <Input
                      placeholder="Designation"
                      value={evaluation.designation}
                      name="designation"
                      onChange={handleOnchangeSelectDesignation}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item name="annee" label="Année">
                    <DatePicker
                      value={dayjs(evaluation.annee)}
                      onChange={onChangeDataPicker}
                      format={dFormat}
                      picker="year"
                      style={{ marginBottom: "9px" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Collapse
                    collapsible="icon"
                    defaultActiveKey={["1"]}
                    onChange={onChange}
                    expandIconPosition={"end"}
                  >
                    {evaluation.themes.map((th, ith) => (
                      <Panel
                        header={
                          <Space
                            className="bg-transparent"
                            style={{ width: "80%" }}
                          >
                            <Title
                              level={5}
                              style={{
                                fontSize: "0.92rem",
                                width: "14rem",
                                color:
                                  th.theme_designation === "Choisir un theme"
                                    ? "red"
                                    : "",
                              }}
                            >
                              <Badge
                                count={ith + 1}
                                color="#272F60"
                                className="mb-0.5"
                              />{" "}
                              {th.theme_designation}{" "}
                            </Title>

                            <select
                              data-themeindex={ith}
                              data-themeid={th.id}
                              onChange={(e) => handleOnchangeSelectTheme(e)}
                              value={th.id}
                              className={`
                              bg-gray-50 
                              text-gray-900 
                              text-md rounded-lg
                              border border-gray-200
                              focus:ring-blue-500
                              focus:border-blue-500 
                              block w-72 p-2 mb-2
                              `}
                            >
                              {dataThemeOptions?.map((v, i) => (
                                <option
                                  key={i}
                                  value={v.value}
                                  style={{ padding: "1rem 0rem !important" }}
                                  className="py-3 my-3"
                                >
                                  {v.label}
                                </option>
                              ))}
                            </select>
                            <span
                              onClick={(e) => handleAddThemeBlock(e)}
                              className="ml-4 mt-1 text-gray-600 inline-block cursor-pointer shadow-sm hover:text-green-400"
                            >
                              <Tooltip placement="top" title={"Ajouter block "}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-7 h-7 "
                                  data-themeid={th.id}
                                  data-themeindex={ith}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </Tooltip>
                            </span>
                            {ith + 1 > 1 ? (
                              <span
                                onClick={(e) => handleRemoveThemeBlock(e)}
                                className="ml-3 mt-1 text-gray-600 inline-block cursor-pointer shadow-sm hover:text-red-400"
                              >
                                <Tooltip
                                  placement="top"
                                  title={"Supprimer block "}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                    data-themeid={th.id}
                                    data-themeindex={ith}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </Tooltip>
                              </span>
                            ) : (
                              ""
                            )}

                            {/*                             <span
                              onClick={() => setOpenModalCreateTheme(true)}
                              className="ml-3 mt-1 text-blue-600 inline-block cursor-pointer shadow-sm hover:text-blue-500 "
                            >
                              <Tooltip
                                placement="top"
                                title={"Ajouter nouveau theme"}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-7 h-7 "
                                  data-themeid={th.id}
                                  data-themeindex={ith}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </Tooltip>
                            </span> */}
                          </Space>
                        }
                        key={ith + 1}
                        extra={genExtra()}
                        className="bg-gray-200 shadow"
                      >
                        {th.questions.map((q, iq, arr) => (
                          <Space
                            className=" mb-1 bg-transparent"
                            style={{
                              width: "80%",
                              color:
                                q.question_designation ===
                                "Choisir une question"
                                  ? "red"
                                  : "",
                            }}
                          >
                            <Title
                              level={5}
                              style={{ fontSize: "0.9rem", marginLeft: "1rem" }}
                            >
                              {iq + 1} {"-"} {q.question_designation}{" "}
                            </Title>

                            <select
                              /*  data-theme_index={arr[iq].theme_index} */
                              data-questionindex={iq}
                              data-questionid={q.id}
                              data-themeid={q.theme_id}
                              onChange={(e) => handleOnchangeSelectQuestion(e)}
                              value={q.id}
                              className="
                              bg-gray-50 
                              text-gray-900 
                               text-md rounded-lg
                               border border-gray-200
                              focus:ring-blue-500
                              focus:border-blue-500 
                              inline-block w-[20rem] p-2 mb-2
                                "
                            >
                              {dataQuestionOptions
                                ?.filter((v) => v.theme_id === arr[iq].theme_id)
                                .map((v, i) => (
                                  <option key={i} value={v.value}>
                                    {v.label}
                                  </option>
                                ))}
                            </select>
                            <span
                              onClick={(e) => handleAddQuestionBlock(e)}
                              className="ml-4 mt-1 text-gray-600 inline-block cursor-pointer
                               shadow-sm hover:text-green-400"
                            >
                              {/* {q.theme_id}--{q.id}--{iq} */}
                              <Tooltip
                                placement="top"
                                title={"Ajouter sous block "}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-7 h-7 "
                                  data-themeid={q.theme_id}
                                  data-questionindex={iq}
                                  data-questionid={q.id}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </Tooltip>
                            </span>
                            {iq + 1 > 1 ? (
                              <span
                                onClick={(e) => handleRemoveQuestionBlock(e)}
                                className=" mt-1 text-gray-600 inline-block cursor-pointer shadow-sm hover:text-red-400"
                                style={{ marginLeft: "8px" }}
                              >
                                <Tooltip
                                  placement="top"
                                  title={"Supprimer sous block "}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-7 h-7"
                                    data-themeid={q.theme_id}
                                    data-questionindex={iq}
                                    data-questionid={q.id}
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </Tooltip>
                              </span>
                            ) : (
                              ""
                            )}

                            {/*                             <span
                              onClick={() => setOpenModalCreateQuestion(true)}
                              className=" mt-1 text-blue-600 inline-block cursor-pointer shadow-sm hover:text-blue-500 "
                              style={{
                                fontSize: "0.9rem",
                                marginLeft: iq + 1 > 1 ? "5px" : "3px",
                              }}
                            >
                              <Tooltip
                                placement="top"
                                title={"Ajouter nouvelle question"}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-7 h-7 "
                                  data-themeid={q.theme_id}
                                  data-questionindex={iq}
                                  data-questionid={q.id}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </Tooltip>
                            </span> */}
                          </Space>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                </Col>

                <Form.Item
                  style={{
                    width: "100%",
                    textAlign: "right",
                    marginRight: "10px",
                    marginTop: "35px",
                  }}
                >
                  <Button htmlType="reset" style={{ marginRight: "10px" }}>
                    Annuler
                  </Button>
                  <Button type="primary" onClick={handleCreate}>
                    Enregistrer
                  </Button>
                </Form.Item>
              </Row>
            </Form>
          </Card>
        </Space>
      </Drawer>
    </>
  );
};

export default CreateNewEvaluation;
