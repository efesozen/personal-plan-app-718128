import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreatePlanDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdatePlanDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  title?: string | undefined;

  @IsOptional()
  @IsOptional()
  @IsString()
  description?: string | undefined;
}

export class PlanResponseDto {
  id!: string;
  userId!: string;
  title!: string;
  description?: string;
  createdAt!: Date;
  updatedAt!: Date;
}
