import { chatTypes, chatActions } from "../types/chartTypes";

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails(details, chatType)),
  };
};

export const setChosenChatDetails = (chatDetails, type) => {
  return {
    type: chatActions.SET_CHOSEN_CHAT_DETAILS,
    chatType: type,
    chatDetails,
  };
};

export const setMessages = (messages) => {
  return {
    type: chatActions.SET_MESSAGES,
    messages,
  };
};
