import { CalenderRepository } from '@/Domain/Repository';
import { CalenderRepositoryImpl } from '@/Data/Repository';
import { GetCalenderUseCase } from '@/Domain/UseCase';

class CalenderModel {
  private calenderRepository: CalenderRepository;
  private getCalenderUseCase: GetCalenderUseCase;

  constructor() {
    this.calenderRepository = new CalenderRepositoryImpl();
    this.getCalenderUseCase = new GetCalenderUseCase(this.calenderRepository);
  }

  async getCalender() {
    try {
      const res = await this.getCalenderUseCase.execute(
        102,
        '2023.12.04',
        '2023.12.10'
      );
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CalenderModel;
