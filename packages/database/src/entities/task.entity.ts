import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import type { Plan } from './plan.entity';

@Entity({ name: 'tasks' })
export class Task extends BaseEntity {
  @Column()
  title!: string;

  @Column({ type: 'boolean', default: false, name: 'is_completed' })
  isCompleted!: boolean;

  @Column({ type: 'timestamp with time zone', nullable: true, name: 'due_date' })
  @Index('idx_tasks_due_date')
  dueDate?: Date;


@Column({ name: 'plan_id' })
  planId!: string;

  @Index('idx_tasks_plan_id')
  @ManyToOne('Plan', 'tasks')
  @JoinColumn({ name: 'plan_id' })
  plan!: Plan;
}
