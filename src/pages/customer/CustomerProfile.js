import React, { Fragment, useContext, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col, Card, message } from "antd";
import AccountDetails from "../account/AccountDetails";
import { GuidDefaultValue } from "../../utility_helper/HelperConstant";
import { GlobalContext } from "../../context/GlobalContextProvider";

const CustomerProfile = () => {
  const { customerContext } = useContext(GlobalContext);
  useEffect(() => {
    customerContext.getCustomer();
  }, []);

  const { specificCustomer } = customerContext;

  return (
    <Fragment>
      <Row>
        <Col>
          <AccountDetails title="User Profile" subTitle="Account Profile" />
        </Col>
      </Row>
      <Row></Row>
    </Fragment>
  );
};

export default CustomerProfile;
