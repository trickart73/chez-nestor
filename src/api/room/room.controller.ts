import { UpdateResultDTO } from './../dto/common.dto';
import { RoomService as RoomService } from './room.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Room } from '../entity/room.entity';
import { CreateRoomDTO, UpdateRoomDTO } from '../dto/room.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DeleteDTO } from '../dto/common.dto';

@ApiTags('room')
@Controller('room')
export class RoomController {
  @Inject(RoomService)
  private readonly roomService: RoomService;

  @Get('/getAllRooms')
  @ApiResponse({
    status: 200,
    description: 'Get all rooms from DB',
    type: [Room],
  })
  async getAllClients(@Res() response: Response<Room[]>): Promise<void> {
    try {
      response.status(20).send(await this.roomService.getAllRooms());
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/getRoomByID')
  @ApiResponse({
    status: 200,
    description: 'Get a room by id',
    type: Room,
  })
  async getRoomByID(
    @Query('id') id: number,
    @Res() response: Response<Room>,
  ): Promise<void> {
    try {
      response.status(200).send(await this.roomService.getRoomByID(id));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/createRoom')
  @ApiBody({
    type: CreateRoomDTO,
  })
  async createRoom(
    @Body() body: any,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.roomService.createRoom(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/updateRoom')
  @ApiBody({
    type: UpdateRoomDTO,
  })
  async updateClient(
    @Body() body: any,
    @Res() response: Response<UpdateResultDTO>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.roomService.updateRoom(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/deleteRoom')
  @ApiBody({
    type: DeleteDTO,
  })
  async deleteClient(
    @Body() body: any,
    @Res() response: Response<DeleteResult>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.roomService.deleteRoom(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
