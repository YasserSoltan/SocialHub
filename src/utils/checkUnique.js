import api from "../api/axios";

const checkUnique = async (property, value) => {
  const { data } = await api.get(`/users?${property}=${value}`);
  return data.length === 0;
};

export default checkUnique;
