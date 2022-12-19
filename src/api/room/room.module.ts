import { ApartmentModule } from './../apartment/apartment.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from '../entity/room.entity';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { ClientModule } from '../client/client.module';
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
