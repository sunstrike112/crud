import React from "react";
import { useSelector } from "react-redux";

import DeletePopUp from "../DeletePopUp";
import UpdatePopUp from "../UpdatePopUp";
import "./ListMeals.css";

function ListMeals(props) {
  const listMeals = useSelector((state) => state.CRUDReducer.listMeals);

  const renderListMeals = (meal, index) => {
    return (
      <tr key={index} className={index % 2 == 0 ? "gray" : "white"}>
        <td>{index + 1}</td>
        <td>{meal.nameOfMeal}</td>
        <td>{meal.count}</td>
        <td>
          <UpdatePopUp
            indexOfMeal={index}
            nameOfMeal={meal.nameOfMeal}
            countOfMeal={meal.count}
          />
          |
          <DeletePopUp
            indexOfMeal={index}
            nameOfMeal={meal.nameOfMeal}
            countOfMeal={meal.count}
          />
        </td>
      </tr>
    );
  };

  console.log(listMeals);

  return (
    <>
      {listMeals.length > 0 ? (
        <table className="listmeals">
          <thead>
            <tr className="listmeals--header">
              <th>No</th>
              <th>Name</th>
              <th>Count</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="listmeals--body">
            {listMeals.map(renderListMeals)}
          </tbody>
        </table>
      ) : (
        <h2>Click Add button to add new meal</h2>
      )}
    </>
  );
}

export default ListMeals;
