import { Module } from '@nestjs/common';
import { ConsultantService } from './consultant.service';
import { ConsultantController } from './consultant.controller';

@Module({
  controllers: [ConsultantController],
  providers: [ConsultantService],
})
export class ConsultantModule {}
