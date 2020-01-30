import React, { Fragment } from "react";
import { PageHeader, Row, Col } from "antd";

const Role = () => {
  const pageHeader = <PageHeader title="Role" subTitle="Role List & Entry" />;

  return (
    <Fragment>
      <Row>
        <Col>{pageHeader}</Col>
      </Row>
      <Row>
        <Col>Role Content</Col>
      </Row>
    </Fragment>
  );
};

export default Role;
