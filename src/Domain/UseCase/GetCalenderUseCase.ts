import { CalenderRepository } from '@/Domain/Repository';
import { CalenderEntity } from '@/Domain/Entity';

class GetCalenderUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository){
    this.calenderReposiotry = cr;
  }

  async execute(id: number, startDate: string, endDate: string): Promise<CalenderEntity>{
    // 조건
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