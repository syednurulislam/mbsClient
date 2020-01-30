import React, { Fragment } from "react";
import { PageHeader, Row, Col } from "antd";

const Users = () => {
  const pageHeader = <PageHeader title="Users" subTitle="Users List & Entry" />;

  return (
    <Fragment>
      <Row>
        <Col>{pageHeader}</Col>
      </Row>
      <Row>
        <Col>Users Content</Col>
      </Row>
    </Fragment>
  );
};

export default Users;
