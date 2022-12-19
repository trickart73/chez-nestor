import { ClientService } from './../client/client.service';
import { Client } from './../entity/client.entity';
import { Apartment } from './../entity/apartment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Room } from '../entity/room.entity';
import { ApartmentService } from '../apartment/apartment.service';
import { CreateRoomDTO, UpdateRoomDTO } from '../dto/room.dto';
import { DeleteDTO } from '../dto/common.dto';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private roomRepository: Repository<Room>;
  @InjectRepository(Client)
  private clientRepository: Repository<Client>;
  constructor(private readonly apartmentService: ApartmentService) {}

  public getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({
      order: { id: 'ASC' },
      relations: ['fkApartment'],
    });
  }

  public getRoomByID(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id: id },
      relations: ['fkApartment'],
    });
  }

  async createRoom(body: CreateRoomDTO): Promise<Room> {
    const idApartment = body.fkApartment;
    let apartment: Apartment = null;
    if (idApartment !== undefined) {
      apartment = await this.apartmentService.getApartmentByID(idApartment);
    }
    const finalBody = {
      number: body.number,
      area: body.area,
      price: body.price,
      fkApartment: apartment,
    };
    return this.roomRepository.save(finalBody);
  }

  async updateRoom(body: UpdateRoomDTO): Promise<UpdateResult> {
    const findCondition: FindOptionsWhere<Room> = {
      id: Equal(body.id),
    };
    const idApartment = body.fkApartment;
    const idClient = body.fkClient;
    console.log('idClient', idClient);
    let apartment: Apartment = null;
    let client: Client = null;
    if (idApartment !== null) {
      apartment = await this.apartmentService.getApartmentByID(idApartment);
    }
    if (idClient !== undefined && idClient !== null) {
      client = await this.getClientByID(idClient);
    }
    console.log('client', client);
    return await this.roomRepository.update(findCondition, {
      number: body.number,
      area: body.area,
      price: body.price,
      fkApartment: apartment,
      fkClient: client,
    });
  }

  async getClientByID(id: number): Promise<Client> {
    const clientFound = await this.clientRepository.findOne({
      where: { id: id },
      order: { id: 'ASC' },
    });
    return clientFound;
  }

  async deleteRoom(body: DeleteDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Room> = {
      id: Equal(body.id),
    };
    return await this.roomRepository.delete(findCondition);
  }
}
