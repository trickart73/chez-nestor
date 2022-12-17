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
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Apartment } from '../entity/apartment.entity';
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { DeleteDTO } from '../dto/common.dto';

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
  async getAllClients(@Res() response: Response<any>): Promise<void> {
    try {
      response.send(await this.apartmentService.getAllApartments());
    } catch (error) {
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
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(await this.apartmentService.getApartmentByID(id));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Post('/createApartment')
  @ApiBody({
    type: [CreateApartmentDTO],
  })
  async createClient(
    @Body() body: any,
    @Res() response: Response<any>,
  ): Promise<void> {
    try {
      response.send(this.apartmentService.createApartment(body));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Put('/updateApartment')
  @ApiBody({
    type: UpdateApartmentDTO,
  })
  async updateApartment(
    @Body() body: any,
    @Res() response: Response<UpdateResult>,
  ): Promise<void> {
    try {
      response.send(await this.apartmentService.updateApartment(body));
    } catch (error) {
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
      response.send(await this.apartmentService.deleteApartment(body));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
