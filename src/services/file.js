import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadFile = async (data, customHeaders) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API_URL}/api/upload`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": "multipart/form-data",
        ...customHeaders,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API_URL}/api/upload/files/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};
