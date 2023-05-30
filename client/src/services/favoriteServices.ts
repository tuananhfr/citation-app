import axios from "axios";

import { BASE_URL } from "../utils/baseUrl";
import { IFavorite } from "../utils/interface";

const createFavorite = async (data: IFavorite) => {
  const response = await axios.post(`${BASE_URL}/favorite/`, data);

  return response.data;
};

const getCitationFavorite = async () => {
  const response = await axios.get(`${BASE_URL}/favorite`);

  return response.data;
};

const getACitationFavo = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/favorite/${id}`);

  return response.data;
};
const favoriteService = {
  createFavorite,
  getCitationFavorite,
  getACitationFavo,
};
export default favoriteService;
