import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  ILike,
  Like,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Client } from '../entity/client.entity';
import {
  CreateClientDTO,
  DeleteClientDTO,
  UpdateClientDTO,
} from '../dto/client.dto';
import { CreateResultDTO } from '../dto/common.dto';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;

  public getAllClients(): Promise<Client[]> {
    return this.clientRepository.find({ order: { id: 'ASC' } });
  }

  public getClientByID(id: number): Promise<Client> {
    return this.clientRepository.findOne({
      where: { id: id },
      order: { id: 'ASC' },
    });
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

  async updateClient(body: UpdateClientDTO): Promise<UpdateResult> {
    const findCondition: FindOptionsWhere<Client> = {
      id: Equal(body.id),
    };
    return await this.clientRepository.update(findCondition, {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      birthDate: body.birthDate,
      nationality: body.nationality,
    });
  }

  async deleteClient(body: DeleteClientDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Client> = {
      id: Equal(body.id),
    };
    return await this.clientRepository.delete(findCondition);
  }
}
