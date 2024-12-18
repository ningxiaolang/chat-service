import { UserService } from '@/modules/user/user.service';
import { verifyPassword } from '@/utils/bcrypt';
import { R } from '@/utils/error';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * 验证用户是否存在
   */
  async validateAuth(email: string, password: string) {
    const auth = await this.userService.findUserByEmail(email);
    if (!auth) throw R.NotFound('账号不存在');
    const isPassword = verifyPassword(password, auth.password);
    if (!isPassword) throw R.BadRequest('密码错误');
    return auth;
  }

  /**
   * 登录
   * @param email
   * @param password
   * @returns
   */
  async login(email: string, password: string) {
    const auth = await this.validateAuth(email, password);
    const payload = { email, password };
    return {
      token: this.jwtService.sign(payload),
      ...auth,
    };
  }
}
