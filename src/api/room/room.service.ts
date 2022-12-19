import { ApartmentService } from '../apartment/apartment.service';
import { DeleteDTO } from '../dto/common.dto';
import { CreateRoomDTO, UpdateRoomDTO } from '../dto/room.dto';
import { Room } from '../entity/room.entity';
import { CreateResultDTO, UpdateResultDTO } from './../dto/common.dto';
import { Apartment } from './../entity/apartment.entity';
import { Client } from './../entity/client.entity';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Equal, FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private roomRepository: Repository<Room>;
  @InjectRepository(Client)
  private clientRepository: Repository<Client>;
  constructor(private readonly apartmentService: ApartmentService) {}

  async getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({
      order: { id: 'ASC' },
      relations: ['fkApartment'],
    });
  }

  async getRoomByID(id: number): Promise<Room> {
    return this.roomRepository.findOne({
      where: { id: id },
      relations: ['fkApartment'],
    });
  }

  async createRoom(body: CreateRoomDTO): Promise<CreateResultDTO> {
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

    const data = await this.roomRepository.save(finalBody);
    const success = true;
    const message = `Room with number ${body.number} in apartment ${body.fkApartment} has been created`;
    const bodyReturn = {
      success,
      data: data,
      message,
    };
    return bodyReturn;
  }

  async updateRoom(body: UpdateRoomDTO): Promise<UpdateResultDTO> {
    const findCondition: FindOptionsWhere<Room> = {
      id: Equal(body.id),
    };
    const idApartment = body.fkApartment;
    const idClient = body.fkClient;
    let apartment: Apartment = null;
    let client: Client = null;
    if (idApartment !== null) {
      apartment = await this.apartmentService.getApartmentByID(idApartment);
    }
    if (idClient !== undefined && idClient !== null) {
      client = await this.getClientByID(idClient);
    }

    const updateResult = await this.roomRepository.update(findCondition, {
      number: body.number,
      area: body.area,
      price: body.price,
      fkApartment: apartment,
      fkClient: client,
    });
    const message = `Entity room with id ${body.id} updated`;
    const updateBody = {
      updateResult,
      message,
    };
    return updateBody;
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
