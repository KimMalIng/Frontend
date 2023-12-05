import { CalenderEntity } from "@/Domain/Entity";

interface CalenderRepository {
  getCalender(id: number, startDate: string, endDate: string): Promise<CalenderEntity>;
  saveCalender(id: number, name: string, label: number, deadline: Date, estimatedTime: number): Promise<void>;
};

export default CalenderRepository;