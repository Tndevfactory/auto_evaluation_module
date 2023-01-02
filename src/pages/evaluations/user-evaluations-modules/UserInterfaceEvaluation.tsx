import React, { useEffect, useState } from "react";
import {
  Skeleton,
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
  Select,
  Input,
  Tooltip,
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
  SendOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import moment from "moment";

import EvaluationView from "./UserInterfaceEvaluationView";

import { useDispatch, useSelector } from "react-redux";

import {
  IUserEvaluation,
  getUserInterfaceEvaluationById,
  getAllUserInterfaceEvaluationByAnnee,
} from "@/features/evaluations/userEvaluations/userEvaluationContractSlice";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

function UserInterfaceEvaluations() {
  const dispatch = useDispatch();

  const { loadingGetAllEvaluationByAnnee, allUserEvaluationsDataByAnnee } =
    useSelector((store: any) => store.userEvaluation);

  var { windowWidth } = useSelector((store: any) => store.ui);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [visibleDetailsView, setVisibleDetailsView] = useState(false);
  const [visibleDetailsEnvoi, setVisibleDetailsEnvoi] = useState(false);
  const [refresh, forceRefresh] = useState(0);

  const [openSelectMenu, setOpenSelectMenu] = useState(false);
  const [dataUserEvaluations, setDataUserEvaluations] = useState(
    allUserEvaluationsDataByAnnee
  );

  const [id, setId] = useState(1);

  const obj = {
    id: id,
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };

  const detailsObjView = {
    id: id,
    visible: visibleDetailsView,
    setVisible: setVisibleDetailsView,
    forceRefresh: forceRefresh,
  };

  /*  const detailsObjEnvoi = {
    id: id,
    visible: visibleDetailsEnvoi,
    setVisible: setVisibleDetailsEnvoi,
    forceRefresh: forceRefresh,
  };

  const detailsObj = {
    id: id,
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    forceRefresh: forceRefresh,
  }; */

  useEffect(() => {
    dispatch(getAllUserInterfaceEvaluationByAnnee("2022"));
  }, []);

  useEffect(() => {
    setDataUserEvaluations(allUserEvaluationsDataByAnnee);
  }, [refresh]);

  useEffect(() => {
    setDataUserEvaluations(allUserEvaluationsDataByAnnee);
  }, [loadingGetAllEvaluationByAnnee.isSuccess]);

  const handleOpenChange = (flag: boolean) => {
    setOpenSelectMenu(flag);
  };

  const columns: ProColumns<IUserEvaluation["userEvaluationsData"]>[] = [
    {
      title: "ID",
      dataIndex: "id",
      render: (code) => <a>{code}</a>,
      key: "id",
      search: false,
    },
    {
      title: "Employé",
      key: "username",
      dataIndex: "username",
      search: false,
    },
    {
      title: "Entreprise",
      key: "entreprise",
      dataIndex: "entreprise",
      search: false,
    },
    {
      title: "Departement",
      dataIndex: "departement",
      responsive: ["md"],
      key: "departement",
    },

    {
      title: "Annee",
      key: "annee",
      dataIndex: "annee",
      search: false,
      responsive: ["sm"],
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (_, { id }) =>
        windowWidth > 620 ? (
          <Space size="small">
            <a
              onClick={() => {
                setId(id);
                dispatch(getUserInterfaceEvaluationById(id));
                setVisibleDetailsView(true);
              }}
            >
              <Tooltip placement="top" title={"Visualiser"}>
                <EyeOutlined />
              </Tooltip>
            </a>
            {/*  <Divider type="vertical" />
            <a
              onClick={() => {
                setId(id);
                dispatch(getEvaluationById(id));
                setVisibleDetails(true);
              }}
            >
              <Tooltip placement="top" title={"Modifier"}>
                <EditOutlined />
              </Tooltip>
            </a> */}
            {/*   <Divider type="vertical" />
            <a>
              <Popconfirm
                title="voulez-vous vraiment supprimer cette evaluation ?"
                  onConfirm={() => {
                  dispatch(deleteEvaluation(id));
                  dispatch(getEvaluations());
                }} 
                okText="Oui"
                cancelText="Non"
              >
                <DeleteOutlined />
              </Popconfirm>
            </a> */}
            {/*   <Divider type="vertical" />
            <a
              onClick={() => {
                setId(id);
                setVisibleDetailsEnvoi(true);
                dispatch(getEvaluationById(id));
              }}
            >
              <Tooltip placement="top" title={"Envoyer"}>
                <SendOutlined />
              </Tooltip>
            </a> */}
          </Space>
        ) : (
          <TableDropdown
            key=" actionGroup "
            menus={[
              {
                key: "0",
                name: "Détail",
                onClick: () => {
                  setVisibleDetails(true);
                },
              },
              {
                key: "1",
                name: "Modifier",
                onClick: () => {
                  setVisibleDetails(true);
                },
              },
              { key: "2", name: "Supprimer" },
            ]}
          />
        ),
    },
  ];
  return (
    <div className="getAllUsersInterfaceEvaluation ">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des User-Evaluations</Breadcrumb.Item>
      </Breadcrumb>
      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des user-Evaluations</Title>}
            bordered={false}
          >
            {loadingGetAllEvaluationByAnnee.isSuccess ? (
              <ProTable<IUserEvaluation["userEvaluationsData"]>
                columns={columns}
                cardBordered
                columnsState={{
                  persistenceKey: "pro-table-singe-demos",
                  persistenceType: "localStorage",
                  onChange(value) {
                    // console.log("value: ", value);
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
                headerTitle=""
                request={async (params) => {
                  // console.log(`request params:`, params);
                  var dataFilter = dataUserEvaluations;
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
                  // if(params.nature_echeance) dataFilter=dataFilter.
                  //filter((item)=>item.nature_echeance.toString().toUpperCase().search(params.nature_echeance.toString().toUpperCase())===-1?false:true);

                  return {
                    data: dataFilter,
                    success: true,
                  };
                }}
                /*  toolBarRender={() => [
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setVisibleForm(true);
                    }}
                  >
                    Ajouter une évaluation
                  </Button>,
                ]} */
              />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>

      <EvaluationView {...detailsObjView}></EvaluationView>
    </div>
  );
}

export default UserInterfaceEvaluations;
