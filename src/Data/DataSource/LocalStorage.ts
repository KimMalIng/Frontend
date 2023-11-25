class LocalStorageDataSource {
  static getLocalStorage(): Promise<string | null>{
    return new Promise((resolve)=>{
      const a = localStorage.getItem("dasa");
      resolve(a)
    });
  }
};

export default LocalStorageDataSource;