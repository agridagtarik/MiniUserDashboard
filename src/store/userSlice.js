import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    setUsers(state, action) {
      state.list = action.payload;
    },
    addUser(state, action) {
      state.list = [action.payload, ...state.list];
    },
    deleteUser(state, action) {
      state.list = state.list.filter((user) => user.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
