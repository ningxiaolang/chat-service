declare global {
  interface IAuthUser {
    uid: number;
    pv: number;
    /** 过期时间 */
    exp?: number;
    /** 签发时间 */
    iat?: number;
    roles?: string[];
  }
}

export {};
