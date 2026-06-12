import axios from 'axios';

interface ErrorResponse {
  message?: string;
}

export const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
