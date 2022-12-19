import { Room } from '../entity/room.entity';
import { ApartmentModule } from './../apartment/apartment.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from '../entity/client.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    TypeOrmModule.forFeature([Client]),
    ApartmentModule,
  ],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
