import React from 'react';
import { Layout, Button, Pagination } from 'antd';
import PostList from './components/PostCard/PostList';
import './App.css';

const { Header, Content } = Layout;

const App: React.FC = () => (
  <Layout className="layout">
    <Header className="header">
      <h1>Post Management</h1>
      <Button type="primary">Add New Post</Button>
    </Header>
    <Content className="content">
      <PostList />
    </Content>
    
  </Layout>
);

export default App;
