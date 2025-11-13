import { type MigrationInterface, type QueryRunner, Table, TableIndex, TableForeignKey } from 'typeorm';

export class CreateTaskTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tasks',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'plan_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_completed',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'due_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'now()',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          }
        ],
      }),
      true
    );


    await queryRunner.createForeignKey(
      'tasks',
      new TableForeignKey({
        name: 'fk_tasks_plan_id',
        columnNames: ['plan_id'],
        referencedTableName: 'plans',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
      })
    );

    await queryRunner.createIndex(
      'tasks',
      new TableIndex({
        name: 'idx_tasks_plan_id',
        columnNames: ['plan_id'],
      })
    );

    await queryRunner.createIndex(
      'tasks',
      new TableIndex({
        name: 'idx_tasks_plan_id',
        columnNames: ['plan_id'],
      })
    );

    await queryRunner.createIndex(
      'tasks',
      new TableIndex({
        name: 'idx_tasks_due_date',
        columnNames: ['due_date'],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('tasks', 'idx_tasks_plan_id');
    await queryRunner.dropIndex('tasks', 'idx_tasks_due_date');
    await queryRunner.dropForeignKey('tasks', 'fk_tasks_plan_id');
    await queryRunner.dropTable('tasks');
  }
}
