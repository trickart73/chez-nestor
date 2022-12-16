import { ApartmentModule } from './../apartment/apartment.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../entity/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [TypeOrmModule.forFeature([Room]), ApartmentModule],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
