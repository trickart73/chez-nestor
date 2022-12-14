import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Client } from '../entity/client.entity';
import { CreateClientDTO } from './client.dto';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;

  public getClientByID(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id: id } });
  }

  public getClientByName(
    firstName: string,
    lastName: string,
  ): Promise<Client[]> {
    const findOptionsWhere: FindOptionsWhere<Client> = {};
    if (firstName !== '') {
      const firstNameILike: string = '%' + firstName + '%';
      findOptionsWhere.firstName = ILike(firstNameILike);
    }
    if (lastName !== '') {
      const lastNameILike: string = '%' + lastName + '%';
      findOptionsWhere.lastName = ILike(lastNameILike);
    }
    return this.clientRepository.find({
      where: findOptionsWhere,
    });
  }

  public createClient(body: CreateClientDTO): Promise<Client> {
    return this.clientRepository.save(body);
  }
}
