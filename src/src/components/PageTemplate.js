import React from "react";
import {
  Tabs,
  Layout,
} from "antd";
import { Menu, Icon } from 'antd';


const PageTemplate = () => (
  <Menu>
    <Menu.Item>
      <Icon type="lock" /> LogIn
    </Menu.Item>
    <Menu.Item>
      <Icon type="list" /> Issues
    </Menu.Item>
  </Menu>
  <Layout>
    <Header>
      <Tabs style={{ color: '#ccc' }} defaultActiveKey="login" onChange={(key) => this.setVisibility(key)}>
        {!user && <TabPane tab="LogIn" key="login"></TabPane>}
        {user && user.name && <TabPane tab="User" key="user"></TabPane>}
        {user && user.name && <TabPane tab="Issue" key="issue"></TabPane>}
        <TabPane tab="Issues" key="issues"></TabPane>
      </Tabs>
    </Header>
    <Content>
      {this.state.visibility.login && <LoginForm
        logIn={() => this.logIn()}
        user={this.state}
        setUserField={(field, val) => this.setUserField(field, val)}
      />}
      {
        this.state.visibility.user && <UserCard user={user} />
      }
      {
        this.state.visibility.issue && <IssueCard user={user} />
      }
      {
        this.state.visibility.issues && <IssueList issues={issues} />
      }
    </Content>
  </Layout>

)
