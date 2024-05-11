import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";


class DeleteCalenderUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository;

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }

  async execute(id: number | null | undefined): Promise<void>{
    if(typeof id !== "number") return Promise.reject(404);
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      await this.calenderReposiotry.deleteCalender(accessToken, id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default DeleteCalenderUseCase;