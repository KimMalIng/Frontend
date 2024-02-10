import { SERVER_URL } from '@/Const';
import { UserDataType } from '@/Data/Model';

class AuthDataSource {
  static async login(id: string, password: string): Promise<UserDataType> {
    try {
      const res = await fetch(`${SERVER_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          id,
          password,
        }),
      });
      if (res.status === 200) {
        const data: UserDataType = await res.json();
        return data;
      } 
      return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
  static async signup(data: UserDataType): Promise<UserDataType> {
    try {
      const formData = new FormData();
      formData.append('userId', data.id);
      formData.append('userPw', data.password);
      formData.append('name', data.name);
      formData.append('nickname', data.nickname);
      formData.append('university', data.university);
      formData.append('major', data.major);
      // file 추가 해야함
      const res = await fetch(`${SERVER_URL}/users/join`, {
        method: 'POST',
        headers: {
          // "Content-Type": "multipart/form-data"
        },
        body: formData,
      });
      if (res.status === 200) {
        const data: UserDataType = await res.json();
        return data;
      }
      return Promise.reject(res.status);
    } catch (error) {
      return Promise.reject(500);
    }
  }
}

export default AuthDataSource;
