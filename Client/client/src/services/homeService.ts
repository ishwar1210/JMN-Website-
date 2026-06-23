import axiosInstance from "../api/axiosInstance";
import { ENDPOINTS } from "../api/endpoint";

export interface HomeData {
  id: number;
  home_video: string;
  home_title: string;
  home_desc: string;
  company_exp: number;
  apps_dev: number;
  project_dev: number;
  countries_served: number;
  client_satisfaction_percent: string;
  talented_squad: number;
  updated_at: string;
}

export interface HomeResponse {
  success: boolean;
  data: HomeData[];
}

export interface UpdateHomePayload {
  home_title?: string;
  home_desc?: string;
  company_exp?: number;
  apps_dev?: number;
  project_dev?: number;
  countries_served?: number;
  client_satisfaction_percent?: number;
  talented_squad?: number;
  home_video?: File;
}

export const getHomeData = async (): Promise<HomeResponse> => {
  const response = await axiosInstance.get<HomeResponse>(ENDPOINTS.HOME);
  return response.data;
};

export const updateHomeData = async (id: number, payload: UpdateHomePayload): Promise<HomeResponse> => {
  const formData = new FormData();

  if (payload.home_title !== undefined) formData.append("home_title", payload.home_title);
  if (payload.home_desc !== undefined) formData.append("home_desc", payload.home_desc);
  if (payload.company_exp !== undefined) formData.append("company_exp", String(payload.company_exp));
  if (payload.apps_dev !== undefined) formData.append("apps_dev", String(payload.apps_dev));
  if (payload.project_dev !== undefined) formData.append("project_dev", String(payload.project_dev));
  if (payload.countries_served !== undefined) formData.append("countries_served", String(payload.countries_served));
  if (payload.client_satisfaction_percent !== undefined) formData.append("client_satisfaction_percent", String(payload.client_satisfaction_percent));
  if (payload.talented_squad !== undefined) formData.append("talented_squad", String(payload.talented_squad));
  if (payload.home_video !== undefined) formData.append("home_video", payload.home_video);

  const response = await axiosInstance.put<HomeResponse>(ENDPOINTS.HOME_BY_ID(id), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};