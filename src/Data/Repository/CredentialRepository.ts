import { CredentialRepository } from "@/Domain/Repository";
import { LocalStorageDataSource, AuthDataSource } from '@/Data/DataSource';

class CredentialRepositoryImpl implements CredentialRepository {
  async getAuthCredential(): Promise<boolean> {
    const token = await LocalStorageDataSource.getLocalStorage("accessToken");
    if(typeof token === "string"){
      try {
        await AuthDataSource.info(token);
        return true;
      }
      catch (error) {
        return false;
      }
    }
    return false;
  }
  async setLocalStorage(name: string, token: string): Promise<void> {
    await LocalStorageDataSource.saveLocalStorage(name, token);
  }
  async getLocalStorage(name: string): Promise<string> {
    const token = await LocalStorageDataSource.getLocalStorage(name);
    if(typeof token === "string") return token;
    return Promise.reject(404);
  } 
}

export default CredentialRepositoryImpl;