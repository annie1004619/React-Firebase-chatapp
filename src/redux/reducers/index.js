import { combineReducers } from "redux";
import user from "./user_reducer";
import chatRoom from "./chatRoom_reducer";

// 만든 reducers 합쳐 주기
const rootReducer = combineReducers({
  user,
  chatRoom,
});

export default rootReducer;
