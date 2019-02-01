import { connect } from "react-redux";
import React, { Component } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
  Tabs,
  Layout,
} from "antd";


import './App.css';
// import logo from './logo.svg';
import {
  logIn,
  loadUser,
} from './thunks/user';
import UserCard from './components/UserCard';
import IssueCard from './components/IssueCard';
import IssueList from './components/IssueList';
import LoginForm from './components/LoginForm';


const TabPane = Tabs.TabPane;
const { Content, Header } = Layout;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      pass: '',
    };
  }

  logIn() {
    const { name, pass } = this.state;
    this.props.logIn(name, pass);
  }

  setUserField(field, val) {
    this.setState({
      [field]: val,
    });
  }

  setVisibility(key) {
    console.log(key)
    this.setState((prev) => {
      const newState = Object.assign(prev, {});
      Object.keys(newState.visibility).map(k => newState.visibility[k] = false);
      newState.visibility[key] = true;
      return newState;
    });
  }

  componentDidMount() {
    this.props.loadUser();
    this.props.user && this.setVisibility('user');
  }

  render() {
    const { user, issues } = this.props;

    return (
      <Layout>
        <Header>
          <Tabs style={{ color: '#ccc'}} defaultActiveKey="login" onChange={(key) => this.setVisibility(key)}>
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
    );
  }
}

const mapStateToProps = state => ({ user: state.user.prism });
const mapDispatchToProps = dispatch => ({ 
  loadUser: () => dispatch(loadUser()),
  logIn: (name, pass) => dispatch(logIn(name, pass)),
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
