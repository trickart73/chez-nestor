import { Module } from '@nestjs/common';
import { ClientModule } from './client/client.module';
import { UserController } from './user/user.controller';

@Module({
  imports: [ClientModule],
  controllers: [UserController]
})
export class ApiModule {}
