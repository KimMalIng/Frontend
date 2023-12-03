import { CalenderRepository } from '@/Domain/Repository';

class SaveCalenderUseCase {
  private calenderReposiotry: CalenderRepository;

  constructor(cr: CalenderRepository){
    this.calenderReposiotry = cr;
  }

  async execute(id: number, name: string, label: number, deadline: Date, estimated_time: number): Promise<void>{
    // 조건
    try {
       await this.calenderReposiotry.saveCalender(id, name, label, deadline, estimated_time);
    } catch (error) {
      return Promise.reject(error);
    }
  }
};

export default SaveCalenderUseCase;
