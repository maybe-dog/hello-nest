import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from 'src/accounts/core/entity/account.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Account, (user) => user.posts)
  user: Account;
}
