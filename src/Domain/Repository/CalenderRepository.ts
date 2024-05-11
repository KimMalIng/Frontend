import { CalenderEntity } from "@/Domain/Entity";

interface CalenderRepository {
  getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity>;
  saveCalender(
    accessToken: string,
    name: string,
    startDate: string,
    endDate: string,
    label: number,
    estimatedTime: string,
  ): Promise<void>;
  saveFixCalender(
    accessToken: string,
    name: string,
    startDate: string,
    endDate: string,
    label: number,
    startTime: string,
    endTime: string,
    shouldClear: boolean,
  ): Promise<void>;
  adjustmentCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<void>;
  deleteCalender(accessToken: string, id: number): Promise<void>;
  completeCalender(accessToken: string, id: number): Promise<void>;
}

export default CalenderRepository;
