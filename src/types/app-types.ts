import { UserCredential } from 'firebase/auth';
export interface ITodoItem {
  ID?: string;
  title: string;
  createdBy: string;
  createdTime: number;
  status: 'incomplete' | 'complete';
}

export interface IUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export function createUserFromGoogleUser(
  userCredential: UserCredential
): IUser {
  const { displayName, email, photoURL, uid } = userCredential.user;
  return {
    displayName,
    email,
    photoURL,
    uid,
  };
}

export interface IUserAndTodoList {
  user: IUser;
  todoList: ITodoItem[];
}
