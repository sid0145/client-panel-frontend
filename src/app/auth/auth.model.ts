export interface SignUpRes {
  _id: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginRes {
  token: string;
  expiresIn: number;
  userId: string;
}
