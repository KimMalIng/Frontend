interface CredentialRepository {
  getAuthCredential(): Promise<boolean>;
  setLocalStorage(name: string, token: string): Promise<void>;
  getLocalStorage(name: string): Promise<string>;
}

export default CredentialRepository;