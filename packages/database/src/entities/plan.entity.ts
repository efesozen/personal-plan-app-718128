import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { User } from './user.entity';

@Entity({ name: 'plans' })
export class Plan extends BaseEntity {
  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;


@Column({ name: 'user_id' })
  userId!: string;

  @Index('idx_plans_user_id')
  @ManyToOne('User', 'plans')
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
