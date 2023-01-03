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
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
  clearMessageTheme,
} from "@/features/evaluations/themes/themesContractSlice";

const { Option } = Select;

const CreateTheme: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  //begin
  const {
    themesData,
    themeData,
    message,
    loading,
    error,
    loadingGetThemeById,
    messageUpdateTheme,
    errorUpdateTheme,
    loadingUpdateTheme,
  } = useSelector((store: any) => store.evaluationTheme);
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    dispatch(getThemes());
    setVisible(false);
  };
  const handleSubmit = (values) => {
    dispatch(
      createTheme({
        descriptif: values.descriptif,
        designation: values.designation,
      })
    );
    dispatch(getThemes());
    forceRefresh(Math.random());
    setVisible(false);
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
        <Card title="Ajouter nouveau theme">
          <Form layout="vertical" hideRequiredMark onFinish={handleSubmit}>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  name="designation"
                  label="Désignation"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer l'intitulé du theme",
                    },
                  ]}
                >
                  <Input placeholder="Intitulé du theme" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                <Form.Item
                  name="descriptif"
                  label="Descriptif"
                  rules={[
                    {
                      required: true,
                      message: "Veuillez entrer le nom du departement",
                    },
                  ]}
                >
                  <Input placeholder="Décrire le théme" />
                </Form.Item>
              </Col>

              <Form.Item
                style={{
                  width: "100%",
                  textAlign: "right",
                  marginRight: "10px",
                }}
              >
                <Button htmlType="reset" style={{ marginRight: "10px" }}>
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

export default CreateTheme;
