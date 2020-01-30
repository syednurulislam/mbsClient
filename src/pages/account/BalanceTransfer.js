import React, { Fragment, useContext, useEffect } from "react";
import { Form, Input, Button, Select, Row, Col, Card, message } from "antd";
import AccountDetails from "./AccountDetails";
import { GuidDefaultValue } from "../../utility_helper/HelperConstant";
import { GlobalContext } from "../../context/GlobalContextProvider";

const { Item } = Form;
const { Option } = Select;

const WrapperedBalanceTransfer = props => {
  const { getFieldDecorator, setFieldsValue } = props.form;
  const { accountContext, customerContext, authContext } = useContext(GlobalContext);

  useEffect(() => {
    customerContext.customerSli();
  }, []);

  const { accountBalance } = accountContext;
  const { user } = authContext;

  console.log(customerContext.customerSliList);

  const itemTypeSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        if (parseFloat(values.amount) > accountBalance.balanceAmount) {
          message.warning("Transfer mount cannot exceed the balance amount");
          return false;
        }

        let data = {};
        data = {
          ...values,
          id: GuidDefaultValue,
          customerId : user.customer_Id
        };
        accountContext.postForTransfer(data);
      }
    });
  };

  if (accountContext.transferSuccess) {
    accountContext.depositWithdrawalClear();
    setFieldsValue({
      toCustomerId: "",
      amount: ""
    });
  }

  const children = [];
  if (customerContext.customerSliList.length > 0) {
    for (let i = 0; i < customerContext.customerSliList.length; i++) {
      children.push(
        <Option
          key={i.toString(36) + i}
          value={customerContext.customerSliList[i].AccountNumber}
        >
          {customerContext.customerSliList[i].FirstName} {customerContext.customerSliList[i].LastName} - {customerContext.customerSliList[i].AccountNumber}
        </Option>
      );
    }
  }
  return (
    <Fragment>
      <Row>
        <Col>
          <AccountDetails
            title="Balance Transfer"
            subTitle="Transfer balance from your account to other account"
          />
        </Col>
      </Row>

      <Form onSubmit={itemTypeSubmit} layout="vertical">
        <Card>
          <Row gutter={10}>
            <Col span={12}>
              <Item label="Account to transfer">
                {getFieldDecorator("toCustomerId", {
                  initialValue: "",
                  rules: [
                    {
                      required: true,
                      message: "Please select customer"
                    }
                  ]
                })(<Select placeholder="Select Customer">{children}</Select>)}
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

const BalanceTransfer = Form.create({ name: "account_deposit_form" })(
  WrapperedBalanceTransfer
);
export default BalanceTransfer;
