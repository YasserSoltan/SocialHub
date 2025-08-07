import api from "./axios";

export const fetchLikes = async () => {
  try {
    const response = await api.get(`/likes`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch likes",
      status: error.response?.status,
    };
  }
};

export const fetchLike = async (likeId) => {
  try {
    const response = await api.get(`/likes/${likeId}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch like",
      status: error.response?.status,
    };
  }
};

export const createLike = async (newLike) => {
  try {
    const response = await api.post("/likes", newLike, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create like");
  }
};
