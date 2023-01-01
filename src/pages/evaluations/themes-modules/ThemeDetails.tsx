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
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
  clearMessageTheme,
} from "@/features/evaluations/themes/themesContractSlice";
const { Option } = Select;

//ThemeDetails
const ThemeDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
}> = ({ visible, setVisible, forceRefresh }) => {
  // begin
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: `Notification de mise a jour`,
      description: messageUpdateTheme,
      placement,
    });
  };

  const dispatch = useDispatch();
  const { windowWidth } = useSelector((store: any) => store.ui);
  const {
    themesData,
    themeData,
    loadingGetThemeById,
    messageUpdateTheme,
    errorUpdateTheme,
    loadingUpdateTheme,
  } = useSelector((store: any) => store.evaluationTheme);

  const [dataTheme, setDataTheme] = useState(() => themeData);

  useEffect(() => {
    setDataTheme(themeData);
    // console.log("useEffect trigered");
  }, [loadingGetThemeById.isSuccess]);

  useEffect(() => {
    console.log(messageUpdateTheme);
    //clearMessage();
    // use reducers
    if (messageUpdateTheme) {
      openNotification("topRight");
    }

    setTimeout(() => clearMessageTheme(), 1000);
  }, [messageUpdateTheme]);

  const styleCard: React.CSSProperties = {
    padding: "10px",
    marginBottom: "15px",
  };
  const onClose = () => {
    setVisible(false);
    // clear update message from the store state
    clearMessageTheme();
  };
  const handleResetField = () => {
    setDataTheme(themeData);
  };
  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setDataTheme({
      ...dataTheme,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    dispatch(updateTheme(dataTheme));
    dispatch(getThemes());
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
          <Card title="Modification du Théme">
            {themeData ? (
              <Form onFinish={handleSubmit}>
                <Row gutter={16}>
                  <Col xs={24}>
                    <Form.Item label="Designation">
                      <Input
                        name="designation"
                        value={dataTheme.designation}
                        onChange={handleOnchange}
                        placeholder="Intitule du theme"
                        required
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24}>
                    <Form.Item label="Departement">
                      <Input
                        name="descriptif"
                        value={dataTheme.descriptif}
                        onChange={handleOnchange}
                        placeholder="Descriptif du theme"
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
                          onClick={() => {
                            true;
                          }}
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

export default ThemeDetails;
