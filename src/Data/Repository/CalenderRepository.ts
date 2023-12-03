import { CalenderEntity } from "@/Domain/Entity";
import { CalenderRepository } from "@/Domain/Repository";
import { CalenderDataSource } from "@/Data/DataSource";

class CalenderRepositoryImpl implements CalenderRepository{
  async getCalender(id: number, startDate: string, endDate: string): Promise<CalenderEntity> {
    try {
      const data = await CalenderDataSource.getCalender(id, startDate, endDate);
      const calenderEntity = new CalenderEntity(data.day, data.subject);
      return calenderEntity;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCalender(id: number, name: string, label: number, deadline: Date, estimatedTime: number): Promise<void> {
    try {
      await CalenderDataSource.saveCalender(id, name, label, deadline, estimatedTime);
    } catch (error) {
      return Promise.reject(error);
    }
  } 
};

export default CalenderRepositoryImpl;