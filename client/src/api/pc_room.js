import axios from "axios";

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };
export const api = {
  getPCRoomInfo: async () => {
    const result = await axios.get(`/pc`);
    return result;
  },
  getInfo: async () => {
    const result = await axios.get(`/info`);
    return result.data.result.site.list;
  },
};
