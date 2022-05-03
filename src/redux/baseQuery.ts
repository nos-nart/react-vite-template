import type { BaseQueryFn } from '@reduxjs/toolkit/dist/query';
import { notification } from 'antd';
import axios from 'axios';
import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import * as R from 'ramda';

import type { RootState } from '../store';

const errorHandler = (error: AxiosError) => {
  const { response } = error;

  if (response?.status) {
    const { status } = response;

    notification.error({
      message: `Error occur [${status}]`,
      description: getReasonPhrase(StatusCodes[status]),
    });
  } else if (!response) {
    notification.error({
      message: 'Network error',
      description: 'Check your internet connection 📡',
    });
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_HOST as string,
});

const axiosBaseQuery =
  (): BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    headers: AxiosRequestHeaders;
  }> =>
  async (requestOpts, { getState }) => {
    try {
      const token = (getState() as RootState).auth.token;
      const result = await axiosInstance({
        ...requestOpts,
        headers: {
          ...R.omit(['user-agent'], requestOpts.headers),
          Authorization: `Bearer ${token}`,
        },
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      errorHandler(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data,
        },
      };
    }
  };

export const appBaseQuery = axiosBaseQuery();
