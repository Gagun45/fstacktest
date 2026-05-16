import { backendUrls } from "@/lib/backend.urls";
import axios, { AxiosError } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

let isRefreshing = false;

type IWaitListCB = () => void;
const waitList: IWaitListCB[] = [];

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config!;
    const isAuthRoute = originalRequest.url?.includes(backendUrls.auth.signIn);
    const isRefreshRoute = originalRequest.url?.includes(
      backendUrls.auth.refresh,
    );

    if (isRefreshRoute) return Promise.reject(error);

    if (error.response?.status === 401 && !isAuthRoute) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      if (!isRefreshing) {
        isRefreshing = true;
        originalRequest._retry = true;
        try {
          await api.post(backendUrls.auth.refresh);
          runAfterRefresh();
          isRefreshing = false;
          return api(originalRequest);
        } catch {
          isRefreshing = false;
          return Promise.reject(error);
        }
      }
      if (originalRequest.url === backendUrls.auth.refresh) {
        return Promise.reject(error);
      }
      return new Promise((resolve) => {
        subscribeToWaitList(() => {
          resolve(api(originalRequest));
        });
      });
    }

    return Promise.reject(error);
  },
);

const subscribeToWaitList = (cb: IWaitListCB): void => {
  waitList.push(cb);
};

const runAfterRefresh = (): void => {
  while (waitList.length) {
    const cb = waitList.pop()!;
    cb();
  }
};

export { api };
