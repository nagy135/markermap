import axios from "axios";

export type TRecordResponse = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  createdAt: string;
};

export const getRecords = async (): Promise<TRecordResponse[]> => {
  const endpoint = "http://localhost:4200/v1/records";
  return (await axios.get(`${endpoint}`, {})).data?.data?.items;
};
