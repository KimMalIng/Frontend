import { CalenderRepository, CredentialRepository } from "@/Domain/Repository";

class AdjustmentCalenderUseCase {
  private calenderReposiotry: CalenderRepository;
  private credentialRepository: CredentialRepository;

  constructor(cr: CalenderRepository, cl: CredentialRepository) {
    this.calenderReposiotry = cr;
    this.credentialRepository = cl;
  }

  async execute(
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
  ): Promise<void> {
    if (
      typeof startDate !== "object" ||
      typeof endDate !== "object" ||
      startDate === null ||
      endDate === null
    ) {
      return Promise.reject(400);
    }
    try {
      const accessToken = await this.credentialRepository.getLocalStorage("accessToken");
      const sMonth = ((startDate.getMonth() + 1) < 10)? (`0${startDate.getMonth() + 1}`) : (`${startDate.getMonth() + 1}`)
      const eMonth = ((endDate.getMonth() + 1) < 10)? (`0${endDate.getMonth() + 1}`) : (`${endDate.getMonth() + 1}`)
      const sDay = (startDate.getDate() < 10)? (`0${startDate.getDate()}`) : (`${startDate.getDate()}`);
      const eDay = (endDate.getDate() < 10)? (`0${endDate.getDate()}`) : (`${endDate.getDate()}`);
      const s = `${startDate.getFullYear()}.${sMonth}.${sDay}`;
      const e = `${endDate.getFullYear()}.${eMonth}.${eDay}`;
      console.log("sibal")
      console.log(s);
      console.log(e);
      await this.calenderReposiotry.adjustmentCalender(accessToken, s, e);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default AdjustmentCalenderUseCase;
