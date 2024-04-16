import { SERVER_URL } from "@/Const";
import { UserEntity } from "@/Domain/Entity";
import { UserDataType } from "@/Data/Model";
import { AuthRepository } from "@/Domain/Repository";
import { LocalStorageDataSource, AuthDataSource } from "@/Data/DataSource";

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
  oauth(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCredential(name: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  saveCredential(name: string, token: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
}

export default AuthRepositoryImpl;
