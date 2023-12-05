import { UserEntity } from '@/Domain/Entity';

interface UserRepository {
  info(token: string): Promise<UserEntity>;
  changeProfile(token: string, image: string): Promise<void>; // 수정해야함
}

export default UserRepository;
