import React from "react";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";


const UserCard = (props) => {
  const {
    user,
    logOut,
    createIssue,
  } = props;

  return (
    <Card
      title={`${user.name.first} ${user.name.last}`}
      actions={[
        <Icon type='plus-circle' title='New Issue' onClick={() => createIssue()} />,
        <Icon type='logout' title='LogOut' onClick={() => logOut()} />,
      ]}
    >
      <p>email: {user.email}</p>
      <p>skype: {user.skype}</p>
      <p>phone: {user.phone}</p>
    </Card>
  );
};


export default UserCard;
