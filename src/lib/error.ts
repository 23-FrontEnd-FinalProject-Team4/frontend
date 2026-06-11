import axios from 'axios';

interface ErrorResponse {
  message?: string;
}

export const getAxiosErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  return fallbackMessage;
};
