class UserEntity {
  id: string;
  imageUrl: string;
  major: string;
  name: string;
  nickname: string;
  password: string;
  university: string;

  constructor(
    id: string,
    imageUrl: string,
    major: string,
    name: string,
    nickname: string,
    password: string,
    university: string
  ) {
    this.id = id;
    this.imageUrl = imageUrl;
    this.major = major;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.university = university;
  }
}

export default UserEntity;
