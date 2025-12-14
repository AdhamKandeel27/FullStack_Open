import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const addPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson).then((res) => res.data);
};

export default addPerson;