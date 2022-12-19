import { CreateClientDTO, UpdateClientDTO } from '../dto/client.dto';
import { CreateResultDTO } from '../dto/common.dto';
import { Client } from '../entity/client.entity';
import { DeleteDTO, UpdateResultDTO } from './../dto/common.dto';
import { ClientService } from './client.service';

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
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { DeleteResult } from 'typeorm';

@ApiTags('client')
@Controller('client')
export class ClientController {
  @Inject(ClientService)
  private readonly clientService: ClientService;

  @Get('/getAllClients')
  @ApiResponse({
    status: 200,
    description: 'Get all clients from DB',
    type: [Client],
  })
  async getAllClients(@Res() response: Response<Client[]>): Promise<void> {
    try {
      response.status(200).send(await this.clientService.getAllClients());
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/getClientByID')
  @ApiResponse({
    status: 200,
    description: 'Get a client by id',
    type: Client,
  })
  async getClientByID(
    @Query('id') id: number,
    @Res() response: Response<Client>,
  ): Promise<void> {
    try {
      response.status(200).send(await this.clientService.getClientByID(id));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/getClientByName')
  @ApiResponse({
    status: 200,
    description: 'Get a client by name (first & last)',
    type: [Client],
  })
  @ApiQuery({
    name: 'firstName',
    type: 'string',
    example: 'Nestor',
    required: false,
  })
  @ApiQuery({
    name: 'lastName',
    type: 'string',
    example: 'Tintin',
    required: false,
  })
  async getClientByName(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Res() response: Response<Client[]>,
  ): Promise<void> {
    try {
      response
        .status(200)
        .send(await this.clientService.getClientByName(firstName, lastName));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/createClient')
  @ApiBody({
    type: CreateClientDTO,
  })
  async createClient(
    @Body() body: any,
    @Res() response: Response<CreateResultDTO>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.clientService.createClient(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/updateClient')
  @ApiBody({
    type: UpdateClientDTO,
  })
  async updateClient(
    @Body() body: any,
    @Res() response: Response<UpdateResultDTO>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.clientService.updateClient(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/deleteClient')
  @ApiBody({
    type: DeleteDTO,
  })
  async deleteClient(
    @Body() body: any,
    @Res() response: Response<DeleteResult>,
  ): Promise<void> {
    try {
      response.status(201).send(await this.clientService.deleteClient(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
