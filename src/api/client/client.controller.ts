import { CreateClientDTO } from '../dto/client.dto';
import { ClientService } from './client.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from '../entity/client.entity';
import { Response } from 'express';
import { CreateResultDTO } from '../dto/common.dto';

@ApiTags('client')
@Controller('client')
export class ClientController {
  @Inject(ClientService)
  private readonly clientService: ClientService;

  @Get('/getClientByID')
  @ApiResponse({
    status: 200,
    description: 'Get a client by id',
    type: Client,
  })
  async getClientByID(
    @Query('id') id: number,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(await this.clientService.getClientByID(id));
    } catch (error) {
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
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(
        await this.clientService.getClientByName(firstName, lastName),
      );
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/')
  @ApiBody({
    type: CreateClientDTO,
  })
  async createClient(
    @Body() body: any,
    @Res() response: Response<CreateResultDTO>,
  ): Promise<void> {
    try {
      response.send(await this.clientService.createClient(body));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
