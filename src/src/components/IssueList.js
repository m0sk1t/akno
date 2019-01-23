import React from "react";
import IssueCard from "./IssueCard";


const IssueList = (props) => {
  const {
    issues,
  } = props;

  return (
    <div>{issues.map(issue => <IssueCard issue={issue} />)}</div>
  );
};


export default IssueList;
