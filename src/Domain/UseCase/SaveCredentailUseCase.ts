import { AuthRepository } from "@/Domain/Repository";

class saveCredentialUseCase {
  private authRepository: AuthRepository;

  constructor(at: AuthRepository){
    this.authRepository = at;
  }
  async execute(token: string): Promise<void>{
    try {
      const data = await this.authRepository.saveCredential(token);
    } catch (error) {
      return Promise.reject(error);
    } 
  }
};

export default saveCredentialUseCase;