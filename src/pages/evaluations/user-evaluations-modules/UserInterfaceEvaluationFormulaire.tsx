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
import { useDispatch, useSelector } from "react-redux";
import {
  IUserEvaluation,
  getUserInterfaceEvaluationByAnnee,
  userCreateEvaluation,
  clearMessageCreateUserEvaluation,
} from "@/features/evaluations/userEvaluations/userEvaluationContractSlice";
import FormItem from "antd/es/form/FormItem";
import { divIcon } from "leaflet";
import { Divider } from "antd";
const { Option } = Select;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
//UserInterfaceEvaluation
const UserInterfaceEvaluationFormulaire = () => {
  const { annee } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // begin
  const [api, contextHolder] = notification.useNotification();
  const CreateNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification de Sauvegarde`,
      description: messageCreateEvaluation,
      placement,
    });
  };

  const dispatch = useDispatch();
  const { windowWidth } = useSelector((store: any) => store.ui);
  const {
    messageCreateEvaluation,
    evaluationData,

    loadingGetEvaluationById,
    errorUpdateEvaluation,
    loadingUpdateEvaluation,
  } = useSelector((store: any) => store.userEvaluation);

  const [dataEvaluation, setDataEvaluation] = useState(evaluationData);

  useEffect(() => {
    dispatch(getUserInterfaceEvaluationByAnnee(annee));
    // console.log("useEffect trigered");
  }, []);

  useEffect(() => {
    setDataEvaluation(evaluationData);
  }, [loadingGetEvaluationById.isSuccess]);
  useEffect(() => {
    if (messageCreateEvaluation) {
      CreateNotification("topRight");
      setTimeout(
        () => navigate("/evaluation-saved-with-success", { replace: true }),
        1500
      );
    }
    dispatch(clearMessageCreateUserEvaluation());

    setTimeout(() => dispatch(clearMessageCreateUserEvaluation()), 1000);
    // setTimeout(() => navigate("/evaluation-saved-with-success"), 2000);
  }, [messageCreateEvaluation]);

  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };
  const onClose = () => {
    // clear update message from the store state
  };
  const handleResetField = () => {
    /*    setDataEvaluation(evaluationData); */
  };

  const handleOnchangeUsername = (e) => {
    const { name, value } = e.target;

    setDataEvaluation({
      ...dataEvaluation,
      [name]: value,
      user_id: Math.random() * (9000 - 1),
      status: 1,
    });
    console.log("dataEvaluation ", dataEvaluation);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    const { themeid, questionindex, questionid } = e.target.dataset;

    console.log("name ", name);
    console.log("value ", value);
    console.log("themeid ", themeid);
    console.log("questionindex ", questionindex);
    console.log("questionid ", questionid);

    let themesArrayCopy = [...dataEvaluation.themes];
    console.log("themesArrayCopy  ", themesArrayCopy);

    let theme = themesArrayCopy.find((item) => item.id === parseInt(themeid));
    console.log("theme  ", theme);
    let themeIndex = themesArrayCopy.findIndex(
      (item) => item.id === parseInt(themeid)
    );
    console.log("themeIndex  ", themeIndex);

    let themeObjectCopy = { ...theme };
    console.log("themeObjectCopy  ", themeObjectCopy);

    let questionsArrayCopy = [...themeObjectCopy.questions];
    console.log("questionsArrayCopy  ", questionsArrayCopy);

    let qObjectCopy = { ...questionsArrayCopy[questionindex] };
    console.log("qObjectCopy  ", qObjectCopy);

    // inverse trend from the bottom
    qObjectCopy = { ...qObjectCopy, response: value };
    console.log("qCopy  ", qObjectCopy);

    questionsArrayCopy.splice(questionindex, 1, qObjectCopy);
    console.log("questionsArrayCopy ", questionsArrayCopy);

    themeObjectCopy = { ...themeObjectCopy, questions: questionsArrayCopy };
    console.log("themeObjectCopy ", themeObjectCopy);

    themesArrayCopy.splice(themeIndex, 1, themeObjectCopy);
    console.log("themesArrayCopy ", themesArrayCopy);
    console.log("themeIndex ", themeIndex);

    setDataEvaluation({
      ...dataEvaluation,
      themes: themesArrayCopy,
    });
  };
  const handleSubmit = () => {
    dispatch(userCreateEvaluation(dataEvaluation));
  };
  return (
    <>
      {contextHolder}

      <div title={"Fermer"} className="ThemeDetails">
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card>
            {evaluationData ? (
              <Form onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <Title level={3} className="text-blue-900 uppercase mb-9">
                        {dataEvaluation.designation} {dataEvaluation.annee}
                      </Title>
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
                      {/*    <Title level={5}>Entreprise:</Title>
                      <Title level={5} className="text-blue-900 uppercase ">
                        {dataEvaluation.entreprise}
                      </Title> */}
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{
                        width: "100%",
                        justifyContent: "start",
                      }}
                    >
                      {/*   <Title level={5}>Departement:</Title>
                      <Title level={5} className="text-blue-900 uppercase ">
                        {dataEvaluation.departement}
                      </Title> */}
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Divider className="my-9" />
                    <Space
                      direction="horizontal"
                      style={{
                        width: "40rem",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                      className="bg-transparent"
                    >
                      <Title level={5}>Nom & prénom employé:</Title>
                      <TextArea
                        className="bg-gray-100"
                        rows={1}
                        style={{ width: "25rem" }}
                        value={dataEvaluation.username}
                        name="username"
                        onChange={handleOnchangeUsername}
                        required
                      />
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
                        padding: "5px",
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
                          {th.theme_designation}
                        </Title>
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
                              <span className="mb-0.5 text-blue-900 ">
                                {iq + 1}
                              </span>{" "}
                              {q.question_designation}
                            </Title>
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
                              rows={4}
                              style={{ width: "100%" }}
                              name="response"
                              data-themeid={q.theme_id}
                              data-questionindex={iq}
                              data-questionid={q.id}
                              value={q.response}
                              onChange={handleOnchange}
                              required
                            />
                          </Space>
                        </div>
                      ))}
                    </Col>
                  ))}

                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item wrapperCol={{ offset: 8, span: 15 }}>
                      <div
                        style={{
                          width: "100%",
                          textAlign: "right",
                          marginTop: "3rem",
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
                          type="primary"
                          className="btnAnnuler"
                          style={{ marginRight: "10px" }}
                          htmlType="submit"
                        >
                          Envoyer
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
      </div>
    </>
  );
};

export default UserInterfaceEvaluationFormulaire;
