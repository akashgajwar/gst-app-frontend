import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TOKEN =
  "ac4cb56e5ca841e74479655eb10cf541c56675320a5eb40e1827812105257531ef321dba786b8a3bc88d9641adc68fc55f47ac9083cfcdff8bc3fb65709e1cf1d33ddcbbcc65edb449d36d196b66761f4ae74626a88f7551da8239c937648ed76a9563797a7d0478eaf9e4b4707adaa9e20d56f400db064510edd51a0c47584b";

export const notifications = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/api/notifications?populate=*`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateNotification = async (notificationId) => {
  try {
    const res = await axios.put(
      `${API_URL}/api/notifications/${notificationId}`,
      { viewed: true },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
