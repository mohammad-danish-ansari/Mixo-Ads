import { getApi,  } from "./api";

export const getAllCampaignsInsights = async (query = {}) => getApi("campaigns/insights", query)
export const getByIdCampaignsInsights = async (id) => getApi(`campaigns/${id}/insights`)
export const getByIdCampaignsInsightStream = async (id) => getApi(`campaigns/${id}/insights/stream`)