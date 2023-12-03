class UserEntity {
  private id: string;
  private imageUrl: string;
  private major: string;
  private name: string;
  private nickname: string;
  private password: string;
  private university: string;

  constructor(
    id: string,
    imageUrl: string,
    major: string,
    name: string,
    nickname: string,
    password: string,
    university: string
  ){
    this.id = id;
    this.imageUrl = imageUrl;
    this.major = major;
    this.name = name;
    this.nickname = nickname;
    this.password = password;
    this.university = university;
  }
};

export default UserEntity;