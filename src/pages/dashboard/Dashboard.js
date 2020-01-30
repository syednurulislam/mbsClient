import React, { Fragment, useContext } from "react";
import { Form, Input, Button, Select, Row, Col, Card, message } from "antd";
import AccountDetails from "../account/AccountDetails";
import { GuidDefaultValue } from "../../utility_helper/HelperConstant";
import { GlobalContext } from "../../context/GlobalContextProvider";

const Dashboard = () => {
  // const pageHeader = (
  //   <PageHeader title="Dashboard" subTitle="Account Dashboard" />
  // );

  const { accountContext } = useContext(GlobalContext);
  const { accountBalance } = accountContext;

  console.log(accountBalance);

  return (
    <Fragment>
      <Row>
        <Col>
          <AccountDetails title="Dashboard" subTitle="Account Details" />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Dashboard;
