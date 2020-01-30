import React from "react";
import { Modal } from "antd";

const ModalDialog = ({
  children,
  title,
  visible = false,
  width = 520,
  showHideDialog
}) => {
  return (
    <Modal
      title={title}
      visible={visible}
      width={width}
      onOk={showHideDialog}
      onCancel={showHideDialog}
      confirmLoading={true}
      centered={true}
      destroyOnClose={true}
      footer={null}
    >
      {children}
    </Modal>
  );
};
export default ModalDialog;
