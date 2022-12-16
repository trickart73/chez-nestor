import { ApartmentModule } from './apartment/apartment.module';
import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { RoomModule } from './room/room.module';

@Module({
  imports: [ClientModule, ApartmentModule, RoomModule],
})
export class ApiModule {}
