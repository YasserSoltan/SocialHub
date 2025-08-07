import api from "./axios";

export const fetchUsers = async () => {
  try {
    const response = await api.get(`/users`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch users",
      status: error.response?.status,
    };
  }
};

export const fetchUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw {
      message: error.response?.data?.message || "Failed to fetch user",
      status: error.response?.status,
    };
  }
};

export const createUser = async (newUser) => {
  try {
    const response = await api.post("/users", newUser, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to create user");
  }
};
