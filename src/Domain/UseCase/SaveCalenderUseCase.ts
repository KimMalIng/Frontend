import { CalenderRepository } from "@/Domain/Repository";

class SaveCalenderUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository) {
    this.calenderReposiotry = cr;
  }

  async execute(
    id: number | null | undefined,
    name: string | null | undefined,
    label: number | null | undefined,
    deadline: Date | null | undefined,
    estimatedTime: number | null | undefined,
  ): Promise<void> {
    if (
      typeof id === "undefined" ||
      typeof name === "undefined" ||
      typeof label === "undefined" ||
      typeof deadline === "undefined" ||
      typeof estimatedTime === "undefined" ||
      id === null ||
      name === null ||
      label === null ||
      deadline === null ||
      estimatedTime === null
    ) {
      return Promise.reject(400);
    }

    // 조건
    try {
      await this.calenderReposiotry.saveCalender(
        id,
        name,
        label,
        deadline,
        estimatedTime,
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SaveCalenderUseCase;
