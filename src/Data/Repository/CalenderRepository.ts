import { CalenderEntity } from "@/Domain/Entity";
import { CalenderRepository } from "@/Domain/Repository";

class CalenderRepositoryImpl implements CalenderRepository{
  getCalender(id: number, startDate: string, endDate: string): Promise<CalenderEntity> {
    throw new Error("Method not implemented.");
  }
  saveCalender(id: number, name: string, label: number, deadline: Date, estimatedTime: number): Promise<void> {
    throw new Error("Method not implemented.");
  } 
};

export default CalenderRepository;