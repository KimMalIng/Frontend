import { UserRepository, CredentialRepository } from "@/Domain/Repository";

class DeleteUserUseCase {
  private userRepository: UserRepository;
  private credentialRepository: CredentialRepository;

  constructor(ur: UserRepository, cr: CredentialRepository) {
    this.userRepository = ur;
    this.credentialRepository = cr;
  }

  async execute(id: string | null | undefined): Promise<void> {
    if(typeof id !== "string") return Promise.reject(404);
    if(id === "") return Promise.reject(404);
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      await this.userRepository.delete(accessToken, id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default DeleteUserUseCase;