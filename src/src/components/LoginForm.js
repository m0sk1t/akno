import React from "react";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";
import Input from "antd/lib/input";
import Button from "antd/lib/button";


const LoginForm = (props) => {
  const {
    user,
    logIn,
    setUserField,
  } = props;
  const uSuffix = user.name
    ? <Icon type='close-circle' onClick={() => setUserField('name', '')} />
    : '';
  const pSuffix = user.pass
    ? <Icon type='close-circle' onClick={() => setUserField('pass', '')} />
    : '';
  return (
    <Card
      title='Enter credentials'
    >
      <p>
        <Input
          prefix={<Icon type='user' />}
          suffix={uSuffix}
          value={user.name}
          placeholder='PRISM username'
          onChange={(e) => setUserField('name', e.target.value)}
        />
      </p>
      <p>
        <Input
          prefix={<Icon type='lock' />}
          type='password'
          suffix={pSuffix}
          value={user.pass}
          placeholder='PRISM password'
          onChange={(e) => setUserField('pass', e.target.value)}
        />
      </p>
      <Button
        onClick={() => logIn(user.name, user.pass)}
      >
        LogIn <Icon type='login' />
      </Button>
    </Card>
  );
};


export default LoginForm;
