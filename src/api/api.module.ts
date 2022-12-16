import { ApartmentModule } from './apartment/apartment.module';
import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';

@Module({
  imports: [ClientModule, ApartmentModule],
})
export class ApiModule {}
