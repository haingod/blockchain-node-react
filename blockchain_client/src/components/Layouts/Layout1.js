import React,{Component} from 'react'
import {Layout} from 'antd'
import './layout1.css'

const { Content,Sider} = Layout;
const Layout1 = ({children}) => (
    <Layout className="layout1-container">
        <Content style={{ padding: '24px', margin: 0, minHeight: 280 }}>
            {children}
        </Content>
    </Layout>
);
export default Layout1