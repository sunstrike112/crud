import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listMeals: [],
};

const CRUDSlice = createSlice({
  name: "CRUDSlice",
  initialState: initialState,
  reducers: {
    addNewMeal(state, action) {
      state.listMeals.push(action.payload);
    },

    deleteMeal(state, action) {
      const filteredMeals = state.listMeals.filter(
        (meal, index) => index !== action.payload
      );
      state.listMeals = filteredMeals;
    },

    editMeal(state, action) {
      let index = action.payload.indexOfMeal;
      state.listMeals[index].nameOfMeal = action.payload.nameOfMeal;
      state.listMeals[index].count = action.payload.count;
    },
  },
});

const { actions, reducer } = CRUDSlice;
export { actions as CRUDActions, reducer as CRUDReducer };
