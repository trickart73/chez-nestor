import { UpdateResultDTO } from './../dto/common.dto';
import { ApartmentService } from './apartment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Apartment } from '../entity/apartment.entity';
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateResultDTO, DeleteDTO } from '../dto/common.dto';

@ApiTags('apartment')
@Controller('apartment')
export class ApartmentController {
  @Inject(ApartmentService)
  private readonly apartmentService: ApartmentService;

  @Get('/getAllApartments')
  @ApiResponse({
    status: 200,
    description: 'Get all clients from DB',
    type: [Apartment],
  })
  async getAllClients(@Res() response: Response<Apartment[]>): Promise<void> {
    try {
      response.status(200).send(await this.apartmentService.getAllApartments());
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Get('/getApartmentByID')
  @ApiResponse({
    status: 200,
    description: 'Get a apartment by id',
    type: Apartment,
  })
  async getApartmentByID(
    @Query('id') id: number,
    @Res() response: Response<Apartment>,
  ): Promise<void> {
    try {
      response
        .status(200)
        .send(await this.apartmentService.getApartmentByID(id));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/createApartment')
  @ApiBody({
    type: CreateApartmentDTO,
  })
  @ApiResponse({
    status: 201,
    description: 'Create apartment by body',
    type: Apartment,
  })
  async createClient(
    @Body() body: any,
    @Res() response: Response<CreateResultDTO>,
  ): Promise<void> {
    try {
      response
        .status(201)
        .send(await this.apartmentService.createApartment(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/updateApartment')
  @ApiBody({
    type: UpdateApartmentDTO,
  })
  async updateApartment(
    @Body() body: any,
    @Res() response: Response<UpdateResultDTO>,
  ): Promise<void> {
    try {
      response
        .status(201)
        .send(await this.apartmentService.updateApartment(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/deleteApartment')
  @ApiBody({
    type: DeleteDTO,
  })
  async deleteApartment(
    @Body() body: any,
    @Res() response: Response<DeleteResult>,
  ): Promise<void> {
    try {
      response
        .status(201)
        .send(await this.apartmentService.deleteApartment(body));
    } catch (error) {
      response.status(401).send(error.message);
      throw new InternalServerErrorException(error.message);
    }
  }
}
