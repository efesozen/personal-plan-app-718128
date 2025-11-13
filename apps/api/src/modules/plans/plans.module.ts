import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PlansRepository } from './plans.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plan]),
    DatabaseModule,
  ],
  controllers: [PlansController],
  providers: [PlansService, PlansRepository],
  exports: [PlansService],
})
export class PlansModule {}
