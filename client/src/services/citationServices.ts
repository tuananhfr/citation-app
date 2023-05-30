import axios from "axios";

import { BASE_URL } from "../utils/baseUrl";
import { IEditCitation } from "../utils/interface";

const createACitation = async (citation: string) => {
  const response = await axios.post(`${BASE_URL}/citation/`, {
    citation: citation,
  });

  return response.data;
};

const getACitation = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/citation/${id}`);

  return response.data;
};

const getAllCitations = async () => {
  const response = await axios.get(`${BASE_URL}/citation`);
  return response.data;
};

const getRandomKaamelott = async () => {
  const response = await axios.get(`${BASE_URL}/random`);
  return response.data;
};
const getACitationRandom = async () => {
  const response = await axios.get(`${BASE_URL}/citation/random`);
  return response.data;
};

const deleteACitation = async (id: number) => {
  const response = await axios.delete(`${BASE_URL}/citation/${id}`);

  return response.data;
};
const updateACitation = async (data: IEditCitation) => {
  const response = await axios.put(`${BASE_URL}/citation/${data.id}`, {
    citation: data.citation,
  });

  return response.data;
};
const citationService = {
  createACitation,
  getAllCitations,
  getACitation,
  getRandomKaamelott,
  getACitationRandom,
  deleteACitation,
  updateACitation,
};
export default citationService;
