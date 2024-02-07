import { Modal } from "antd";

const NotificationModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <Modal
      title="Title"
      open={open}
      onOk={handleOk}
      okText="Mark As Read"
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      {modalContent}
    </Modal>
  );
};

export default NotificationModal;
