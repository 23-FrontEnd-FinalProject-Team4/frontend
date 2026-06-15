import axios from 'axios';

interface ErrorResponse {
  message?: string;
}

const SERVER_FETCHER_ERROR_PATTERN = /^API request failed with status (\d+): ([\s\S]*)$/;

const parseServerFetcherError = (message: string) => {
  const match = message.match(SERVER_FETCHER_ERROR_PATTERN);

  if (!match) {
    return null;
  }

  const status = Number(match[1]);
  const errorBody = match[2];

  try {
    const data = JSON.parse(errorBody) as ErrorResponse;

    return {
      status,
      message: data.message,
    };
  } catch {
    return {
      status,
      message: errorBody || undefined,
    };
  }
};

export const getErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    return error.response?.data?.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    const parsed = parseServerFetcherError(error.message);

    if (parsed?.message) {
      return parsed.message;
    }

    return error.message;
  }

  return fallbackMessage;
};

export const isDuplicateNameError = (error: unknown) => {
  if (axios.isAxiosError<ErrorResponse>(error)) {
    const message = error.response?.data?.message ?? '';

    return error.response?.status === 409 || message.includes('이미 존재');
  }

  if (error instanceof Error) {
    const parsed = parseServerFetcherError(error.message);

    if (parsed) {
      return parsed.status === 409 || (parsed.message?.includes('이미 존재') ?? false);
    }

    return error.message.includes('409') || error.message.includes('이미 존재');
  }

  return false;
};
