import { UserRepository } from "@/Domain/Repository";
import { UserDataSource } from '@/Data/DataSource';

class UserRepositoryImpl implements UserRepository {
  async update(accessToken: string, memberId: string, memberPw: string, name: string, nickname: string): Promise<void> {
    try {
      await UserDataSource.update(accessToken, memberId, memberPw, name, nickname);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async delete(accessToken: string, id: string): Promise<void> {
    try {
      await UserDataSource.delete(accessToken, id);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}

export default UserRepositoryImpl;