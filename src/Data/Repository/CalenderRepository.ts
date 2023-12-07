import { CalenderEntity } from '@/Domain/Entity';
import { CalenderRepository } from '@/Domain/Repository';
import { CalenderDataSource } from '@/Data/DataSource';

class CalenderRepositoryImpl implements CalenderRepository {
  async adjustmentCalender(id: number, startDate: string, endDate: string): Promise<void> {
    try {
      await CalenderDataSource.adjustmentCalender(id, startDate, endDate);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getCalender(
    id: number,
    startDate: string,
    endDate: string
  ): Promise<CalenderEntity[]> {
    try {
      const data: CalenderEntity[] = await CalenderDataSource.getCalender(
        id,
        startDate,
        endDate
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCalender(
    id: number,
    name: string,
    label: number,
    deadline: Date,
    estimatedTime: number
  ): Promise<void> {
    try {
      await CalenderDataSource.saveCalender(
        id,
        name,
        label,
        deadline,
        estimatedTime
      );
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CalenderRepositoryImpl;
