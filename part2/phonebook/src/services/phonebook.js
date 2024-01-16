import axios from "axios";

const baseUrl = "/api/persons";

const getPersons = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    return response.data;
  });
};

const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

const updatePerson = (person, id) => {
  const request = axios.put(`${baseUrl}/${id}`, person);
  return request.then((response) => response.data);
};

export default { getPersons, createPerson, deletePerson, updatePerson };
