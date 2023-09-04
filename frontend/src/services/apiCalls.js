import axios from "axios";

export const contentCall = async (contentType) => {
  const user = JSON.parse(localStorage.getItem("user"));
  try {
    const res = await axios.get(`/content/lists`, {
      params: { type: contentType },
      headers: {
        authorization: user.token,
      },
    });

    return res.data;
  } catch (error) {
    console.log("content:" + error.message);
    return error;
  }
};

export const itemInfoCall = async (id) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get(`/content/${id}`, {
      headers: {
        authorization: user.token,
      },
    });
    return res.data;
  } catch (error) {
    console.error("failed to get item info " + error);
  }
};

export const filteredContentCall = async (query) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.get("/content/filter", {
      params: { query },
      headers: {
        authorization: user.token,
      },
    });

    return res.data;
  } catch (error) {
    console.error("failed to get filter content " + error);
  }
};

export const addContentToFavorites = async (contentId) => {
  const user = JSON.parse(localStorage.getItem("user"));

  try {
    const res = await axios.post(
      "/users/addToFavorites",
      { contentId },
      {
        headers: {
          authorization: user.token,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
