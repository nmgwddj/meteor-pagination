import React from 'react'
import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Home from '../components/Home'
import Links from '../components/Links'

const { Header, Content, Footer } = Layout

const MainLayout = () => {
  return (
    <Layout className='layout'>
      <Header>
        <div className='logo' />
        <Menu
          theme='dark'
          mode='horizontal'
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key='home'><Link to='/'>Home</Link></Menu.Item>
          <Menu.Item key='links'><Link to='/links'>Links</Link></Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px 50px 0' }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <Route exact path='/' render={({ match }) => <Home />} />
          <Route path='/links' render={({ match }) => <Links />} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2016 Created by Ant UED
      </Footer>
    </Layout>
  )
}

export default MainLayout
