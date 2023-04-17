import { chatTypes, chatActions } from "../types/chartTypes";

const initState = {
  chosenChatDetails: null,
  chatType: null,
  messages: [],
};

export const chatReducer = (state = initState, action) => {
  switch (action.type) {
    case chatActions.SET_CHOSEN_CHAT_DETAILS:
      return {
        ...state,
        chosenChatDetails: action.chatDetails,
        chatType: action.chatType,
        messages: action.messages,
      };
    case chatActions.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
};
