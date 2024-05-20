import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";

class FixCalenderUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository;

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }

  async execute(id: number | null | undefined): Promise<void> {
    try {
      if(typeof id !== "number") return Promise.reject(404);
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      await this.calenderReposiotry.fixCalender(accessToken, id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default FixCalenderUseCase;