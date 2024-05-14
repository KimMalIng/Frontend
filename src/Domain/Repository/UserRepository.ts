interface UserRepository {
  delete(accessToken: string, id: string): Promise<void>;
  update(accessToken: string, memberId: string, memberPw: string, name: string, nickname: string): Promise<void>;
}

export default UserRepository;
