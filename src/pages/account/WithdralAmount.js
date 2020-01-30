import React, { Fragment } from "react";
import { PageHeader, Row, Col } from "antd";

const WithdralAmount = () => {
  const pageHeader = (
    <PageHeader title="WithdralAmount" subTitle="Receive Order Report" />
  );

  return (
    <Fragment>
      <Row>
        <Col>{pageHeader}</Col>
      </Row>
      <Row>
        <Col>WithdralAmount</Col>
      </Row>
    </Fragment>
  );
};

export default WithdralAmount;
