import React, { useEffect, useState, useMemo } from "react";

import {
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
  Skeleton,
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
} from "@ant-design/icons";

import { PoweroffOutlined } from "@ant-design/icons";

import moment from "moment";
import CreateTheme from "./CreateTheme";
import ThemeDetails from "./ThemeDetails";

import { useDispatch, useSelector } from "react-redux";
import {
  ITheme,
  getThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
  addThemeOptions,
  clearMessageTheme,
} from "@/features/evaluations/themes/themesContractSlice";

const { Title } = Typography;

function Themes() {
  const dispatch = useDispatch();
  var {
    themesData,
    themeData,
    messageThemes,
    loadingThemes,
    errorThemes,
    loadingGetThemeById,
    messageDeleteTheme,
    messageUpdateTheme,
    messageCreateTheme,
  } = useSelector((store: any) => store.evaluationTheme);

  var { windowWidth } = useSelector((store: any) => store.ui);

  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [refresh, forceRefresh] = useState(0);

  const [modify, setModify] = useState(false);
  const [openSelectMenu, setOpenSelectMenu] = useState(false);

  const [dataThemes, setDataThemes] = useState(themesData);

  const obj = {
    visible: visibleForm,
    setVisible: setVisibleForm,
    forceRefresh: forceRefresh,
  };
  const detailsObj = {
    visible: visibleDetails,
    setVisible: setVisibleDetails,
    forceRefresh: forceRefresh,
    modify: modify,
    setModify: setModify,
  };

  useEffect(() => {
    setDataThemes(themesData);
  }, [refresh]);

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
    /* setOptions(() => opt); */
    // save themeoptions to redux state
    dispatch(addThemeOptions(opt));
    // console.log("setOptions trigered by themesData", JSON.stringify(options));
  }, [themesData]);

  useEffect(() => {
    dispatch(getThemes());
    setDataThemes(themesData);
  }, [messageDeleteTheme]);

  useEffect(() => {
    dispatch(getThemes());
    setDataThemes(themesData);
  }, [messageUpdateTheme]);

  useEffect(() => {
    dispatch(getThemes());
    setDataThemes(themesData);
  }, [messageCreateTheme]);

  useEffect(() => {
    setDataThemes(themesData);
  }, [loadingThemes.isSuccess]);

  useEffect(() => {
    /*  dispatch(getThemes());
     setDataThemes(themesData); */
    dispatch(clearMessageTheme());
  }, []);
  const columns: ProColumns<ITheme["themesData"]>[] = [
    {
      title: "ID",
      dataIndex: "id",
      render: (id) => <a>{id}</a>,
      key: "id",
      search: false,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      responsive: ["md"],
      key: "designation",
    },

    {
      title: "Descriptif",
      key: "descriptif",
      dataIndex: "descriptif",
      search: false,
    },

    {
      title: "Action",
      valueType: "option",
      key: "option",
      render: (_, { id }) =>
        windowWidth > 620 ? (
          <Space size="small">
            <Divider type="vertical" />
            <a
              onClick={() => {
                /*  dispatch(clearMessageTheme()); */
                dispatch(getThemeById(id));
                setVisibleDetails(true);
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="voulez-vous vraiment supprimer ce theme ?"
                onConfirm={() => {
                  /*    dispatch(clearMessageTheme()); */
                  dispatch(deleteTheme(id));

                  /*  dispatch(getThemes()); */
                }}
                okText="Oui"
                cancelText="Non"
              >
                <DeleteOutlined />
              </Popconfirm>
            </a>
          </Space>
        ) : (
          <TableDropdown
            key=" actionGroup "
            menus={[
              {
                key: "0",
                name: "Détail",
                onClick: () => {
                  setModify(false);
                  setVisibleDetails(true);
                },
              },
              {
                key: "1",
                name: "Modifier",
                onClick: () => {
                  setModify(true);
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
    <div className="Contracts">
      <Breadcrumb separator=">" className="mt-5">
        <Breadcrumb.Item href="">Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="">Gestion des Themes</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="mt-5" gutter={[12, 24]}>
        <Col xs={24}>
          <Card
            title={<Title level={4}>Gestion des Thèmes</Title>}
            bordered={false}
          >
            {loadingThemes.isSuccess ? (
              <ProTable<ITheme["themesData"]>
                columns={columns}
                cardBordered
                dataSource={dataThemes}
                rowKey="code_theme"
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
                headerTitle="Liste des Themes"
                request={async (params) => {
                  let dataFilter = dataThemes;
                  if (params.designation) {
                    dataFilter = dataFilter.filter((item) => {
                      item.designation
                        .toLowerCase()
                        .includes(params.designation.toLowerCase());
                    });
                  }
                  return {
                    data: dataFilter,
                    success: true,
                  };
                }}
                toolBarRender={() => [
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      /*  dispatch(clearMessageTheme()); */
                      setVisibleForm(true);
                    }}
                  >
                    Ajouter un theme
                  </Button>,
                ]}
              />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
      </Row>
      <CreateTheme {...obj}></CreateTheme>
      <ThemeDetails {...detailsObj}></ThemeDetails>
    </div>
  );
}

export default Themes;
