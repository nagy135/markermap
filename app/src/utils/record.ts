import axios from "axios";
import { API_ENDPOINT } from "./constants";

export type TRecordResponse = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  altitude: number;
  createdAt: string;
  images: TImage[];
};

export type TImage = {
  id: string;
  name: string;
  path: string;
  createdAt: string;
};

export const getRecords = async (): Promise<TRecordResponse[]> => {
  const endpoint = `${API_ENDPOINT}/v1/records`;
  return (await axios.get(`${endpoint}`, {})).data?.data?.items;
};
