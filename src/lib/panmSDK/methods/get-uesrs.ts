import { User } from '@/lib/panmSDK/models/user-models';
import { nativeFetch } from '@/lib/panmSDK/utility/fetch-handling-utility';

export const getUsers = async (): Promise<User[]> => {
  try {
    const data = await nativeFetch('https://dummyjson.com/users');
    return data.users;
  } catch (error) {
    throw error;
  }
};
