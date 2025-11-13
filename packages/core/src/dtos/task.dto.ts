import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @IsUUID()
  planId!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsBoolean()
  isCompleted!: boolean;

  @IsOptional()
  @IsDate()
  dueDate?: Date;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsUUID()
  planId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean | undefined;

  @IsOptional()
  @IsOptional()
  @IsDate()
  dueDate?: Date | undefined;
}

export class TaskResponseDto {
  id!: string;
  planId!: string;
  title!: string;
  isCompleted!: boolean;
  dueDate?: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
