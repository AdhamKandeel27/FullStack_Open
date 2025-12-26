import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const update = async (id, blogObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, blogObject);
  return response.data;
};
const deleteBlog = async (id, config) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, update,deleteBlog };
