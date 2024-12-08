export const withTokenInterceptor = async (config) => {
  if (!config.headers) return config;

  const token = await localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

export const authRejectInterceptor = async (error) => {
  if (error.response?.status === 401 && error.config) {
    localStorage.removeItem("accessToken");
  }
  throw error;
};
