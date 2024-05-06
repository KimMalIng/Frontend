import { SERVER_URL } from "@/Const";
import { CalenderData } from "@/Data/Model";
class CalenderDataSource {
  static async getCalender(
    id: number,
    startDate: string,
    endDate: string,
  ): Promise<CalenderData[]> {
    try {
      const res = await fetch(`${SERVER_URL}/timetable/period`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
          startDate,
          endDate,
        }),
      });
      if (res.status === 200) {
        const data: CalenderData[] = await res.json();
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async saveCalender(
    accessToken: string,
    name: string,
    label: number,
    startDate: string,
    endDate: string,
    estimatedTime: string,
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/save/adjust`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          name,
          label,
          startDate,
          endDate,
          estimatedTime,
        }),
      });
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async adjustmentCalender(
    id: number,
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/timetable/adjustment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: id,
          startDate,
          endDate,
        }),
      });
      console.log(res);
      if (res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
}

export default CalenderDataSource;
