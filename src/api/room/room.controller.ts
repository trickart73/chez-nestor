import { RoomService as RoomService } from './room.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Room } from '../entity/room.entity';
import { CreateRoomDTO } from '../dto/room.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  @Inject(RoomService)
  private readonly roomService: RoomService;

  @Get('/getRoomByID')
  @ApiResponse({
    status: 200,
    description: 'Get a room by id',
    type: Room,
  })
  async getRoomByID(
    @Query('id') id: number,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(await this.roomService.getRoomByID(id));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/')
  @ApiBody({
    type: CreateRoomDTO,
  })
  async createRoom(
    @Body() body: any,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(this.roomService.createRoom(body));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
