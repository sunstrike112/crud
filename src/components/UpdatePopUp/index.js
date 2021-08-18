import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { Modal, Input, message } from "antd";
import axios from "axios";

import { CRUDActions } from "../../redux/rootAction";

function UpdatePopUp(props) {
  const { indexOfMeal, nameOfMeal, countOfMeal } = props;
  const dispatch = useDispatch();
  const [inputMeal, setInputMeal] = useState(nameOfMeal);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const mealsAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  const [isNull, setIsNull] = useState(false);
  const [isMeal, setIsMeal] = useState(false);

  const showModal = () => {
    setInputMeal(nameOfMeal);
    setIsMeal(false);
    setIsNull(false);
    setIsModalVisible(true);
  };

  const updateSuccess = (count) => {
    message.success({
      content: `Update ${inputMeal} with count is ${count} succesful`,
      style: {
        marginLeft: 1000,
        fontSize: 20,
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputMeal = (input) => {
    setInputMeal(input.target.value);
  };

  const getMealCount = (inputSearch) => {
    return new Promise((resolve) => {
      axios.get(`${mealsAPI}${inputSearch}`).then((response) => {
        resolve(response.data.meals);
      });
    });
  };

  const handleUpdateMeal = async () => {
    setIsMeal(false);
    setIsNull(false);
    let countMeal = 0;
    if (inputMeal.replace(/\s/g, "") == "") setIsNull(true);
    else {
      setIsNull(false);
      countMeal = await getMealCount(inputMeal);
    }
    if (countMeal == null) setIsMeal(true);
    else setIsMeal(false);
    if (inputMeal.replace(/\s/g, "") != "" && countMeal !== null) {
      dispatch(
        CRUDActions.editMeal({
          indexOfMeal: indexOfMeal,
          nameOfMeal: inputMeal,
          count: countMeal.length,
        })
      );
      updateSuccess(countMeal.length);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <a onClick={showModal}>Edit</a>
      <Modal
        className="popup"
        title="Edit meal"
        visible={isModalVisible}
        onOk={handleUpdateMeal}
        okText="Update"
        onCancel={handleCancel}
      >
        <Input
          onChange={handleInputMeal}
          value={inputMeal ? inputMeal : ""}
        ></Input>
        {isMeal == false && isNull == false && (
          <div>This count is {countOfMeal}</div>
        )}
        {isNull && <p>Please enter input</p>}{" "}
        {isMeal && <p>Count of that meal is 0, please enter another</p>}
      </Modal>
    </>
  );
}

export default UpdatePopUp;
