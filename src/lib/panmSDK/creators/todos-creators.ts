import { nativeCreator } from '../utility/fetch-handling-utility';

export const todoCreator = async ({ title }: { title: string }) => {
  const queryURL = `/api/todos`;
  return nativeCreator(queryURL, { title });
};
