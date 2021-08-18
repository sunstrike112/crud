import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, message } from "antd";

import { CRUDActions } from "../../redux/rootAction";

function DeletePopUp(props) {
  const { indexOfMeal, nameOfMeal, countOfMeal } = props;
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const deleteSuccess = () => {
    message.success({
      content: `delete ${nameOfMeal} with count is ${countOfMeal} succesful`,
      style: {
        marginLeft: 1000,
        fontSize: 20,
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDeleteMeal = () => {
    dispatch(CRUDActions.deleteMeal(indexOfMeal));
    deleteSuccess();
    setIsModalVisible(false);
  };

  return (
    <>
      <a onClick={showModal}>Delete</a>
      <Modal
        className="popup"
        title="Delete"
        visible={isModalVisible}
        onOk={handleDeleteMeal}
        okText="Delete"
        onCancel={handleCancel}
      >
        Are you want to delete '{nameOfMeal}' with the count is {countOfMeal} ?
      </Modal>
    </>
  );
}

export default DeletePopUp;
