import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateApartmentDTO } from '../dto/apartment.dto';
import { Apartment } from '../entity/apartment.entity';

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
