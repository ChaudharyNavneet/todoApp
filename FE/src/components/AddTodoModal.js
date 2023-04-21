import React, { useState } from "react";
import { Modal, Input, Checkbox, Col } from "antd";

const AddTodoModal = ({
  showEditForm,
  handleSubmit,
  setShowEditForm,
  defaultValus,
}) => {
  console.log(defaultValus);
  const [formData, setFormData] = useState(
    defaultValus
      ? defaultValus
      : {
          title: "",
          description: "",
          dueDate: "",
          completed: false,
        }
  );

  const handleOk = () => {
    console.log(formData);
    handleSubmit(formData);
    setShowEditForm(false);
  };

  const handleChange = (field, value) => {
    console.log(" iam djslc", value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  return (
    <Modal
      className="todo-edit-form"
      title="Edit ToDo Modal"
      visible={showEditForm}
      onOk={handleOk}
      onCancel={() => setShowEditForm(false)}
      style={{ backgroundColor: "#f5f5f5" }}>
      <Col style={{ display: "list-item" }}>
        <Input
          placeholder="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          style={{
            backgroundColor: "#eee",
            marginBottom: "16px",
            color: "#444",
          }}
        />
        <Input.TextArea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          style={{
            backgroundColor: "#eee",
            marginBottom: "16px",
            color: "#444",
          }}
        />
        <Input
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          style={{
            backgroundColor: "#eee",
            marginBottom: "16px",
            color: "#444",
          }}
        />
        <Checkbox
          checked={formData.completed}
          onChange={(e) => handleChange("completed", e.target.checked)}
          style={{
            color: "#444",
          }}>
          Completed
        </Checkbox>
      </Col>
    </Modal>
  );
};

export default AddTodoModal;
