import { CalenderRepository } from '@/Domain/Repository';
import { CalenderEntity } from '@/Domain/Entity';

class GetCalenderUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository){
    this.calenderReposiotry = cr;
  }

  async execute(id: number | null | undefined, startDate: string | null | undefined, endDate: string | null | undefined): Promise<CalenderEntity>{
    // 조건
    if(
      typeof id === "undefined" ||
      typeof startDate === "undefined" ||
      typeof endDate === "undefined" ||
      id === null ||
      startDate === null ||
      endDate === null
    ){
      return Promise.reject(400);
    }
    if(startDate.length !== 8 || endDate.length !== 8){
      return Promise.reject(400);
    }
    try {
      const data = await this.calenderReposiotry.getCalender(id, startDate, endDate);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default GetCalenderUseCase;