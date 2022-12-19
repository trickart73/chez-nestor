import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto';
import { DeleteDTO } from '../dto/common.dto';
import { Apartment } from '../entity/apartment.entity';
import { CreateResultDTO, UpdateResultDTO } from './../dto/common.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Equal, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class ApartmentService {
  @InjectRepository(Apartment)
  private readonly apartmentRepository: Repository<Apartment>;

  async getAllApartments(): Promise<Apartment[]> {
    return this.apartmentRepository.find({
      order: { id: 'ASC' },
      relations: ['room'],
    });
  }

  async getApartmentByID(id: number): Promise<Apartment> {
    return this.apartmentRepository.findOne({
      where: { id: id },
      relations: ['room'],
    });
  }

  async createApartment(body: CreateApartmentDTO): Promise<CreateResultDTO> {
    const data = await this.apartmentRepository.save(body);
    const success = true;
    const message = `Apartment with name ${body.name} has been created`;
    const bodyReturn = {
      success,
      data: data,
      message,
    };
    return bodyReturn;
  }

  async updateApartment(body: UpdateApartmentDTO): Promise<UpdateResultDTO> {
    const findCondition: FindOptionsWhere<Apartment> = {
      id: Equal(body.id),
    };

    const updateResult = await this.apartmentRepository.update(findCondition, {
      name: body.name,
      street: body.street,
      zipCode: body.zipCode,
      city: body.city,
    });
    const message = `Entity apartment with id ${body.id} updated`;
    const updateBody = {
      updateResult,
      message,
    };
    return updateBody;
  }

  async deleteApartment(body: DeleteDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Apartment> = {
      id: Equal(body.id),
    };
    return await this.apartmentRepository.delete(findCondition);
  }
}
