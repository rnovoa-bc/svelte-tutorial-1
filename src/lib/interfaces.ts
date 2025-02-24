export interface User {
  _id?: string; // ObjectId is usually returned as a string when serialized
  name: string;
  uid: string;
  email: string;
  password: string;
  
}

export const UserHelper = {
  blankUser: () => { return {name: '', uid: '', email: '', password: ''}}
} 