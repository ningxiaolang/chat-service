import { dateTransformer } from '@/utils/date-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';

export class CommonEntity {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @CreateDateColumn({
    name: 'created_at',
    comment: '创建时间',
    transformer: dateTransformer,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    comment: '更新时间',
    transformer: dateTransformer,
  })
  updatedAt: Date;
}

export abstract class CompleteEntity extends CommonEntity {
  @ApiHideProperty()
  @Exclude()
  @Column({
    name: 'create_by',
    update: false,
    comment: '创建者',
    nullable: true,
  })
  createBy: number;

  @ApiHideProperty()
  @Exclude()
  @Column({ name: 'update_by', comment: '更新者', nullable: true })
  updateBy: number;

  /**
   * 不会保存到数据库中的虚拟列，数据量大时可能会有性能问题，有性能要求请考虑在 service 层手动实现
   * @see https://typeorm.io/decorator-reference#virtualcolumn
   */
  @ApiProperty({ description: '创建者' })
  @VirtualColumn({
    query: (alias: any) =>
      `SELECT username FROM sys_user WHERE id = ${alias}.create_by`,
  })
  creator: string;

  @ApiProperty({ description: '更新者' })
  @VirtualColumn({
    query: (alias: any) =>
      `SELECT username FROM sys_user WHERE id = ${alias}.update_by`,
  })
  updater: string;
}
