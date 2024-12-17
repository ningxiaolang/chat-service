import * as bcrypt from 'bcryptjs';

// 密码加密
export const encryptPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

// 验证密码
export const verifyPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

// // 生成token
// export const generateToken = (payload: any) => {
//   return jwt.sign(payload, secret, { expiresIn: '1h' });
// };

// // 验证token
// export const verifyToken = (token: string) => {
//   return jwt.verify(token, secret);
// };
