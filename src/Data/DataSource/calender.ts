import { SERVER_URL, DATA_URL } from "@/Const";
import { EveryTimeResponseType } from "@/Data/Model";
import { CalenderEntity } from "@/Domain/Entity";
class CalenderDataSource {
  static async getET(
    id: string,
    password: string,
  ): Promise<EveryTimeResponseType> {
    try {
      const urlencoded = new URLSearchParams();
      urlencoded.append("id", id);
      urlencoded.append("password", password);
      const res = await fetch(`${DATA_URL}/everytime/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlencoded
      });
      const d = await res.json();
      const data: EveryTimeResponseType = d.data;
      return data;
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }

  static async getCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<CalenderEntity> {
    try {
      const res = await fetch(`${SERVER_URL}/timetable/period?startDate=${startDate}&endDate=${endDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });

      if (res.status === 200) {
        const r = await res.json();
        const data: CalenderEntity = r;
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
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
      const res = await fetch(`${SERVER_URL}/job/save/adjust`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "name": name,
          "label": label,
          "startDate": startDate,
          "endDate": endDate,
          "estimatedTime": estimatedTime
      
        }),
      });
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async saveFiexdCalender(
    accessToken: string,
    name: string,
    label: number,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    shouldClear: boolean
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/job/save/fix`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          "name": name,
          "label": label,
          "startDate": startDate,
          "endDate": endDate,
          "startTime": startTime,
          "endTime": endTime,
          "shouldClear": shouldClear
  
        })
      });
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
        return Promise.reject(500);
    }
    
  }
  static async adjustmentCalender(
    accessToken: string,
    startDate: string,
    endDate: string,
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/timetable/adjustment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          startDate,
          endDate,
        }),
      });
      const r = await res.json();
      console.log(r);
      if (res.status !== 200) return Promise.reject(res.status);
    } catch (error) { 
      console.log(error);
      return Promise.reject(500);
    }
  }

  static async deleteCalender(
    accessToken: string,
    id: number,
  ): Promise<void>{
    try {
      const res = await fetch(`${SERVER_URL}/job/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async completCalender(
    accessToken: string,
    id: number,
    completion : number
  ): Promise<void>{
    try {
      const res = await fetch(`${SERVER_URL}/job/complete/${id}?completion=${completion}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(res);
      if(res.status !== 200) {
        return Promise.reject(res.status);}
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async fixCalender(
    accessToken: string,
    id:number
  ): Promise<void> {
    try {
      const res = await fetch(`${SERVER_URL}/job/fix/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(res);
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async setTimeTable(
    accessToken: string,
    data: EveryTimeResponseType
  ): Promise<void> {
    try {
      const res =  await fetch(`${SERVER_URL}/everytime/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify([data])
      });
      console.log(res);
    } catch (error) {
      return Promise.reject(500);
    }
  }
}

export default CalenderDataSource;
