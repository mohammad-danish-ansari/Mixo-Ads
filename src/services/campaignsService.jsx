import { getApi,  } from "./api";

export const getAllCampaigns = async (query = {}) => getApi("campaigns", query)
export const getByIdCampaigns = async (id) => getApi(`campaigns/${id}`)
