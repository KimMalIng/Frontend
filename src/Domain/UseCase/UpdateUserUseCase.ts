import { UserRepository, CredentialRepository } from "@/Domain/Repository";

class UpdateUserUseCase {
  private userRepository: UserRepository;
  private credentialRepository: CredentialRepository;

  constructor(ur: UserRepository, cr: CredentialRepository) {
    this.userRepository = ur;
    this.credentialRepository = cr;
  }

  async execute(memberId: string, memberPw: string, name: string, nickname: string): Promise<void>{
    if(
      typeof memberId !== "string" ||
      typeof memberPw !== "string" ||
      typeof name !== "string" ||
      typeof nickname !== "string"
    ) return Promise.reject(404);
    if(
      memberId === "" ||
      memberPw === "" ||
      name === "" ||
      nickname === ""
    ) return Promise.reject(404);

    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      await this.userRepository.update(accessToken, memberId, memberPw, name, nickname);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default UpdateUserUseCase;