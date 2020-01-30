import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  PageHeader,
  Row,
  Col,
  Tag,
  Button,
  Table,
  Form,
  Input,
  Select
} from "antd";
import ModalDialog from "../../../common_page_helper/ModalDialog";
import {
  EntryOrUpdateById,
  GuidDefaultValue,
  ButtonCaption,
  StatusTroothValueByTypeNumber,
  PageSizeOptions,
  PageSizeDefault,
  PageNumberDefault
} from "../../../utility_helper/HelperConstant";
import ItemTypeEntry from "./ItemTypeEntry";
import { GlobalContext } from "../../../context/GlobalContextProvider";

const { Item } = Form;
const { Option } = Select;

const ItemTypeWrapper = props => {
  //Page Header Defination
  const pageHeader = (
    <PageHeader
      title="Item Type - "
      subTitle="Item Type List, Entry, Update & Delete"
      style={{ marginBottom: 10 }}
      extra={[
        <Button
          key={110}
          htmlType="button"
          icon="plus"
          onClick={() => showHideDialog(null)}
        >
          {ButtonCaption.AddNew}
        </Button>
      ]}
    />
  );

  const { getFieldDecorator, setFieldsValue } = props.form;
  //itemTypeContext get to call Item Type Action
  const { itemTypeContext } = useContext(GlobalContext);

  //Search Object to display search criteria
  const searchObject = {
    itemTypeName: "",
    description: "",
    recordStatus: null,
    Desc: false
  };

  //Grid Column Defination
  const itemTypeColumns = [
    {
      title: "Item Type",
      dataIndex: "itemTypeName",
      width: 300,
      key: "itemTypeName",
      sorter: (a, b) => a.itemTypeName.localeCompare(b.itemTypeName),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Description",
      dataIndex: "description",
      width: 400,
      key: "description",
      sorter: (a, b) => a.description.localeCompare(b.description),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Status",
      dataIndex: "recordStatus",
      sorter: (a, b) => a.recordStatus !== b.recordStatus,
      sortDirections: ["descend", "ascend"],
      width: 100,
      key: "recordStatus",
      filters: [
        { text: "Active", value: true },
        { text: "In-Active", value: false }
      ],
      onFilter: (value, record) => {
        // console.log("==============");
        console.log("filter value: ", value);
        console.log("filter record: ", record);
        return record.recordStatus === value;
      },
      render: (text, row, index) => {
        return (
          <Tag color={text ? "green" : "volcano"}>
            {text ? "Active" : "In Active"}
          </Tag>
        );
      }
    }
  ];

  //Load the Grid Data when page render first time
  useEffect(() => {
    itemTypeContext.getItemType(
      PageNumberDefault,
      PageSizeDefault,
      searchObject
    );
  }, []);

  //Modal Show Hide State
  const [visible, setVisible] = useState(false);

  //Item Type Id set as default GUID
  const [id, setId] = useState(GuidDefaultValue);

  // Item Type State Set initila null
  const [itemTypeObj, setItemTypeObj] = useState(null);

  const [currentPage, setcurrentPage] = useState(1);
  const [pageSize, setpageSize] = useState(PageSizeDefault);

  /*
    Show-Hide dialog and set Id & itemType object
    1. when showHideDialog paramater is null and call for Add New Button then entry dialog open
    2. when showHideDialog paramater has value and call from Grid then entry dialog open
  */
  const showHideDialog = itemType => {
    if (!visible) {
      setId(itemType !== null ? itemType.id : GuidDefaultValue);
      setItemTypeObj(itemType);
    }
    setVisible(!visible);
  };

  //Item Search By Filter Option
  const itemTypeSearchSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values
        };

        data.recordStatus = StatusTroothValueByTypeNumber(data.recordStatus);
        itemTypeContext.getItemType(PageNumberDefault, PageSizeDefault, data);
      }
    });
  };

  const itemTypeSearchClear = () => {
    setFieldsValue({
      itemTypeName: "",
      recordStatus: "-1"
    });
  };

  //Pagination Options
  const paginations = {
    position: "both",
    showSizeChanger: true,
    showQuickJumper: true,
    total: itemTypeContext.itemTypes.paging.totalItems,
    current: itemTypeContext.itemTypes.paging.pageNumber,
    pageSize: itemTypeContext.itemTypes.paging.pageSize,
    defaultCurrent: 1,
    pageSizeOptions: PageSizeOptions,
    showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`
  };

  const onTableChange = (pagination, filter, sorter) => {
    console.log("onTableChange", pagination, filter, sorter);
    //setcurrentPage
    if (
      currentPage !== pagination.current ||
      pageSize !== pagination.pageSize
    ) {
      setcurrentPage(pagination.current);
      setpageSize(pagination.pageSize);

      itemTypeContext.getItemType(
        pagination.current,
        pagination.pageSize,
        searchObject
      );
    }

    /** You can do any custom thing you want here. Below i update sort type in my state and pass it to my redux function */
    // if (sorter.order != null) {
    //   //params.ordering = (
    //   console.log(
    //     "onTableChange",
    //     (sorter.order === "descend" ? "-" : "") + sorter.columnKey.toString()
    //   );
    // }

    //this.setState({params});
    //this.props.listUsers(this.state.params);
  };
  return (
    <Fragment>
      <Row>
        <Col>{pageHeader}</Col>
      </Row>
      <Form
        layout="vertical"
        onSubmit={itemTypeSearchSubmit}
        className="ant-advanced-search-form"
      >
        <Row gutter={10}>
          <Col span={8}>
            <Item label="Item Type">
              {getFieldDecorator("itemTypeName")(
                <Input placeholder="Item Type Name" />
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item label="Status">
              {getFieldDecorator("recordStatus", {
                initialValue: "-1"
              })(
                <Select placeholder="Select a option">
                  <Option value="-1">All Status</Option>
                  <Option value="1">Active</Option>
                  <Option value="0">In-Active</Option>
                </Select>
              )}
            </Item>
          </Col>
          <Col span={8} style={{ paddingTop: 30 }}>
            <Button htmlType="submit" icon="search">
              {" "}
              {ButtonCaption.Search}
            </Button>
            &nbsp;&nbsp;
            <Button
              htmlType="button"
              icon="close-circle"
              onClick={itemTypeSearchClear}
            >
              {ButtonCaption.Clear}
            </Button>
          </Col>
        </Row>
      </Form>
      <Row className="search-result-list">
        <Col>
          <Table
            columns={itemTypeColumns}
            dataSource={itemTypeContext.itemTypes.lists}
            rowKey="id"
            bordered={true}
            size="middle"
            loading={itemTypeContext.loading}
            scroll={{ y: 500 }}
            pagination={paginations}
            onRow={(record, rowIndex) => {
              return {
                onClick: event => {
                  showHideDialog(record);
                } // click row
              };
            }}
            onChange={onTableChange}
          />
        </Col>
        <Col>
          <ModalDialog
            title={EntryOrUpdateById(id, "Item Type")}
            visible={visible}
            showHideDialog={showHideDialog}
          >
            <ItemTypeEntry
              id={id}
              itemTypeObj={itemTypeObj}
              showHideDialog={showHideDialog}
            />
          </ModalDialog>
        </Col>
      </Row>
    </Fragment>
  );
};

//create form instance
const ItemType = Form.create({ name: "item_search_form" })(ItemTypeWrapper);
export default ItemType;
