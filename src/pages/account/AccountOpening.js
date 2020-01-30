import React, { Fragment } from "react";
import { PageHeader, Row, Col } from "antd";

const AccountOpening = () => {
  const pageHeader = (
    <PageHeader
      title="AccounBalanceTransfertOpening"
      subTitle="Receive Order Report"
    />
  );

  return (
    <Fragment>
      <Row>
        <Col>{pageHeader}</Col>
      </Row>
      <Row>
        <Col>BalanceTransfer</Col>
      </Row>
    </Fragment>
  );
};

export default AccountOpening;
