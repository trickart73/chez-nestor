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

  // public updateClient(id: number): Promise<Client> {
  //   return this.clientRepository.findOne({ where: { id: id } });
  // }

  // public getClientByName(
  //   firstName: string,
  //   lastName: string,
  // ): Promise<Client[]> {
  //   const findOptionsWhere: FindOptionsWhere<Client> = {};
  //   if (firstName !== '') {
  //     const firstNameILike: string = '%' + firstName + '%';
  //     findOptionsWhere.firstName = ILike(firstNameILike);
  //   }
  //   if (lastName !== '') {
  //     const lastNameILike: string = '%' + lastName + '%';
  //     findOptionsWhere.lastName = ILike(lastNameILike);
  //   }
  //   return this.clientRepository.find({
  //     where: findOptionsWhere,
  //   });
  // }

  public createApartment(body: CreateApartmentDTO): Promise<Apartment> {
    return this.apartmentRepository.save(body);
  }
}
