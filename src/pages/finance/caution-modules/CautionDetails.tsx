import React, { useEffect, useState, useRef } from "react";
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
  Popconfirm,
  message,
  Popover,
  InputNumber,
  Upload,
  Divider,
  Typography,
} from "antd";
import { QuestionCircleOutlined, InboxOutlined } from "@ant-design/icons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addDuration,
  deleteCaution,
  updateCaution,
  CautionApprove,
  IProlongation,
} from "@/features/caution/cautionSlice";
import { getOneCaution, closeCaution } from "@/features/caution/cautionSlice";
import ListeProlongation from "./ListeProlongation";

const { Dragger } = Upload;
const { Option } = Select;
const { Title } = Typography;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
    } else if (status === "error") {
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const CautionDetails: React.FC<{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  forceRefresh: React.Dispatch<React.SetStateAction<number>>;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  prolongation: boolean;
  setProlongation: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({
  visible,
  setVisible,
  forceRefresh,
  update,
  setUpdate,
  prolongation,
  setProlongation,
}) => {
  var { caution } = useSelector((store: any) => store.caution);
  var { windowWidth } = useSelector((store: any) => store.ui);
  const dispatch = useDispatch();
  const [fields, setFields] = useState([]);
  const showDrawer = () => {
    setVisible(true);
  };
  const drawerEndRef = useRef(null);
  const drawerTopRef = useRef(null);

  const scrollToBottom = () => {
    drawerEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTop = () => {
    drawerTopRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const onClose = () => {
    setVisible(false);
    setUpdate(false);
    setProlongation(false);
    scrollToTop();
  };

  useEffect(() => {
    if (visible) {
      setFields([
        {
          name: ["nomProjet"],
          value: caution.Nom_Projet,
        },
        {
          name: ["demandeur"],
          value: caution.Demandeur,
        },
        {
          name: ["type"],
          value: caution.type_caution,
        },
        {
          name: ["client"],
          value: caution.Client,
        },
        {
          name: ["montant"],
          value: caution.Montant,
        },
        {
          name: ["dateD"],
          value: moment(caution.DateD, "DD/MM/YYYY"),
        },
        {
          name: ["dur??e"],
          value: update
            ? caution.Dur??e
            : caution.Dur??eAdditionnelle && caution.Dur??e
            ? `${caution.Dur??e} (${caution.Dur??eAdditionnelle} jours additionnels)`
            : caution.Dur??e,
        },
        {
          name: ["ligne"],
          value: caution.ligne,
        },
        {
          name: ["Etat_main_lev??e"],
          value: caution.Etat_main_lev??e,
        },
        {
          name: ["dateE"],
          value: moment(
            moment(
              moment(caution.DateD, "DDMMYYYY").valueOf() +
                86400000 * caution.Dur??e
            ).format("DD/MM/YYYY"),
            "DD/MM/YYYY"
          ),
        },
        {
          name: ["Date_r??ception_PV_d??finitif"],
          value:
            caution.Date_r??ception_PV_d??finitif &&
            moment(caution.Date_r??ception_PV_d??finitif, "DD/MM/YYYY"),
        },
        {
          name: ["observation"],
          value: caution.Observation && caution.Observation,
        },
      ]);
    }
    setTimeout(() => {
      if (prolongation) scrollToBottom();
    }, 200);
  }, [caution, update, prolongation]);
  const handleUpdate = (values) => {
    console.log(values);
    console.log(caution.id);
    dispatch(
      updateCaution({
        id: caution.id,
        caution: {
          Nom_Projet: values.nomProjet,
          Demandeur: values.demandeur,
          type_caution: values.type,
          DateD: moment(values.dateD._d).format("DD/MM/YYYY"),
          Client: values.client,
          Montant: values.montant,
          Frais_mois: 20,
          Dur??e: values.dur??e,
          ligne: values.ligne,
          Etat_main_lev??e: values.Etat_main_lev??e,
          Date_r??ception_PV_d??finitif:
            values.Date_r??ception_PV_d??finitif &&
            moment(values.Date_r??ception_PV_d??finitif._d).format("DD/MM/YYYY"),
          Observation: null,
        },
      })
    );
    setUpdate(false);
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
    message.success("Click on Yes");
  };
  const handleCloseCaution = () => {
    dispatch(closeCaution({ id: caution.id }));
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
  };
  const handleAddDuration = (value) => {
    dispatch(
      addDuration({
        id: caution.id,
        Dur??eAdditionnelle: value.dur??eAdditionnelle,
      })
    );
    dispatch(getOneCaution({ id: caution.id }));
    forceRefresh(Math.random());
  };
  return (
    <Drawer
      title={update ? "Modifer la caution" : "D??tails de caution"}
      className="CautionDetails"
      width={windowWidth>750?720:"90%"}
      onClose={onClose}
      open={visible}
      bodyStyle={{
        paddingBottom: 80,
      }}
    >
      <div ref={drawerTopRef} />
      <Form
        layout="vertical"
        fields={fields}
        hideRequiredMark
        onFinish={handleUpdate}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="nomProjet" label="Nom du Projet ">
              <Input disabled={!update} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="demandeur" label="Demandeur">
              <Select disabled={!update}>
                <Option value="Abdelmonam KOUKA">Abdelmonam KOUKA</Option>
                <Option value="Asma Manaii">Asma Manaii</Option>
                <Option value="Hiba GRAYAA">Hiba GRAYAA</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="type" label="type de caution ">
              <Select disabled={!update}>
                <Option value="Provisoire-CSP">Provisoire-CSP</Option>
                <Option value="D??finitive-CSP">D??finitive-CSP</Option>
                <Option value="Retenue de Garantie">Retenue de Garantie</Option>
                <Option value="Avance">Avance</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="client" label="Client">
              <Select disabled={!update}>
                <Option value="Minist??re de la Jeunesse et des Sports">
                  Minist??re de la Jeunesse et des Sports
                </Option>
                <Option value="Minist??re de commerce et du D??veloppement des Exportations">
                  Minist??re de commerce et du D??veloppement des Exportations
                </Option>
                <Option value="Soci??t?? R??gionale de Transport du Gouvernorat de Nabeul (SRTGN)">
                  Soci??t?? R??gionale de Transport du Gouvernorat de Nabeul
                  (SRTGN)
                </Option>
                <Option value="Institut National de la M??t??orologie-INM">
                  Institut National de la M??t??orologie-INM
                </Option>
                <Option value="L'Instance Tunisienne de l'Investissement">
                  L'Instance Tunisienne de l'Investissement
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="montant" label="Montant">
              <Input disabled={!update} suffix="dt" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="dateD" label="Date d??but">
              <DatePicker
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placement="topLeft"
                disabled={!update}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="dur??e" label={<>Dur??e</>}>
              <Input disabled={!update} suffix="jours" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="dateE" label="Date d'??ch??ance">
              <DatePicker
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placement="topLeft"
                disabled={true}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="ligne" label="Ligne">
              <Select disabled={!update}>
                <Option value={"EPS"}>EPS</Option>
                <Option value={"Compte courant"}>Compte courant</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
            <Form.Item name="Etat_main_lev??e" label="Etat de main lev??e">
              <Select disabled={!update}>
                <Option value={true} style={{ color: "#2ECC71" }}>
                  Ferm??e
                </Option>
                <Option value={false} style={{ color: "#F4D03F" }}>
                  En cours
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="observation" label="Observation">
              <Input.TextArea autoSize disabled={!update} />
            </Form.Item>
          </Col>
        </Row>
        {prolongation && (
          <div ref={drawerEndRef}>
            <Title level={4} style={{ color: "#3498DB" }}>
              Demande de prolongation
            </Title>
            <Form layout="vertical" hideRequiredMark onFinish={() => {}}>
              <Row gutter={16}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item name="refProlg" label="R??f??rence demande">
                    <Input placeholder="Veuillez entrer la r??f??rence de prolongation" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Item
                    name="Dur??e prolongation"
                    label="Dur??e par jour"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the approver",
                      },
                    ]}
                  >
                    <InputNumber
                      style={{ width: "100%" }}
                      placeholder="Veuillez entrer la dur??e de prolongation"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="files"
                    label="Attachements"
                    rules={[
                      {
                        required: true,
                        message: "Please choose the type",
                      },
                    ]}
                  >
                    <Dragger {...props}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Cliquez ou faites glisser le fichier dans cette zone
                        pour le t??l??charger
                      </p>
                      <p className="ant-upload-hint">
                        Merci d'attacher le fichier ..., ... et ...
                      </p>
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
            </Form>{" "}
          </div>
        )}
        <Form.Item style={{ textAlign: "right" }}>
          {update ? (
            <Space>
              <Button className="btnAnnuler" onClick={() => setUpdate(false)}>
                Annuler
              </Button>
              <Button className="btnModofier" htmlType="submit">
                Mettre ?? jour
              </Button>
            </Space>
          ) : (
            <>
              {/* <Button hidden={true}>fake button</Button> */}
              {visible && prolongation && (
                <Space>
                  <Button
                    className="btnAnnuler"
                    onClick={() => setProlongation(false)}
                  >
                    Annuler
                  </Button>
                  <Button className="btnModofier">Confirmer</Button>
                </Space>
              )}
              {visible && caution.Etat_main_lev??e === "En attente" && (
                <Space>
                  <Button
                    className="btnFermer"
                    onClick={() => {
                      dispatch(CautionApprove({ id: caution.id }));
                      forceRefresh(Math.random());
                      onClose();
                    }}
                  >
                    Approuver
                  </Button>
                  <Button
                    className="btnModofier"
                    onClick={() => setUpdate(true)}
                  >
                    Modifier
                  </Button>
                  <Popconfirm
                    icon={
                      <QuestionCircleOutlined
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    title="voulez-vous vraiment supprimer cette caution ?"
                    onConfirm={() => {
                      dispatch(deleteCaution({ id: caution.id }));
                      onClose();
                      forceRefresh(Math.random());
                      message.success("Click on Yes");
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button className="btnSupprimer">Supprimer</Button>
                  </Popconfirm>
                </Space>
              )}
              {visible &&
                caution.Etat_main_lev??e === "En cours" &&
                !prolongation && (
                  <Space>
                    <Button
                      className="btnProlonger"
                      onClick={() => {
                        setProlongation(!prolongation);
                      }}
                    >
                      Prolonger
                    </Button>
                    <Button className="btnFermer" onClick={handleCloseCaution}>
                      Fermer
                    </Button>
                  </Space>
                )}
            </>
          )}
        </Form.Item>
      </Form>
      {caution?.Prolongations?.length !== 0 && (
        <>
          <Divider>Liste de prolongation</Divider>
          <ListeProlongation prolongation={caution.Prolongations} />
        </>
      )}
    </Drawer>
  );
};

export default CautionDetails;
