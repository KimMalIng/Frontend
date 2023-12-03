import { UserEntity } from "@/Domain/Entity";
import { AuthRepository } from "@/Domain/Repository";

class AuthRepositoryImpl implements AuthRepository{
  signUp(data: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  login(id: string, password: string): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCredential(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  saveCredential(token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
};

export default AuthRepositoryImpl;