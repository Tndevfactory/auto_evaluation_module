import React, { useState } from "react";

import elasticLogo from "../assets/elastic-logo.png";
import { Link, NavLink } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  UnorderedListOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  SettingOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  DollarCircleOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { TbTicket } from "react-icons/tb";
import {
  Layout,
  Menu,
  Breadcrumb,
  Divider,
  Space,
  Avatar,
  AutoComplete,
  Input,
  Dropdown,
  Button,
  Badge,
  Card,
  Row,
  Col,
  Typography,
  Grid,
  Tag,
  Image,
} from "antd";
import type { SelectProps } from "antd/es/select";
import type { MenuProps } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toggleCollapseLayout } from "../features/ui/uiSlice";
import { useEffect } from "react";
import MenuIcon from "./MenuIcon";
const { Sider, Content } = Layout;
const sideMenus: MenuProps["items"] = [
  {
    label: "Ressources humaines",
    key: "rh",
    icon: <TeamOutlined />,
  },
  {
    label: "Finance",
    key: "finance",
    icon: <DollarCircleOutlined />,
  },
  {
    label: (
      <NavLink
        // className={({ isActive }) =>
        //   isActive ? "text-red-500" : "text-gray-100"
        // }
        to="cautions"
      >
        Cautions
      </NavLink>
    ),
    key: "Cautions",
    icon: <UnorderedListOutlined />,
  },
  {
    label: <NavLink to="projects">Projets</NavLink>,
    key: "projet",
    icon: <AppstoreOutlined />,
  },
  {
    label: <NavLink to="timesheet">Timesheet</NavLink>,
    key: "timesheet",
    icon: <HistoryOutlined />,
  },
  {
    label: "Ticketing",
    key: "ticketing",
    icon: <TbTicket />,
  },
  {
    label: "Achats",
    key: "achat",
    icon: <ShoppingCartOutlined />,
  },
];

const { Title } = Typography;
const { useBreakpoint } = Grid;

export default function Hsider() {
  const { isCollapsed, menu, selectedModule } = useSelector(
    (store: any) => store.ui
  );
  const [current, setCurrent] = useState('0')

  // console.log("isCollapsed");
  // console.log(isCollapsed);
  const dispatch = useDispatch();

  const screens = useBreakpoint();
  /* console.log(screens.lg); */
  const styleHSider: React.CSSProperties = {
    display: screens.lg ? "block" : "none",
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    bottom: 0,
  };
  const { Title, Text, Link } = Typography;
const test=()=>{
  return window["faFootball"]
}
  useEffect(()=>{
    setCurrent('0')
  },[])
  return (
    <Sider
      className="bg-white text-gray-500 shadow"
      style={styleHSider}
      trigger={null}
      collapsible
      collapsed={isCollapsed}
    >
      <div className="border-0 mx-3 pt-5 bg-white p-2 flex">
        <Image width={30} src={elasticLogo} />
        {!isCollapsed ? (
          <Text
            strong
            className="text-blue-600 ml-2 text-lg subpixel-antialiased font-semibold
            tracking-tighter uppercase"
          >
            elastic erp
          </Text>
        ) : (
          ""
        )}
      </div>
      <Menu
        /* theme="light" */
        className="bg-tranparent text-gray-600  border-1 border-transparent"
        mode={isCollapsed ? "vertical" : "inline"}
        defaultSelectedKeys={["0"]}
        defaultOpenKeys={["0"]}
      >
        {menu.filter((item)=>item.id===parseInt(localStorage.getItem("module")))[0]?.child_recursive.map((item,index) =>
          item.child_recursive.length === 0 ? (
            <Menu.Item key={index}  icon={<div><MenuIcon icon={item.icon}/></div>}><NavLink to={item.link}>{item.designation_fr}</NavLink></Menu.Item>
          ) : (
            <Menu.SubMenu key={index}  title={item.designation_fr} icon={<div><MenuIcon icon={item.icon}/></div>}>
              {item.child_recursive.map((item,index) =><Menu.Item key={index}  >{item.designation_fr}</Menu.Item>)}
            </Menu.SubMenu>
          )
        )}
      </Menu>
      <Card className="absolute bottom-0 left-0 border-0 bg-transparent  flex justify-start gap-x-8">
        {!isCollapsed ? (
          <Text
            strong
            className="text-blue-900 text-sm   subpixel-antialiased 
            tracking-tighter uppercase"
          >
            &copy; e-solutions {new Date().getFullYear()}
          </Text>
        ) : (
          <Text
            strong
            className="text-blue-600  text-sm subpixel-antialiased 
          tracking-tighter uppercase"
          >
            &copy; ew  
          </Text>
        )}

      </Card>
    </Sider>
  );
}
