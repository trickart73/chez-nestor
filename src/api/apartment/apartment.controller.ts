import { ApartmentService } from './apartment.service';
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
import { Response } from 'express';
import { Apartment } from '../entity/apartment.entity';
import { CreateApartmentDTO } from '../dto/apartment.dto';

@ApiTags('apartment')
@Controller('apartment')
export class ApartmentController {
  @Inject(ApartmentService)
  private readonly apartmentService: ApartmentService;

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

  // @Get('/getClientByName')
  // @ApiResponse({
  //   status: 200,
  //   description: 'Get a client by name (first & last)',
  //   type: [Client],
  // })
  // @ApiQuery({
  //   name: 'firstName',
  //   type: 'string',
  //   example: 'Nestor',
  //   required: false,
  // })
  // @ApiQuery({
  //   name: 'lastName',
  //   type: 'string',
  //   example: 'Tintin',
  //   required: false,
  // })
  // async getClientByName(
  //   @Query('firstName') firstName: string,
  //   @Query('lastName') lastName: string,
  //   @Res() response: Response<any>,
  // ): Promise<void> {
  //   try {
  //     response.send(
  //       await this.apartmentService.getClientByName(firstName, lastName),
  //     );
  //   } catch (error) {
  //     throw new InternalServerErrorException(error.message);
  //   }
  // }

  @Post('/')
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
}
