import React, { Fragment, useContext } from "react";
import { Form, Input, Button, Select, Row, Col, Card, message } from "antd";
import AccountDetails from "./AccountDetails";
import { GuidDefaultValue } from "../../utility_helper/HelperConstant";
import { GlobalContext } from "../../context/GlobalContextProvider";

const { Item } = Form;
const { Option } = Select;

const WrapperedAccountDeposit = props => {
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { accountContext, authContext  } = useContext(GlobalContext);
  const { accountBalance } = accountContext;
  const { user } = authContext;


  const itemTypeSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (
          values.transactionType === "2" &&
          parseFloat(values.amount) > accountBalance.balanceAmount
        ) {
          message.warning("Withdrawal amount cannot exceed the balance amount");
          return false;
        }
        let data = {};
        data = {
          ...values,
          id: GuidDefaultValue,
          customerId : user.customer_Id
        };
        if (values.transactionType === "1") {
          accountContext.postForDeposit(data);
        } else if (values.transactionType === "2") {
          accountContext.postForWithdrawal(data);
        }
      }
    });
  };

  if (accountContext.depositSuccess || accountContext.withdrawalSuccess) {
    accountContext.depositWithdrawalClear();
    setFieldsValue({
      amount: ""
    });
  }

  return (
    <Fragment>
      <Row>
        <Col>
          <AccountDetails
            title="Account Transaction"
            subTitle="Deposit, Withdrawal Balance "
            customerId = { user.customer_Id }
          />
        </Col>
      </Row>

      <Form onSubmit={itemTypeSubmit} layout="vertical">
        <Card>
          <Row gutter={10}>
            <Col span={12}>
              <Item label="Transaction Type">
                {getFieldDecorator("transactionType", {
                  initialValue: "1",
                  rules: [
                    {
                      required: true,
                      message: "Please select transaction type"
                    }
                  ]
                })(
                  <Select placeholder="Select transaction type">
                    <Option value="1">Deposit</Option>
                    <Option value="2">Withdrawal</Option>
                  </Select>
                )}
              </Item>
            </Col>
            <Col span={12}>
              <Item label="Amount">
                {getFieldDecorator("amount", {
                  rules: [
                    {
                      required: true,
                      message: "Please input amount."
                    }
                  ]
                })(<Input placeholder="Amount" />)}
              </Item>
            </Col>
          </Row>

          <Row
            type="flex"
            justify="end"
            gutter={5}
            style={{ marginTop: "10px" }}
          >
            <Col>
              <Button htmlType="submit">Submit Transaction</Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </Fragment>
  );
};

const AccountDeposit = Form.create({ name: "account_deposit_form" })(
  WrapperedAccountDeposit
);
export default AccountDeposit;
