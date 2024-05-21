import { CalenderEntity } from "@/Domain/Entity";

type TimelineType = {
  endTime: string;
  startTime: string;
  name: string;
};

type TranslateTimeLineType = {
  day: number;
  subject: TimelineType[];
};

type EveryTimeResponseType = {
  semester: number | string;
  timeline: TranslateTimeLineType[];
  year: number;
};


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
  completeCalender(accessToken: string, id: number, completion : number): Promise<void>;
  fixCalender(accessToken: string, id: number): Promise<void>;
  getEverytime(id: string, password: string): Promise<EveryTimeResponseType>;
  setEverytime(accessToken: string, data: EveryTimeResponseType): Promise<void>;
}

export default CalenderRepository;
