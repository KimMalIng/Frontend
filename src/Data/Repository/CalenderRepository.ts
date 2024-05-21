import { CalenderEntity } from "@/Domain/Entity";
import { CalenderRepository } from "@/Domain/Repository";
import { CalenderDataSource } from "@/Data/DataSource";
import { EveryTimeResponseType } from '@/Data/Model'

class CalenderRepositoryImpl implements CalenderRepository {
  async setEverytime(accessToken: string, data: EveryTimeResponseType): Promise<void> {
    try {
      await CalenderDataSource.setTimeTable(accessToken, data);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getEverytime(id: string, password: string): Promise<EveryTimeResponseType> {
    try {
      const data = await CalenderDataSource.getET(id, password);
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async fixCalender(accessToken: string, id: number): Promise<void> {
    try {
      await CalenderDataSource.fixCalender(accessToken, id);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async deleteCalender(accessToken: string, id: number): Promise<void> {
    try {
        await CalenderDataSource.deleteCalender(accessToken, id);
    } catch (error) {
      return Promise.reject();
    }
  }
  async completeCalender(accessToken: string, id: number, completion : number): Promise<void> {
    try {
      await CalenderDataSource.completCalender(accessToken, id, completion);
  } catch (error) {
    return Promise.reject();
  }
  }
  async saveFixCalender(accessToken: string, name: string, startDate: string, endDate: string, label: number, startTime: string, endTime: string, shouldClear: boolean): Promise<void> {
    try {
      await CalenderDataSource.saveFiexdCalender(accessToken, name, label, startDate, endDate, startTime, endTime, shouldClear);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async saveCalender(accessToken: string, name: string, startDate: string, endDate: string, label: number, estimatedTime: string): Promise<void> {
    try {
      await CalenderDataSource.saveCalender(accessToken, name, label, startDate, endDate, estimatedTime);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async adjustmentCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      await CalenderDataSource.adjustmentCalender(accessToken, startDate, endDate);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity> {
    try {
      const data: CalenderEntity = await CalenderDataSource.getCalender(
        accessToken,
        startDate,
        endDate,
      );
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default CalenderRepositoryImpl;
