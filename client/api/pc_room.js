import axios from "axios";

export const api = {
  getPCRoomInfo: async () => {
    const result = await axios.get(
      "https://m.map.naver.com/search2/search.nhn?query=%EB%85%B8%EB%9E%98%EB%B0%A9&sm=hty&style=v5"
    );
    return result;
  },
};
