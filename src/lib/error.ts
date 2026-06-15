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

export const isDuplicateNameError = (error: unknown) => {
  if (!axios.isAxiosError<ErrorResponse>(error)) {
    return false;
  }

  const message = error.response?.data?.message ?? '';

  return error.response?.status === 409 || message.includes('이미 존재');
};
