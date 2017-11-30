import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import NavBar from './NavBar'
import General from './General/General'
import './layout2.css'


const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const Layout2 = ({children}) => (
    <Layout className="layout2-container">
        <NavBar {...children.props}/>
        <Layout>
            <Sider width={200}
                   breakpoint="md"
                   collapsedWidth="0"
                   style={{ background: '#fff' ,  border: '1px solid #dddddd'}}>
                <Menu
                    mode="inline"
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >

                        <Menu.Item key="1">
                            <Link to='/transaction'>
                                <Icon type="shopping-cart" />TRANSACTIONS
                            </Link>
                        </Menu.Item>

                </Menu>
            </Sider>
            <Layout>
                <Content style={{ background: '#fff',minHeight: 280 }}>
                   <General {...children.props}/>
                    <div className="content">
                        {children}
                    </div>
                </Content>
            </Layout>
        </Layout>
    </Layout>
);
export default Layout2