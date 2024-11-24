const BASE_URL = process.env.REACT_APP_API_URL;

const API_ENDPOINTS = {
  CREATE_USER: `${BASE_URL}/registration`,
  LIST_USERS: `${BASE_URL}/list`,
};

export default API_ENDPOINTS;
