import axiosInstance from "../api/axiosInstance";

const BASE_PATH = "/api/client";

export interface Client {
  id: number;
  client_name: string;
  logo_image: string;
  created_at: string;
}

export interface ClientFormData {
  client_name: string;
  logo_image?: File | null;
}

export const clientService = {
  // GET /api/client - Fetch all clients
  getAll: async (): Promise<Client[]> => {
    const response = await axiosInstance.get<{ success: boolean; data: Client[] }>(
      BASE_PATH
    );
    return response.data.data;
  },

  // POST /api/client - Create new client (multipart/form-data)
  create: async (data: ClientFormData): Promise<Client> => {
    const formData = new FormData();
    formData.append("client_name", data.client_name);
    if (data.logo_image) {
      formData.append("logo_image", data.logo_image);
    }
    const response = await axiosInstance.post<{ success: boolean; data: Client }>(
      BASE_PATH,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  // PUT /api/client/:id - Update client (multipart/form-data)
  update: async (id: number, data: ClientFormData): Promise<Client> => {
    const formData = new FormData();
    formData.append("client_name", data.client_name);
    if (data.logo_image) {
      formData.append("logo_image", data.logo_image);
    }
    const response = await axiosInstance.put<{ success: boolean; data: Client }>(
      `${BASE_PATH}/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data.data;
  },

  // DELETE /api/client/:id - Delete client
  delete: async (id: number): Promise<void> => {
    await axiosInstance.delete(`${BASE_PATH}/${id}`);
  },
};