class UserEntity {
  id: string;
  imageUrl: string;
  major: string;
  name: string;
  nickname: string;
  loginType: string;
  accessToken: string;

  constructor(
    id: string,
    imageUrl: string,
    major: string,
    name: string,
    nickname: string,
    loginType: string,
    accessToken: string,
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.major = major;
    this.name = name;
    this.nickname = nickname;
    this.loginType = loginType;
    this.accessToken = accessToken;
  }
}

export default UserEntity;
