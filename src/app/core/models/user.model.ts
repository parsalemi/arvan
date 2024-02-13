export interface User {
  username:	string;
  email:	string;
  password:	string;
}
export interface UserLogin {
  email: string;
  password: string;
}
export interface UserDTO{
    user: {
      email: string,
      token: string,
      username: string,
      bio: string,
      image: string
    }
}
