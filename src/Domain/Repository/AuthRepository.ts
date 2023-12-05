import { UserEntity } from "@/Domain/Entity";

interface AuthRepository {
  signUp(data: UserEntity): Promise<UserEntity>;
  login(id: string, password: string): Promise<UserEntity>;
  logout(): Promise<void>;
  getCredential(): Promise<boolean>;
  saveCredential(token: string): Promise<void>; 
}

export default AuthRepository;