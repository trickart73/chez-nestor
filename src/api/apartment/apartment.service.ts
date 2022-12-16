import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Apartment } from '../entity/apartment.entity';
import { Client } from '../entity/client.entity';
import { CreateApartmentDTO } from './apartment.dto';

@Injectable()
export class ApartmentService {
  @InjectRepository(Apartment)
  private readonly apartmentRepository: Repository<Apartment>;

  public getApartmentByID(id: number): Promise<Apartment> {
    return this.apartmentRepository.findOne({
      where: { id: id },
      relations: ['room'],
    });
  }

  public createApartment(body: CreateApartmentDTO): Promise<Apartment> {
    return this.apartmentRepository.save(body);
  }
}
