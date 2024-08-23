import React from 'react';
import { Layout } from 'antd';
import PostList from './components/PostCard/PostList';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Layout className="layout">
    <Header className="header">
      <h1>Post Management</h1>
    </Header>
    <Content className="content">
      <PostList />
    </Content>
    
  </Layout>
);

export default App;
