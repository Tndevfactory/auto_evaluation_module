import React, { useEffect, useState, useRef, useCallback } from "react";
import "./evaluation.css";
import type { DatePickerProps } from "antd";
import type { NotificationPlacement } from "antd/es/notification/interface";
import dayjs from "dayjs";
import { useRefState } from "./hooks";
import { parse } from "date-fns";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Form,
  Row,
  Col,
  DatePicker,
  Tabs,
  Card,
  Skeleton,
  notification,
  Typography,
  Input,
  Badge,
  Collapse,
  Select,
} from "antd";
import { ProCard } from "@ant-design/pro-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { important } from "tailwind.config";
import Themes from "../themes-modules/Themes";
import ThemeDetails from "../themes-modules/ThemeDetails";
/* import { IEvaluation } from '../../../features/evaluations/evaluations/evaluationContractSlice'; */
import Questions from "../questions-modules/Questions";
import { Tooltip } from "antd";
import {
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  clearMessage,
  updateEvaluationDraft,
  setQop,
} from "@/features/evaluations/evaluations/evaluationContractSlice";
const { Option } = Select;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
dayjs.extend(customParseFormat);

//ThemeDetails
// ThemeDetails

const EvaluationDetails: React.FC<{
  id: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh, id }) => {
  // begin

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Notification de mise a jour",
      description: messageUpdateEvaluation,
      placement,
    });
  };

  const dispatch = useDispatch();
  const { windowWidth } = useSelector((store: any) => store.ui);
  const {
    evaluationsData,
    loadingEvaluations,
    evaluationData,
    loadingGetEvaluationById,
    messageUpdateEvaluation,
    errorUpdateEvaluation,
    loadingUpdateEvaluation,
    evaluationDraft,
    qop,
  } = useSelector((store: any) => store.evaluationEval);

  const { themesData, loadingThemes, themeOptions } = useSelector(
    (store: any) => store.evaluationTheme
  );
  const { questionsData, loadingQuestions, errorQuestions, questionOptions } =
    useSelector((store: any) => store.evaluationQuestion);

  const [dataEvaluation, dataEvaluationRef, setDataEvaluation] =
    useRefState(evaluationData);
  const [dataThemeOptions, dataThemeOptionsRef, setDataThemeOptions] =
    useRefState(themeOptions);
  const [dataQuestionOptions, dataQuestionOptionsRef, setDataQuestionOptions] =
    useRefState(questionOptions);
  const [dataQop, setDataQop] = useState(qop);

  useEffect(() => {
    setDataEvaluation(evaluationData);
    setDataThemeOptions(themeOptions);
    setDataQuestionOptions(questionOptions);
  }, [loadingGetEvaluationById.isSuccess]);

  useEffect(() => {
    console.log("questionOptions ", questionOptions);
    let qtt = [];
    let qs = [];
    let qt = [];
    qt = themesData?.map((element, i) => {
      qs = questionOptions?.filter((item) => item.theme_id === element.id);
      qtt[i] = qs;
      return qtt;
    });
    dispatch(setQop(qt));
    // setDataQop(qop);
    setDataQop(qt);
    console.log("qt ", qt);
    //console.log("qop ", qop);
  }, [loadingGetEvaluationById.isSuccess]);

  useEffect(() => {
    console.log(messageUpdateEvaluation);
    //clearMessage();
    // use reducers
    if (messageUpdateEvaluation) {
      openNotification("topRight");
    }
    dispatch(clearMessage());
    setTimeout(() => dispatch(clearMessage()), 1000);
    // hot reload update
    // dispatch(getEvaluationById(id));
  }, [messageUpdateEvaluation]);

  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };

  const onClose = () => {
    setVisible(false);
    // clear update message from the store state
    dispatch(clearMessage());
  };
  const handleResetField = () => {
    setDataEvaluation(evaluationData);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setDataEvaluation({
      ...dataEvaluation,
      [name]: value,
    });
  };

  const handleRemoveThemeBlock = (e) => {
    const { themeid, themeindex } = e.target.dataset;
    console.log("themeid ", themeid);
    console.log("themeindex ", themeindex);

    let themesCopy = [...dataEvaluation.themes];
    themesCopy.splice(themeindex, 1);

    setDataEvaluation({
      ...dataEvaluation,
      themes: themesCopy,
    });
  };

  const handleRemoveQuestionBlock = (e) => {
    const { questionid, questionindex, themeid } = e.target.dataset;
    console.log("questionid ", questionid);
    console.log("questionindex ", questionindex);
    console.log("themeid ", themeid);

    //copy themesArrayCopy
    let themesArrayCopy = [...dataEvaluation.themes];
    console.log("themesArrayCopy ", themesArrayCopy);
    //find theme index inside copy
    let themeindex = themesArrayCopy.findIndex(
      (item) => parseInt(item.id) === parseInt(themeid)
    );
    console.log("themeindex ", themeindex);
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

    setDataEvaluation({
      ...dataEvaluation,
      themes: themesArrayCopy,
    });
    console.log("dataEvaluation ", dataEvaluation);
  };

  const onChangeDataPicker: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setDataEvaluation({
      ...dataEvaluation,
      annee: dateString,
    });
    let ev;
    ev = { ...evaluationDraft };
    ev.annee = dateString;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev));
  };

  const handleOnchangeSelectEntreprise = (value: string) => {
    setDataEvaluation({
      ...dataEvaluation,
      entreprise: value,
    });
    let ev;
    ev = { ...evaluationDraft };
    ev.entreprise = value;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev));
  };

  const handleOnchangeSelectDepartement = (value: string) => {
    setDataEvaluation({
      ...dataEvaluation,
      departement: value,
    });
    let ev;
    ev = { ...evaluationDraft };
    ev.departement = value;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev));
  };

  const handleOnchangeSelectTheme = (e) => {
    // init
    let themeId = e.currentTarget.value;
    console.log("themeId ", themeId);
    let themeIndex = e.currentTarget.dataset.theme_index;
    console.log("themeIndex ", themeIndex);

    // console.log("questionOptions ", questionOptions);

    // change dataQuestionOptions // update questions based on theme

    /*  let qp = [...dataQop];
    console.log("qp ", qp);
    let qtt = [];
    let qs = [];
    let qt = [];
    qt = themesData?.map((element, i) => {
      qs = questionOptions?.filter((item) => item.theme_id === element.id);
      qtt[i] = qs;
      return qtt;
    }); 

    setDataQop(qt);*/

    // setDataQuestionOptions(newQuestionOptions);
    // get question length in dataEvaluation.themes[theme_index].questions.length
    let questionsLength = dataEvaluation.themes[themeIndex].questions.length;
    // console.log("questionsLength ", questionsLength);
    // console.log("themeOptions ", themeOptions);
    // console.log("themesData", themesData);
    // finding the theme
    let theme = themesData.find(
      (item) => parseInt(item.id) === parseInt(themeId)
    );
    console.log("theme ", theme);
    // get the questions belonging to themes
    // console.log("questionsData ", questionsData);
    // console.log("questionOptions ", questionOptions); */
    let questionsBelongingToTheme = questionsData.filter(
      (item) => parseInt(item.theme_id) === parseInt(themeId)
    );

    console.log("questionsBelongingToTheme ", questionsBelongingToTheme);
    // get the exact  number of questions from questionsBelongingToTheme
    let questionsArray = questionsBelongingToTheme.slice(0, questionsLength);
    console.log("questionsArray ", questionsArray);
    // search and composition
    let newTheme = {
      id: theme.id,
      questions: [...questionsArray],
      entreprise: theme.entreprise,
      departement: theme.departement,
      theme_index: theme.theme_index,
      theme_designation: theme.designation,
    };
    console.log("newTheme ", newTheme);
    let evThemes = [...dataEvaluation.themes];
    console.log("evScreen ", evThemes);
    // update screen

    evThemes.splice(themeIndex, 1, newTheme);
    console.log("evThemes ", evThemes);
    // console.log("dataEvaluation ", dataEvaluation.themes);
    // save modification in react state and redux state
    setDataEvaluation({
      ...dataEvaluation,
      themes: evThemes,
    });
    // console.log(`themesData ${JSON.stringify(themesData)}`);
    //const theme = themesData.find(({ id }) => id === Number(value));
    // console.log(`resulttt ${theme.designation}`);

    // update database
    let ev;
    ev = { ...evaluationDraft };
    ev.themes = evThemes;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev));
  };

  const handleOnchangeSelectQuestion = (e) => {
    // init
    let questionId = e.target.value;
    console.log("questionId ", questionId);

    let themeId = e.target.dataset.themeid;
    console.log("themeId ", themeId);

    let questionIndex = e.target.dataset.questionindex;
    console.log("questionIndex ", questionIndex);

    console.log("dataEvaluation themes ", dataEvaluation.themes);

    let allThemes = [...dataEvaluation.themes];
    console.log("allThemes", allThemes);

    let theme = allThemes.find(
      (item) => parseInt(item.id) === parseInt(themeId)
    );

    console.log("theme", theme);
    let themeIndex = allThemes.indexOf(theme);
    console.log("themeIndex ", themeIndex);
    //let themeIndex = theme.theme_index;

    //
    console.log("themeIndex", themeIndex);

    // reconstruction
    // finding the question
    let question = questionsData.find(
      (item) => parseInt(item.id) === parseInt(questionId)
    );
    let allQuestionsForOneTheme = [
      ...dataEvaluation.themes[themeIndex].questions,
    ];
    /*   console.log(
      "...dataEvaluation.themes[themeIndex].questions ",
      dataEvaluation.themes[themeIndex].questions
    ); */
    // search and composition
    let newQuestion = {
      id: question.id,
      question_index: question.question_index,
      response: question.response,
      theme_id: question.theme_id,
      theme_designation: question.theme_designation,
      question_designation: question.question_designation,
    };

    /*  allQuestionsForOneTheme = [...allQuestionsForOneTheme, newQuestion]; */
    allQuestionsForOneTheme.splice(questionIndex, 1, newQuestion);

    let newTheme = {
      questions: [...allQuestionsForOneTheme],
      id: theme.id,
      entreprise: theme.entreprise,
      departement: theme.departement,
      theme_index: theme.theme_index,
      theme_designation: theme.theme_designation,
    };

    /* allThemes = [...allThemes, newTheme]; */
    allThemes.splice(themeIndex, 1, newTheme);
    console.log("allThemes ", allThemes);
    /*     let evQuestions = [...dataEvaluation.themes[themeIndex].questions];
    console.log("evQuestions ", evQuestions); 
    // update screen

        evQuestions.splice(themeIndex, 1, newQuestion);
    console.log("evQuestions ", evQuestions);  */

    // save modification in react state and redux state
    setDataEvaluation({
      ...dataEvaluation,
      themes: allThemes,
    });

    // update database
    let ev;
    ev = { ...evaluationDraft };
    ev.themes = allThemes;
    console.log("ev", ev);
    dispatch(updateEvaluationDraft(ev));
  };

  /*  useEffect(() => {
    dispatch(updateEvaluation(dataEvaluation));
  }, [evaluationDraft]); */

  const handleUpdate = () => {
    dispatch(updateEvaluation(dataEvaluation));
  };
  const handleCreate = () => {
    dispatch(createEvaluation(dataEvaluation));
  };
  const dFormat = "YYYY";
  /* console.log(parse("2022", "yyyy", new Date())); */
  // console.log(dayjs("2022", dFormat).year());

  const f = (d) => {
    // return parse(d, "yyyy", new Date()).getFullYear();
    return dayjs(d, dFormat).year();
  };
  return (
    <>
      {contextHolder}

      <Drawer
        title={"Fermer"}
        width={windowWidth}
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        className="ThemeDetails"
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card title="Modification evaluation">
            {/* <div className="test">test css</div> */}

            {dataEvaluation ? (
              <Form>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <Title level={4} className="text-blue-900 uppercase ">
                        {dataEvaluation.designation}
                        {/*    {f(dataEvaluation.annee)} */}
                      </Title>

                      <DatePicker
                        value={dayjs(dataEvaluation.annee)}
                        onChange={onChangeDataPicker}
                        format={dFormat}
                        picker="year"
                        style={{ marginBottom: "9px" }}
                      />
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        width: "100%",
                        justifyContent: "start",
                        marginTop: "2rem",
                      }}
                    >
                      <Form.Item>
                        <Title level={5}>Entreprise:</Title>
                      </Form.Item>
                      <Form.Item>
                        <Select
                          defaultValue="Tous"
                          value={dataEvaluation.entreprise}
                          style={{ width: 320 }}
                          onChange={handleOnchangeSelectEntreprise}
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
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        width: "100%",
                        justifyContent: "start",
                        marginBottom: "2rem",
                      }}
                    >
                      <Form.Item>
                        <Title level={5}>Departement:</Title>
                      </Form.Item>
                      <Form.Item>
                        <Select
                          defaultValue="Tous"
                          value={dataEvaluation.departement}
                          style={{ width: 320 }}
                          onChange={handleOnchangeSelectDepartement}
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
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: "3px",
                        background: "#272F60",
                        boxShadow: "1px 1px rgba(0,0,0,0.5)",
                      }}
                    >
                      <Text className="text-white uppercase block m-0 p-0.5 ">
                        Formulaire
                      </Text>
                    </Space>
                  </Col>

                  {dataEvaluation?.themes?.map((th, ith) => (
                    <Col xs={24} key={ith}>
                      <Space
                        direction="horizontal"
                        style={{
                          width: "100%",
                          justifyContent: "start",

                          marginTop: "1.3rem",
                          marginLeft: "1rem",
                        }}
                      >
                        <Title level={5}>
                          <Badge
                            count={ith + 1}
                            color="#272F60"
                            className="mb-0.5"
                          />{" "}
                          Theme: <span>{th.theme_designation}</span>
                        </Title>

                        <select
                          data-theme_index={ith}
                          value={th.id}
                          style={{ width: 370 }}
                          onChange={(e) => handleOnchangeSelectTheme(e)}
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
                          {themeOptions.map((v, i) => (
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

                        {ith + 1 > 1 ? (
                          <span
                            onClick={(e) => handleRemoveThemeBlock(e)}
                            className="ml-3 mt-1 text-gray-600 inline-block cursor-pointer shadow-sm hover:text-red-400"
                          >
                            <Tooltip placement="top" title={"Supprimer block "}>
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
                      </Space>
                      {th?.questions?.map((q, iq, arr) => (
                        <div key={iq}>
                          <Space
                            direction="horizontal"
                            style={{
                              width: "100%",
                              justifyContent: "start",
                              marginBottom: "0.5rem",
                              marginTop: "1rem",
                              marginLeft: "2rem",
                            }}
                          >
                            <Title level={5}>
                              <span className="mb-0.5 text-blue-900 ">Q</span>
                              {"-"}
                              <span className="mb-0.5 text-blue-900 ">
                                {iq + 1}
                              </span>{" "}
                              <span>{q.question_designation}</span>
                              {/*  <span>
                                {`
                                  themeid ${q.theme_id} questionindex  ${iq} questionid ${q.id}
                                  `}
                              </span> */}
                            </Title>

                            <select
                              /*  data-theme_index={arr[iq].theme_index} */
                              data-themeid={q.theme_id}
                              data-questionindex={iq}
                              data-questionid={q.id}
                              value={q.id}
                              onChange={(e) => handleOnchangeSelectQuestion(e)}
                              className="
                              bg-gray-50 
                              text-gray-900 
                               text-md rounded-lg
                               border border-gray-200
                              focus:ring-blue-500
                              focus:border-blue-500 
                              block w-80 p-2 mb-2
                                "
                            >
                              {questionOptions
                                ?.filter(
                                  (v) =>
                                    v.theme_id === parseInt(arr[iq].theme_id)
                                )
                                .map((v, i) => (
                                  <option key={i} value={v.value}>
                                    {v.label}
                                  </option>
                                ))}
                            </select>

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
                          </Space>

                          <Space
                            direction="vertical"
                            style={{
                              width: "95%",
                              justifyContent: "start",
                              marginBottom: "0.5rem",
                              marginLeft: "2.5rem",
                            }}
                          >
                            <TextArea
                              className="bg-gray-100"
                              rows={3}
                              name={q.response}
                            />
                          </Space>
                        </div>
                      ))}
                    </Col>
                  ))}

                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <div
                        style={{
                          width: "100%",
                          textAlign: "right",
                          marginTop: "2rem",
                        }}
                      >
                        <Button
                          className="btnAnnuler"
                          onClick={onClose}
                          style={{ marginRight: "10px" }}
                        >
                          Fermer
                        </Button>
                        <Button
                          className="btnAnnuler"
                          onClick={handleResetField}
                          style={{ marginRight: "10px" }}
                        >
                          Reset
                        </Button>
                        {/* call update-evaluation , no matter the year if is the same */}

                        <Button
                          type="primary"
                          className="btnAnnuler"
                          onClick={handleUpdate}
                          style={{ marginRight: "10px" }}
                        >
                          Modifier
                        </Button>
                        {/* creer a partir de ce modele , check if not the same year , and call create eval */}
                        <Button
                          type="primary"
                          className="btnAnnuler"
                          onClick={handleCreate}
                          style={{ marginRight: "10px" }}
                        >
                          Creer à partir de ce modele
                        </Button>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Space>
      </Drawer>
    </>
  );
};

export default EvaluationDetails;
