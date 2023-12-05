import { AuthRepository } from '@/Domain/Repository';

type UserDataType = {
  id: string | null | undefined;
  imageUrl: string | null | undefined;
  major: string | null | undefined;
  name: string | null | undefined;
  nickname: string | null | undefined;
  password: string | null | undefined;
  university: string | null | undefined;
};

class SignUpUseCase {
  private authRepository: AuthRepository;

  constructor(ar: AuthRepository) {
    this.authRepository = ar;
  }

  async execute({
    id,
    imageUrl,
    major,
    name,
    nickname,
    password,
    university,
  }: UserDataType) {
    if (
      typeof id !== 'string' ||
      typeof imageUrl !== 'string' ||
      typeof major !== 'string' ||
      typeof name !== 'string' ||
      typeof nickname !== 'string' ||
      typeof password !== 'string' ||
      typeof university !== 'string'
    ) {
      return Promise.reject(400);
    }
    try {
      const data = await this.authRepository.signUp({
        id,
        imageUrl,
        major,
        name,
        nickname,
        password,
        university,
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default SignUpUseCase;
