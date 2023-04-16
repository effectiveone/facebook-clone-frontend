import axios from "axios";

const makeRequest = (url, method) => (data, token) => async () => {
  try {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({
      method,
      url: `${process.env.REACT_APP_BACKEND_URL}${url}`,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateprofilePicture = makeRequest("/updateProfilePicture", "PUT");

export const updateCover = makeRequest("/updateCover", "PUT");

export const addFriend = (id) => makeRequest(`/addFriend/${id}`, "PUT");

export const cancelRequest = (id) => makeRequest(`/cancelRequest/${id}`, "PUT");

export const follow = (id) => makeRequest(`/follow/${id}`, "PUT");

export const unfollow = (id) => makeRequest(`/unfollow/${id}`, "PUT");

export const acceptRequest = (id) => makeRequest(`/acceptRequest/${id}`, "PUT");

export const unfriend = (id) => makeRequest(`/unfriend/${id}`, "PUT");

export const deleteRequest = (id) => makeRequest(`/deleteRequest/${id}`, "PUT");

export const search = (searchTerm) =>
  makeRequest(`/search/${searchTerm}`, "POST");

export const addToSearchHistory = makeRequest("/addToSearchHistory", "PUT");

export const getSearchHistory = makeRequest("/getSearchHistory", "GET");

export const removeFromSearch = makeRequest("/removeFromSearch", "PUT");

export const getFriendsPageInfos = makeRequest("/getFriendsPageInfos", "GET");
