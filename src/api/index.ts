import axios from "axios";

const api = axios.create({
  baseURL: "https://app.wagesplitter-dev.com/api",
  headers: {
    "Content-Type": "application/json",
    "X-User-Identification-Id": "c914304f-5a3e-44e3-9add-0d03c931c6a3",
    "X-User-Auth-Token": "aJyuDUSkauNV3AIq0s8wEw",
  },
  transformRequest: [(data) => JSON.stringify(data)],
  transformResponse: [(data) => JSON.parse(data)],
});

export default api;
