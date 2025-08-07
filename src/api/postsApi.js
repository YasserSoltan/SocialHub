import api from "./axios";

export const fetchPosts = async () => {
  try {
    const response = await api.get(`/posts`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch posts",
      status: error.response?.status,
    };
  }
};

export const fetchPost = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch post",
      status: error.response?.status,
    };
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await api.post("/posts", newPost, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create post");
  }
};