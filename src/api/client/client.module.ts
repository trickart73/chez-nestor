import { Client } from '../entity/client.entity';
import { RoomModule } from './../room/room.module';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), RoomModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
