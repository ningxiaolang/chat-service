import { CommonEntity } from '@/common/entity/common.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

@Entity('sys_user')
export class UserEntity extends CommonEntity {
  @ApiProperty({ description: '用户名' })
  @Column({ comment: '用户名' })
  username: string;

  @ApiProperty({ description: '密码' })
  @Column({ comment: '密码' })
  password: string;

  @ApiProperty({ description: '邮箱' })
  @Column({ comment: '邮箱' })
  email: string;
}
