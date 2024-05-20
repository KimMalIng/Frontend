class UserEntity {
  memberId: string;
  memberPw: string;
  imageUrl: string;
  name: string;
  nickname: string;
  loginType: string;
  accessToken: string;

  constructor(
    memberId: string,
    memeberPw: string,
    imageUrl: string,
    name: string,
    nickname: string,
    loginType: string,
    accessToken: string,
  ) {
    this.memberId = memberId;
    this.memberPw = memeberPw;
    this.imageUrl = imageUrl;
    this.name = name;
    this.nickname = nickname;
    this.loginType = loginType;
    this.accessToken = accessToken;
  }
}

export default UserEntity;
