import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const addPersonService = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

const deletePersonService = (id) => {
  const promiseObject = axios.delete(`${baseUrl}/${id}`);
  return promiseObject.then(response=>response.data);
};

export { addPersonService, deletePersonService };
