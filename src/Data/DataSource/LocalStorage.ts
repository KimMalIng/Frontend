class LocalStorageDataSource {
  static getLocalStorage(): Promise<string | null>{
    return new Promise((resolve)=>{
      const token = localStorage.getItem("token");
      resolve(token)
    });
  }
  static saveLocalStorage(token: string): Promise<void> {
    return new Promise((resolve)=>{
      localStorage.setItem("token", token);
      resolve();
    });
  }
};

export default LocalStorageDataSource;