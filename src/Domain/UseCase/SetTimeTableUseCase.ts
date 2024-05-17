import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";
import { EveryTimeResponseType } from '@/Data/Model'

class SetTimeTableUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository;

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }
  async execute(data: EveryTimeResponseType | null | undefined) {
    try {
      if(data === null || typeof data === "undefined") return Promise.reject(404);
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      await this.calenderReposiotry.setEverytime(accessToken, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default SetTimeTableUseCase;