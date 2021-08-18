import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, message, Input } from "antd";
import axios from "axios";

import { CRUDActions } from "../../redux/rootAction";
import "./AddPopUp.css";

function AddPopUp(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputMeal, setInputMeal] = useState("");
  const dispatch = useDispatch();
  const mealsAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
  const [isNull, setIsNull] = useState(false);
  const [isMeal, setIsMeal] = useState(false);

  const showModal = () => {
    setInputMeal("");
    setIsMeal(false);
    setIsNull(false);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const addSuccess = (count) => {
    message.success({
      content: `Add ${inputMeal} with count is ${count} succesful`,
      style: {
        marginLeft: 1000,
        fontSize: 20,
      },
    });
  };

  const getMealCount = (inputSearch) => {
    return new Promise((resolve) => {
      axios.get(`${mealsAPI}${inputSearch}`).then((response) => {
        resolve(response.data.meals);
      });
    });
  };

  const handleAdd = async () => {
    setIsMeal(false);
    setIsNull(false);
    let countMeal = 0;
    console.log(inputMeal);
    console.log(typeof inputMeal);
    if (inputMeal.replace(/\s/g, "") == "") setIsNull(true);
    else {
      countMeal = await getMealCount(inputMeal);
      setIsNull(false);
    }
    if (countMeal == null) setIsMeal(true);
    else setIsMeal(false);
    if (inputMeal?.replace(/\s/g, "") != "" && countMeal !== null) {
      dispatch(
        CRUDActions.addNewMeal({
          nameOfMeal: inputMeal,
          count: countMeal.length,
        })
      );
      addSuccess(countMeal.length);
      setIsModalVisible(false);
    }
  };

  const handleInputMeal = (input) => {
    setInputMeal(input.target.value);
  };

  return (
    <>
      <button onClick={showModal}>Add new</button>
      <Modal
        className="popup"
        title="Add new"
        visible={isModalVisible}
        onOk={handleAdd}
        okText="ADD"
        onCancel={handleCancel}
      >
        <div>Input the meal name will count</div>
        <Input
          onChange={handleInputMeal}
          value={inputMeal ? inputMeal : ""}
        ></Input>
        {isNull ? (
          <p>Please enter input</p>
        ) : isMeal ? (
          <p>Count of that meal is 0, please enter another</p>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

export default AddPopUp;
