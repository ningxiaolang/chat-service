import { UserService } from '@/modules/user/user.service';
import { verifyPassword } from '@/utils/bcrypt';
import { R } from '@/utils/error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw R.NotFound('账号不存在');
    const isPassword = verifyPassword(password, user.password);
    if (!isPassword) throw R.BadRequest('密码错误');
    return user;
  }
}
