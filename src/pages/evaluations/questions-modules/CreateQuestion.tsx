import React, { useState } from "react";
import {
  Button,
  Drawer,
  Input,
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Space,
  Card,
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
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  clearMessageQuestion,
} from "@/features/evaluations/questions/questionsContractSlice";

const { Option } = Select;
const { TextArea } = Input;
const CreateQuestion: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  //begin

  const {
    questionsData,
    questionData,
    loadingQuestions,
    loadingGetQuestionById,
    messageUpdateQuestion,
    errorUpdateQuestion,
    loadingUpdateQuestion,
  } = useSelector((store: any) => store.evaluationQuestion);

  const { themesData, loadingThemes, themeOptions } = useSelector(
    (store: any) => store.evaluationTheme
  );

  const { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [dataQuestion, setDataQuestion] = useState(() => questionData);

  const onClose = () => {
    dispatch(getQuestions());
    setVisible(false);
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
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setDataQuestion({
      ...dataQuestion,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    /* console.log(`dataQuestion ${JSON.stringify(dataQuestion)}`); */
    dispatch(createQuestion(dataQuestion));
    dispatch(getQuestions());
    setVisible(false);
  };

  const handleResetField = () => {
    setDataQuestion([]);
  };
  return (
    <Drawer
      title="Fermer"
      width={windowWidth > 750 ? 720 : "90%"}
      className="ThemeForm"
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card title="Ajouter nouvelle question">
          <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
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

              <Form.Item
                style={{
                  width: "100%",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                <Button
                  htmlType="reset"
                  onClick={handleResetField}
                  style={{ marginRight: "10px" }}
                >
                  Annuler
                </Button>
                <Button type="primary" htmlType="submit">
                  Enregistrer
                </Button>
              </Form.Item>
            </Row>
          </Form>
        </Card>
      </Space>
    </Drawer>
  );
};

export default CreateQuestion;
