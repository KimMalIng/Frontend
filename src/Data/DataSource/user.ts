import { SERVER_URL } from "@/Const";

class UserDataSource {
  static async delete(accessToken: string, id: string): Promise<void>{
    try {
      const res = await fetch(`${SERVER_URL}/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        }
      });
      console.log(res);
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
  static async update(accessToken: string, memberId: string, memberPw: string, name: string, nickname: string){
    try {
      const formData = new FormData();
      formData.append("memberId", memberId);
      formData.append("memberPw", memberPw);
      formData.append("name", name);
      formData.append("nickname", nickname);

      const res = await fetch(`${SERVER_URL}/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`
        },
        body:formData,
        redirect: "follow"
      });
      const json = await res.json();
      console.log(json);
      if(res.status !== 200) return Promise.reject(res.status);
    } catch (error) {
      console.log(error);
      return Promise.reject(500);
    }
  }
};

export default UserDataSource;