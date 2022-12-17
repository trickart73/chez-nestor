import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsWhere,
  ILike,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Client } from '../entity/client.entity';
import { CreateClientDTO, UpdateClientDTO } from '../dto/client.dto';
import { CreateResultDTO } from '../dto/common.dto';

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

  async findIfEmailAlreadyUsed(email: string): Promise<boolean> {
    let flag = false;
    console.log('email', email);
    const findOptionsWhere: FindOptionsWhere<Client> = {};
    findOptionsWhere.email = Like(email);
    const clientFounded = await this.clientRepository.find({
      where: findOptionsWhere,
    });
    if (clientFounded.length > 0) {
      flag = true;
    }
    return flag;
  }

  // public updateClient(body: UpdateClientDTO): Promise<UpdateResult> {
  //   return this.clientRepository.update(body);
  // }

  async createClient(body: CreateClientDTO): Promise<CreateResultDTO> {
    const findIfEmailAlreadyUsed = await this.findIfEmailAlreadyUsed(
      body.email,
    );
    if (findIfEmailAlreadyUsed) {
      const data = null;
      const success = false;
      const message = 'Wanted email already taken. Please choose an other one.';
      const bodyReturn = {
        success,
        data,
        message,
      };
      return bodyReturn;
    } else {
      const data = await this.clientRepository.save(body);
      const success = true;
      const message = `Client with email ${body.email} has been created`;
      const bodyReturn = {
        success,
        data,
        message,
      };
      return bodyReturn;
    }
  }
}
