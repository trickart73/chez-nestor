import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entity/client.entity';
import { CreateClientDTO } from './client.dto';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;

  public getClient(id: number): Promise<Client> {
    return this.clientRepository.findOne({ where: { id: id } });
  }

  public createClient(body: CreateClientDTO): Promise<Client> {
    return this.clientRepository.save(body);
  }
}
