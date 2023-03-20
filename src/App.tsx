import { Routes, Route, Link } from "react-router-dom";
import { Layout, Menu, theme } from "antd";
import { FileTextOutlined, GithubOutlined } from "@ant-design/icons";

import { Home } from "./components/home";
import { Salaires } from "./components/salaires";
import { Participations } from "./components/participations";

import "./App.scss";

const { Header, Content, Footer } = Layout;

function App() {
    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();

    const menus = [
        { key: "salaires", label: <Link to="/salaires">Salaires</Link> },
        { key: "participations", label: <Link to="/participations">Participations</Link> },
    ];
    return (
        <Layout className="layout">
            <Header>
                <Link to="/">
                    <div className="logo"></div>
                </Link>
                {/* <span>EXOD-Hatvp declarations</span> */}

                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]} items={menus} />
            </Header>
            <Content className="site-content">
                {/* <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}

                <div className="warning-container">
                    <span>Ce projet n'est lié à aucune organisme officiel</span>
                </div>

                <div className="site-layout-content" style={{ background: colorBgContainer, color: colorText }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/salaires" element={<Salaires />} />
                        <Route path="/participations" element={<Participations />} />
                    </Routes>
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                <a href="https://www.hatvp.fr/consulter-les-declarations/" target={"_blank"} rel={"noreferrer"}>
                    <FileTextOutlined /> Hatvp OpenData
                </a>
                {" - "}
                <a
                    href="https://github.com/exploreopendatafr/hatvp_declarations_front"
                    target={"_blank"}
                    rel={"noreferrer"}
                >
                    <GithubOutlined /> Github
                </a>
                {" - "}
                {"Déployé à {{BUILD_DATE}}"}
            </Footer>
        </Layout>
    );
}

export default App;
