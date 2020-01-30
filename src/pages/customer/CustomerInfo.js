import React, { Fragment, useContext, useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Card,
  DatePicker,
  message
} from "antd";
import { GlobalContext } from "../../context/GlobalContextProvider";
import { GuidDefaultValue } from "../../utility_helper/HelperConstant";
import { LOGIN_PATH } from "../../routes/NavigationPath";

const { Item } = Form;
const { Option } = Select;

function RedirectToLoginPage() {
  window.location.replace(LOGIN_PATH);
}

const WrapperedCustomerInfo = props => {
  const { customerContext } = useContext(GlobalContext);
  const { getFieldDecorator, setFieldsValue } = props.form;
  const [dob, setDob] = useState("");
  //Submit the Form to save/update based on id

  const handleDatePickerChange = (date, dateString) => {
    setDob(dateString);
  };

  const itemTypeSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        //console.log(values);
        if (values.password !== values.confirmPassword) {
          message.warning("Password & Confirm Password is not same.");
          return false;
        }

        let data = {};

        data = {
          ...values,
          dateOfBirth: dob
        };

        data.dateOfBirth = dob;
        customerContext.addCustomer(data);

        // if (data.id === GuidDefaultValue) {

        // }
        // else {
        //   itemTypeContext.updateItemType(data);
        //   props.showHideDialog(null);
        // }
      }
    });
  };

  // useEffect(() => {
  //   customerContext.customerFlagReset();
  //   setFieldsValue({
  //     firstName: "",
  //     lastName: "",
  //     customerType: "",
  //     dateOfBirth: "",
  //     country: "",
  //     city: "",
  //     zipCode: "",
  //     phone: "",
  //     email: "",
  //     personalCode: "",
  //     password: "",
  //     confirmPassword: ""
  //   });

  //   console.log(customerContext.success);

  //   window.setTimeout(RedirectToLoginPage, 2000);
  // }, customerContext.success === true);

  return (
    <Fragment>
      <Row>
        <br /> <br />
        <Col span={4}></Col>
        <Col span={16}>
          <Form onSubmit={itemTypeSubmit} layout="vertical">
            <Card title="Customer Registration">
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="First Name">
                    {getFieldDecorator("firstName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your First Name."
                        }
                      ]
                    })(<Input placeholder="First Name" />)}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Last Name">
                    {getFieldDecorator("lastName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Last Name."
                        }
                      ]
                    })(<Input placeholder="Last Name" />)}
                  </Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Customer Type">
                    {getFieldDecorator("customerType", {
                      initialValue: "1",
                      rules: [
                        {
                          required: true,
                          message: "Please select customer type"
                        }
                      ]
                    })(
                      <Select placeholder="Select a Type">
                        <Option value="1">Individual</Option>
                        <Option value="2">Group</Option>
                      </Select>
                    )}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Date Of Birth">
                    {getFieldDecorator("dateOfBirth", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your date Of birth."
                        }
                      ]
                    })(
                      <DatePicker
                        format="YYYY-MM-DD"
                        placeholder="YYYY-MM-DD"
                        onChange={handleDatePickerChange}
                      />
                    )}
                  </Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Country">
                    {getFieldDecorator("country", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your country"
                        }
                      ]
                    })(<Input placeholder="Country" />)}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="City">
                    {getFieldDecorator("city", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your City"
                        }
                      ]
                    })(<Input placeholder="City" />)}
                  </Item>
                </Col>
              </Row>

              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Zip Code">
                    {getFieldDecorator("zipCode", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your zip code"
                        }
                      ]
                    })(<Input placeholder="Zip Code" />)}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Phone">
                    {getFieldDecorator("phone", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your phone"
                        }
                      ]
                    })(<Input placeholder="Phone" />)}
                  </Item>
                </Col>
              </Row>
            </Card>
            <br />

            <Card title="Account Info">
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Account Type">
                    {getFieldDecorator("accountType", {
                      initialValue: "1",
                      rules: [
                        {
                          required: true,
                          message: "Please select account type"
                        }
                      ]
                    })(
                      <Select placeholder="Select Account Type">
                        <Option value="1">Saving</Option>
                        <Option value="2">Current</Option>
                      </Select>
                    )}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Currency Type">
                    {getFieldDecorator("currencyType", {
                      initialValue: "1",
                      rules: [
                        {
                          required: true,
                          message: "Please select currency type"
                        }
                      ]
                    })(
                      <Select placeholder="Select Currency Type">
                        <Option value="1">Euro</Option>
                      </Select>
                    )}
                  </Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Opening Money">
                    {getFieldDecorator("amount", {
                      rules: [
                        {
                          required: true,
                          message: "Please input opening money"
                        }
                      ]
                    })(<Input type="amount" placeholder="Opening Money" />)}
                  </Item>
                </Col>
                <Col span={12}></Col>
              </Row>
            </Card>

            <br />
            <Card title="Login Credential">
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Email">
                    {getFieldDecorator("email", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your email"
                        }
                      ]
                    })(<Input type="email" placeholder="Email" />)}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Personal Code">
                    {getFieldDecorator("personalCode", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your personal code"
                        }
                      ]
                    })(<Input placeholder="Personal Code" />)}
                  </Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col span={12}>
                  <Item label="Password">
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password"
                        }
                      ]
                    })(<Input type="password" placeholder="Password" />)}
                  </Item>
                </Col>
                <Col span={12}>
                  <Item label="Confirm Password">
                    {getFieldDecorator("confirmPassword", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your password again"
                        }
                      ]
                    })(
                      <Input type="password" placeholder="Confirm Password" />
                    )}
                  </Item>
                </Col>
              </Row>
            </Card>
            <Row
              type="flex"
              justify="end"
              gutter={5}
              style={{ marginTop: "10px" }}
            >
              <Col>
                <Button htmlType="submit">Registration</Button>
              </Col>
            </Row>
            <br />
          </Form>
        </Col>
        <Col span={4}></Col>
      </Row>
    </Fragment>
  );
};

//create form instance
const CustomerInfo = Form.create({ name: "customer_info_form" })(
  WrapperedCustomerInfo
);

export default CustomerInfo;
