import { FetchResponseErrorType } from '../models/error-models';
import axios from 'axios';

const getFetchResponseError = async (queryResponse: Response) => {
  const body = await queryResponse.json();
  throw { body: JSON.stringify(body), statusCode: queryResponse.status } as FetchResponseErrorType;
};

// The goal of this method is to act as a simple native fetch proxy. It will issue the fetch request exactly as it normally would.
// But it will provide a consistent way to capture errors, as well as ensure the response.ok is checked each time.
export const nativeFetch = async (url: RequestInfo, init?: RequestInit): Promise<any> => {
  const queryResponse = await fetch(url, init);

  // When success, return response promise in JSON
  if (queryResponse.ok) {
    return queryResponse.json();
  }

  return getFetchResponseError(queryResponse);
};

export const nativeFetcher = async (queryURL: string) => {
  return nativeFetch(queryURL);
};

export const nativeUpdater = async (queryURL: string, body: Record<string, any>) => {
  return nativeFetch(queryURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export const nativeCreator = async (queryURL: string, body: Record<string, any>) => {
  return nativeFetch(queryURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

export const nativeDeleter = async (queryURL: string) => {
  return nativeFetch(queryURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};
