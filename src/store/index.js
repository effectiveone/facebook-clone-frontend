import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { themeReducer } from "./reducers/themeReducer";
import { userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";
import friendsReducer from "./reducers/friendsReducer";
import { postsReducer } from "./reducers/postsReducer";
import { chatReducer } from "./reducers/chatReducer";
import { roomReducer } from "./reducers/roomReducer";

const rootReducer = combineReducers({
  posts: postsReducer,
  profile: profileReducer,
  friends: friendsReducer,
  user: userReducer,
  darkTheme: themeReducer,
  chat: chatReducer,
  room: roomReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export { store };
