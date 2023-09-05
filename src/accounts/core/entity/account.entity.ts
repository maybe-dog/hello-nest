import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from 'src/post/core/entity/post.entity';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  @Exclude()
  @ApiHideProperty()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude()
  @ApiHideProperty()
  salt: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at: Date;

  @OneToMany(() => Post, (post) => post.user)
  @Exclude()
  @ApiHideProperty()
  posts: Post[];
}
