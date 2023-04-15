import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { themeReducer } from "./reducers/themeReducer";
import { userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";
import friendsReducer from "./reducers/friendsReducer";
import { postsReducer } from "./reducers/postsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
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

const composeEnhancers = composeWithDevTools({});

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);
