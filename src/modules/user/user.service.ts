import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { encryptPassword } from '@/utils/bcrypt';
import { RegisterDto } from '@/modules/auth/dto/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {}

  findUserByEmail(email: string) {
    return this.UserRepository.findOneBy({ email });
  }

  findUserByUsername(username: string) {
    return this.UserRepository.findOne({ where: { username } });
  }

  /**
   * 增加系统用户，如果返回false则表示已存在该用户
   */
  async create(createUserDto: CreateUserDto) {
    const { email, username, password } = createUserDto;
    const isUsername = await this.findUserByUsername(username);
    if (isUsername) {
      throw new ConflictException('用户名已存在');
    }
    const isEmail = await this.findUserByEmail(email);
    if (isEmail) {
      throw new ConflictException('邮箱已存在');
    }
    createUserDto.password = await encryptPassword(password);

    const newUser = await this.UserRepository.save(createUserDto);
    return newUser;
  }

  /**
   * 注册
   */
  async register(RegisterDto: RegisterDto) {
    const { email, username, password } = RegisterDto;
    const isUsername = await this.findUserByUsername(username);
    if (isUsername) {
      throw new ConflictException('用户名已存在');
    }
    const isEmail = await this.findUserByEmail(email);
    if (isEmail) {
      throw new ConflictException('邮箱已存在');
    }
    RegisterDto.password = await encryptPassword(password);

    const newUser = await this.UserRepository.save(RegisterDto);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id}${updateUserDto} user`;
  }

  delete(id: number) {
    return `This action removes a #${id} user`;
  }
}
