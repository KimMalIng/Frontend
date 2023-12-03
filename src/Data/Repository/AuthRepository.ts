import { SERVER_URL } from "@/Const";
import { UserEntity } from "@/Domain/Entity";
import { UserDataType } from '@/Data/Model';
import { AuthRepository } from "@/Domain/Repository";
import { LocalStorageDataSource, AuthDataSource } from '@/Data/DataSource';

class AuthRepositoryImpl implements AuthRepository{
  signUp(data: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  async login(id: string, password: string): Promise<UserEntity> {
    try {
      const data = await AuthDataSource.login(id, password);
      const userEntity = new UserEntity(data.id, data.imageUrl, data.major, data.name, data.nickname, data.password, data.university);
      return userEntity;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async logout(): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage("");
  }
  async getCredential(): Promise<boolean> {
    try {
      // const token = await LocalStorageDataSource.getLocalStorage();
      return false;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCredential(token: string): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage(token);
  }
  
};

export default AuthRepositoryImpl;