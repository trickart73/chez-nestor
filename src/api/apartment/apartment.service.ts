import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CreateApartmentDTO, UpdateApartmentDTO } from '../dto/apartment.dto';
import { DeleteDTO } from '../dto/common.dto';
import { Apartment } from '../entity/apartment.entity';

@Injectable()
export class ApartmentService {
  @InjectRepository(Apartment)
  private readonly apartmentRepository: Repository<Apartment>;

  public getAllApartments(): Promise<Apartment[]> {
    return this.apartmentRepository.find({ order: { id: 'ASC' } });
  }

  public getApartmentByID(id: number): Promise<Apartment> {
    return this.apartmentRepository.findOne({
      where: { id: id },
      relations: ['room'],
    });
  }

  public createApartment(body: CreateApartmentDTO): Promise<Apartment> {
    return this.apartmentRepository.save(body);
  }

  async updateApartment(body: UpdateApartmentDTO): Promise<UpdateResult> {
    const findCondition: FindOptionsWhere<Apartment> = {
      id: Equal(body.id),
    };
    return await this.apartmentRepository.update(findCondition, {
      name: body.name,
      street: body.street,
      zipCode: body.zipCode,
      city: body.city,
    });
  }

  async deleteApartment(body: DeleteDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Apartment> = {
      id: Equal(body.id),
    };
    return await this.apartmentRepository.delete(findCondition);
  }
}
