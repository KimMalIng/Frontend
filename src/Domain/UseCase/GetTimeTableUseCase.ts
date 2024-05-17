import { CalenderRepository } from "@/Domain/Repository";

class GetTimeTableUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository) {
    this.calenderReposiotry = cr;
  }

  async execute(id: string | null | undefined, password: string | null | undefined) {
    try {
      if(
        typeof id !== "string" ||
        typeof password !== "string"
      ) return Promise.reject(404);
      if(
        id === null ||
        password === null
      ) return Promise.reject(404);

      const data = await this.calenderReposiotry.getEverytime(id, password);
      return data;

    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default GetTimeTableUseCase;