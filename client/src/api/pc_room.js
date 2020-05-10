import axios from "axios";

// var config = {
//   headers: { "Access-Control-Allow-Origin": "*" },
// };
export const api = {
  getPCRoomInfo: async () => {
    const result = await axios.get(`/pc`);
    return result;
  },
};
