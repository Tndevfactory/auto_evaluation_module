import React, { useEffect, useState, useRef } from "react";
import "@/style/modules/Flotte.less";
import type { NotificationPlacement } from "antd/es/notification/interface";
import {
  UploadProps,
  Button,
  Space,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Tabs,
  Card,
  Skeleton,
  notification,
} from "antd";
import { ProCard } from "@ant-design/pro-components";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  ITheme,
  getThemes,
  addThemeOptions,
  deleteTheme,
} from "@/features/evaluations/themes/themesContractSlice";
import {
  IQuestion,
  getQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  clearMessageQuestion,
} from "@/features/evaluations/questions/questionsContractSlice";
const { Option } = Select;
const { TextArea } = Input;

//ThemeDetails
const QuestionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  // begin
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification de Sauvegarde`,
      description: messageUpdateQuestion,
      placement,
    });
  };

  const dispatch = useDispatch();
  const { windowWidth } = useSelector((store: any) => store.ui);
  const {
    questionsData,
    questionData,
    loadingQuestions,
    errorQuestions,
    loadingGetQuestionById,
    messageUpdateQuestion,
    errorUpdateQuestion,
    loadingUpdateQuestion,
  } = useSelector((store: any) => store.evaluationQuestion);

  const { themesData, loadingThemes, themeOptions } = useSelector(
    (store: any) => store.evaluationTheme
  );

  const [dataThemes, setDataThemes] = useState(() => themesData);

  const [dataQuestion, setDataQuestion] = useState(() => questionData);
  const [options, setOptions] = useState();

  useEffect(() => {
    dispatch(getThemes());
    console.log("useEffect trigered dispatch");
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
    setOptions(() => opt);
    // save themeoptions to redux state
    dispatch(addThemeOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, [themesData]);

  useEffect(() => {
    setDataQuestion(questionData);
    // console.log("useEffect trigered");
  }, [loadingGetQuestionById.isSuccess]);

  useEffect(() => {
    console.log(messageUpdateQuestion);
    //clearMessage();
    // use reducers
    if (messageUpdateQuestion) {
      openNotification("topRight");
    }

    setTimeout(() => clearMessageQuestion(), 1000);
  }, [messageUpdateQuestion]);

  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };

  const onClose = () => {
    setVisible(false);
    // clear update message from the store state
    clearMessageQuestion();
  };

  const handleResetField = () => {
    setDataQuestion(questionData);
  };

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setDataQuestion({
      ...dataQuestion,
      [name]: value,
    });
  };

  const handleOnchangeSelect = (value: string) => {
    console.log(`selected ${value}`);
    // console.log(`themesData ${JSON.stringify(themesData)}`);
    const theme = themesData.find(({ id }) => id === Number(value));
    console.log(`resulttt ${theme.designation}`);

    setDataQuestion({
      ...dataQuestion,
      theme_id: value,
      theme_designation: theme.designation,
    });
  };
  const handleSubmit = () => {
    /* console.log(`dataQuestion ${JSON.stringify(dataQuestion)}`); */
    dispatch(updateQuestion(dataQuestion));
    dispatch(getQuestions());
    setVisible(false);
  };

  return (
    <>
      {contextHolder}

      <Drawer
        title={"Fermer"}
        width={windowWidth > 750 ? 720 : "90%"}
        onClose={onClose}
        open={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        className="ThemeDetails"
      >
        <Space direction="vertical" size="middle" style={{ display: "flex" }}>
          <Card title="Modification question">
            {questionData ? (
              <Form onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={4}>
                    <Form.Item label="Theme" required></Form.Item>
                  </Col>
                  <Col xs={20}>
                    <Form.Item>
                      <Select
                        value={dataQuestion.theme_designation}
                        style={{ width: 320 }}
                        onChange={handleOnchangeSelect}
                        options={themeOptions}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={4}>
                    <Form.Item label="Designation" required></Form.Item>
                  </Col>
                  <Col xs={20}>
                    <Form.Item>
                      <TextArea
                        rows={4}
                        name="question_designation"
                        value={dataQuestion.question_designation}
                        onChange={handleOnchange}
                        required
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <div style={{ width: "100%", textAlign: "right" }}>
                        <Button
                          className="btnAnnuler"
                          onClick={handleResetField}
                          style={{ marginRight: "10px" }}
                        >
                          Annuler
                        </Button>
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="btnAnnuler"
                          style={{ marginRight: "10px" }}
                        >
                          Modifier
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

export default QuestionDetails;
