import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  PageHeader,
  Row,
  Col,
  Button,
  Table,
  Form,
  Select,
  DatePicker
} from "antd";
import {
  GuidDefaultValue,
  ButtonCaption,
  StatusTroothValueByTypeNumber,
  PageSizeOptions,
  PageSizeDefault,
  PageNumberDefault
} from "../../utility_helper/HelperConstant";
import { GlobalContext } from "../../context/GlobalContextProvider";

const { Item } = Form;
const { Option } = Select;

const AccountStatementWrapper = props => {
  //Page Header Defination
  const pageHeader = (
    <PageHeader
      title="Account Statement"
      subTitle="Details Transaction Report"
    />
  );

  const { getFieldDecorator, setFieldsValue } = props.form;
  //accountContext get to call Item Type Action
  const { accountContext, authContext } = useContext(GlobalContext);




  //Search Object to display search criteria
  const searchObject = {
    fromDate: "",
    toDate: "",
    transactionType: "0",
    Desc: false,
    CustomerId : authContext.user.customer_Id
  };



  //Grid Column Defination
  const transactionGridColumn = [
    {
      title: "Transaction Date",
      dataIndex: "TransactionDate",
      width: 200,
      key: "transactionDate",
      sorter: (a, b) => a.transactionDate.localeCompare(b.transactionDate),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Transaction Type",
      dataIndex: "TransferText",
      width: 200,
      key: "transferText",
      sorter: (a, b) => a.transferText.localeCompare(b.transferText),
      sortDirections: ["descend", "ascend"]
    },
    {
      title: "Debit Amount",
      dataIndex: "DrAmount",
      width: 200,
      key: "drAmount"
    },
    {
      title: "Credit Amount",
      dataIndex: "CrAmount",
      width: 200,
      key: "crAmount"
    },
    {
      title: "Balance",
      dataIndex: "amount",
      width: 200,
      key: "amount"
    }
  ];


  //Load the Grid Data when page render first time
  useEffect(() => {
    accountContext.getTransactionPagination(
      PageNumberDefault,
      PageSizeDefault,
      searchObject
    );
  }, []);



  const [fromDate, setfromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

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

  //Item Search By Filter Option
  const itemTypeSearchSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let data = {
          ...values,
          fromDate: fromDate,
          toDate: toDate
        };

        data.recordStatus = StatusTroothValueByTypeNumber(data.recordStatus);
        accountContext.getTransactionPagination(
          PageNumberDefault,
          PageSizeDefault,
          data
        );
      }
    });
  };

  const itemTypeSearchClear = () => {
    setFieldsValue({
      fromDate: null,
      toDate: null,
      transactionType: "0"
    });

    setfromDate(null);
    setToDate(null);
  };

  //Pagination Options
  // const paginations = {
  //   position: "bottom",
  //   showSizeChanger: true,
  //   showQuickJumper: true,
  //   total: accountContext.transactions.paging.totalItems,
  //   current: accountContext.transactions.paging.pageNumber,
  //   pageSize: accountContext.transactions.paging.pageSize,
  //   defaultCurrent: 1,
  //   pageSizeOptions: PageSizeOptions,
  //   showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`
  // };

  // const onTableChange = (pagination, filter, sorter) => {
  //   console.log("onTableChange", pagination, filter, sorter);
  //   //setcurrentPage
  //   if (
  //     currentPage !== pagination.current ||
  //     pageSize !== pagination.pageSize
  //   ) {
  //     setcurrentPage(pagination.current);
  //     setpageSize(pagination.pageSize);

  //     accountContext.getTransactionPagination(
  //       pagination.current,
  //       pagination.pageSize,
  //       searchObject
  //     );
  //   }
  // };

  const handleFromDateChange = (date, dateString) => {
    setfromDate(dateString);
  };
  const handleToDateChange = (date, dateString) => {
    setToDate(dateString);
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
            <Item label="Date From">
              {getFieldDecorator(
                "fromDate",
                {}
              )(
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="YYYY-MM-DD"
                  onChange={handleFromDateChange}
                />
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item label="Date To">
              {getFieldDecorator(
                "toDate",
                {}
              )(
                <DatePicker
                  format="YYYY-MM-DD"
                  placeholder="YYYY-MM-DD"
                  onChange={handleToDateChange}
                />
              )}
            </Item>
          </Col>
          <Col span={8}>
            <Item label="Transaction Type">
              {getFieldDecorator("transactionType", {
                initialValue: "0"
              })(
                <Select placeholder="Select a option">
                  <Option value="0">All Type Transaction</Option>
                  <Option value="1">Deposit</Option>
                  <Option value="2">Witwdrawal</Option>
                  <Option value="3">Balance Transfer</Option>
                </Select>
              )}
            </Item>
          </Col>
        </Row>

        <Row>
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
            columns={transactionGridColumn}
            dataSource={accountContext.transactions.lists}
            rowKey="id"
            bordered={true}
            size="middle"
            loading={accountContext.loading}
            scroll={{ y: 500 }}
            footer={() => (
              <div
                style={{
                  textAlign: "right",
                  width: "970px",
                  fontWeight: "bold"
                }}
              >
                Balance: {accountContext.transactions.totalSum}
              </div>
            )}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

//create form instance
const AccountStatement = Form.create({ name: "account_search_form" })(
  AccountStatementWrapper
);
export default AccountStatement;
