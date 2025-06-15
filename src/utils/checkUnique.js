import axios from "axios";

const checkUnique = async (property, value) => {
  const { data } = await axios.get(
    `http://localhost:3000/users?${property}=${value}`
  );
  return data.length === 0;
};

export default checkUnique;
