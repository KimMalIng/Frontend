import { UserEntity } from "@/Domain/Entity";

interface AuthRepository {
  signUp(data: UserEntity): Promise<UserEntity>;
  login(id: string, password: string): Promise<UserEntity>;
  logout(): Promise<void>;
  oauth(): Promise<void>;
  getCredential(name: string): Promise<boolean>;
  saveCredential(name: string, token: string): Promise<void>;
}

export default AuthRepository;
