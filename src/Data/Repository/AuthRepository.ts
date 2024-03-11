import { SERVER_URL } from "@/Const";
import { UserEntity } from "@/Domain/Entity";
import { UserDataType } from "@/Data/Model";
import { AuthRepository } from "@/Domain/Repository";
import { LocalStorageDataSource, AuthDataSource } from "@/Data/DataSource";

class AuthRepositoryImpl implements AuthRepository {
  async signUp(data: UserDataType): Promise<UserEntity> {
    try {
      const res = await AuthDataSource.signup(data);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async login(id: string, password: string): Promise<UserEntity> {
    try {
      const data = await AuthDataSource.login(id, password);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async logout(): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage("refreshToken", "");
    await LocalStorageDataSource.saveLocalStorage("accessToken", "");
  }
  async getCredential(name: string): Promise<boolean> {
    try {
      const token = await LocalStorageDataSource.getLocalStorage(name);
      if (token === null) return false;
      return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCredential(name: string, token: string): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage(name, token);
  }
}

export default AuthRepositoryImpl;
