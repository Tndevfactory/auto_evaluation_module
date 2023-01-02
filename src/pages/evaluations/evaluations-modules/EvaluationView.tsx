import React, { useEffect, useState, useRef } from "react";
import "@/style/modules/Flotte.less";
import { CopyToClipboard } from "react-copy-to-clipboard";
import type { NotificationPlacement } from "antd/es/notification/interface";
import { useRefState } from "./hooks";
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
  IEvaluation,
  getEvaluations,
  getEvaluationById,
  createEvaluation,
  updateEvaluation,
  deleteEvaluation,
  clearMessage,
} from "@/features/evaluations/evaluations/evaluationContractSlice";
const { Option } = Select;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;
//ThemeDetails
const EvaluationView: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  // begin

  const [api, contextHolder] = notification.useNotification();
  const openNotificationCopyLink = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification de copie`,
      description: "lien html copié",
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
  } = useSelector((store: any) => store.evaluationEval);

  const [dataEvaluation, setDataEvaluation] = useState(() => evaluationData);

  let urlbaseEvaluation =
    import.meta.env.VITE_PUBLIC_URL +
    import.meta.env.VITE_USER_EVALUATION_INTERFACE;

  if (import.meta.env.MODE === "development") {
    console.log(".env.MODE :", import.meta.env.MODE);
    urlbaseEvaluation =
      import.meta.env.VITE_PUBLIC_URL +
      import.meta.env.VITE_USER_EVALUATION_INTERFACE;
  } else {
    console.log(".env.MODE : ", import.meta.env.MODE);
    //   netlify
    urlbaseEvaluation =
      import.meta.env.VITE_PUBLIC_PRODUCTION_URL_NETLIFY +
      import.meta.env.VITE_USER_EVALUATION_INTERFACE;
    //erp
    /* urlbaseEvaluation =
      import.meta.env.VITE_PUBLIC_PRODUCTION_URL +
      import.meta.env.VITE_USER_EVALUATION_INTERFACE; */
  }

  const [url, setUrl] = useState(urlbaseEvaluation);

  const [loadingCopyLink, setLoadingCopyLink] = useState(false);
  const [linkToCopy, setLinkToCopy] = useState("");

  const handleCopyLink = () => {
    setLoadingCopyLink(true);

    setTimeout(() => {
      setLoadingCopyLink(false);
    }, 1100);
  };
  const onCopyLink = () => {
    openNotificationCopyLink("topRight");

    /* setTimeout(() => {
      setLinkToCopy("");
    }, 1500); */
    //  setLinkToCopy("");
    // setTimeout(() => setLinkToCopy(""), 1100);
  };

  useEffect(() => {
    setDataEvaluation(evaluationData);
    setLinkToCopy("");
  }, [loadingGetEvaluationById.isSuccess]);

  useEffect(() => {
    console.log("completeUrlEvaluation", dataEvaluation);
    let completeUrlEvaluation = url + evaluationData.annee;
    setLinkToCopy(completeUrlEvaluation);
  }, [loadingGetEvaluationById.isSuccess]);

  useEffect(() => {
    console.log(messageUpdateEvaluation);
    //clearMessage();
    // use reducers
    /*   if (messageUpdateEvaluation) {
      openNotificationCopyLink("topRight");
    } */

    setTimeout(() => clearMessage(), 1000);
  }, [messageUpdateEvaluation]);

  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };
  const onClose = () => {
    setVisible(false);
    // clear update message from the store state
    clearMessage();
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
  const handleSubmit = () => {
    dispatch(updateEvaluation(dataEvaluation));
    dispatch(getEvaluationById());
    setVisible(false);
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
          <Card>
            {evaluationData ? (
              <Form onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Space
                      direction="horizontal"
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      <Title level={4} className="text-blue-900 uppercase ">
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
                      <Title level={5}>Entreprise:</Title>
                      <Title level={5} className="text-blue-900 uppercase ">
                        {dataEvaluation.entreprise}
                      </Title>
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
                      <Title level={5}>Departement:</Title>
                      <Title level={5} className="text-blue-900 uppercase ">
                        {dataEvaluation.departement}
                      </Title>
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
                          {th.theme_designation}
                        </Title>
                      </Space>
                      {th?.questions?.map((q, iq) => (
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
                          type="primary"
                          onClick={handleCopyLink}
                          style={{ marginRight: "10px" }}
                          loading={loadingCopyLink}
                        >
                          <CopyToClipboard
                            /*  text={"http://auto-evaluation.com"} */
                            text={linkToCopy}
                            onCopy={onCopyLink}
                          >
                            {/*    send pop up confirmation to screen */}
                            <span>Copier lien {linkToCopy}</span>
                          </CopyToClipboard>
                        </Button>
                        {/*  <Button
                          type="primary"
                          htmlType="submit"
                          className="btnAnnuler"
                          onClick={() => {
                            true;
                          }}
                          style={{ marginRight: "10px" }}
                        >
                          Envoyer
                        </Button> */}
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

export default EvaluationView;
