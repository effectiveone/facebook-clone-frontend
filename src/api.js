import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("/friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async ({ senderId, receiverId }) => {
  try {
    return await apiClient.post("/friend-invitation/accept", {
      senderId,
      receiverId,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const rejectFriendInvitation = async ({ senderId, receiverId }) => {
  console.log("rejectFriendInvitation", senderId);
  console.log("rejectFriendInvitationreceiverId", receiverId);

  try {
    return await apiClient.post("/friend-invitation/reject", {
      senderId,
      receiverId,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;

  // if (responseCode) {
  //   responseCode === 401 || responseCode === 403;
  // }
  return;
};
