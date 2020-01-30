import React, { useContext, useEffect } from "react";
import { Form, Input, Button, Row, Col, Modal } from "antd";
import { GlobalContext } from "../../../context/GlobalContextProvider";
import {
  ButtonCaption,
  GuidDefaultValue
} from "../../../utility_helper/HelperConstant";

const { Item } = Form;
const { confirm } = Modal;

const WrapperedItemTypeEntry = props => {
  const { itemTypeContext } = useContext(GlobalContext);
  //console.log("WrapperedItemTypeEntry", props.itemTypeObj);
  const { getFieldDecorator, setFieldsValue } = props.form;

  //Set the Value of the form first time page render
  //and when props.itemTypeObj & props.id change
  useEffect(() => {
    if (props.itemTypeObj !== null) {
      setFieldsValue({
        itemTypeName: props.itemTypeObj.itemTypeName,
        description: props.itemTypeObj.description
      });
    } else {
      setFieldsValue({
        itemTypeName: "",
        description: ""
      });
    }
  }, [props.id, props.itemTypeObj]);

  //Submit the Form to save/update based on id
  const itemTypeSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let data = {};

        if (props.itemTypeObj !== null) {
          data = {
            ...props.itemTypeObj
          };
        }

        data = {
          id: props.id,
          ...values
        };

        if (props.id === GuidDefaultValue) {
          itemTypeContext.addItemType(data);
          setFieldsValue({
            itemTypeName: "",
            description: ""
          });
        } else {
          itemTypeContext.updateItemType(data);
          props.showHideDialog(null);
        }
      }
    });
  };

  //Submit the Form to delete based on id
  const itemTypeDeleteSubmit = e => {
    e.preventDefault();
    confirm({
      title: "Do you Want to delete this record?",
      onOk() {
        props.form.validateFields((err, values) => {
          if (!err) {
            itemTypeContext.deleteItemType(props.id);
            props.showHideDialog(null);
          }
        });
      },
      onCancel() {}
    });
  };

  return (
    <Form onSubmit={itemTypeSubmit} layout="vertical">
      <Item label="Item Type">
        {getFieldDecorator("itemTypeName", {
          rules: [{ required: true, message: "Please input your Item Type." }]
        })(<Input placeholder="Item Type Name" />)}
      </Item>
      <Item label="Description">
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message: "Please input your Item Type Description"
            }
          ]
        })(<Input placeholder="Description" />)}
      </Item>
      <Row type="flex" justify="end" gutter={5}>
        <Col>
          <Button htmlType="submit">
            {props.id === GuidDefaultValue
              ? ButtonCaption.Save
              : ButtonCaption.Update}
          </Button>
        </Col>
        <Col>
          <Button
            htmlType="button"
            icon="close-circle"
            onClick={itemTypeDeleteSubmit}
          >
            {ButtonCaption.Delete}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

//create form instance
const ItemTypeEntry = Form.create({ name: "item_type_form" })(
  WrapperedItemTypeEntry
);

export default ItemTypeEntry;
