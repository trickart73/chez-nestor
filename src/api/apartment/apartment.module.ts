import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apartment } from '../entity/apartment.entity';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Apartment])],
  controllers: [ApartmentController],
  providers: [ApartmentService],
})
export class ApartmentModule {}
