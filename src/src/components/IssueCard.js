import React from "react";
import Card from "antd/lib/card";
import Icon from "antd/lib/icon";


const IssueCard = (props) => {
  const { userId, issue } = props;

  return (
    <Card
      title={`${Date(issue.createdAt)}`}
      actions={[
        <Icon type='check' title='Resolve' />,
        userId === issue.createdBy && <Icon type='edit' title='Edit' />,
        userId === issue.createdBy && <Icon type='trash' title='Delete' />,
      ]}
    >
      <p>description: {issue.description}</p>
    </Card>
  );
};


export default IssueCard;
