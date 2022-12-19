import { CreateClientDTO, UpdateClientDTO } from '../dto/client.dto';
import { CreateResultDTO, DeleteDTO, UpdateResultDTO } from '../dto/common.dto';
import { Client } from '../entity/client.entity';
import { Room } from '../entity/room.entity';
import { RoomService } from '../room/room.service';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  Equal,
  FindOptionsWhere,
  ILike,
  Like,
  Repository,
} from 'typeorm';

@Injectable()
export class ClientService {
  @InjectRepository(Client)
  private readonly clientRepository: Repository<Client>;
  constructor(private readonly roomService: RoomService) {}

  async getAllClients(): Promise<Client[]> {
    return this.clientRepository.find({
      order: { id: 'ASC' },
      relations: ['fkRoom'],
    });
  }

  async getClientByID(id: number): Promise<Client> {
    return this.clientRepository.findOne({
      where: { id: id },
      order: { id: 'ASC' },
      relations: ['fkRoom'],
    });
  }

  async getClientByName(
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

  async findRoomByID(idRoom: number): Promise<Room> {
    let room: Room = null;
    if (idRoom !== undefined) {
      room = await this.roomService.getRoomByID(idRoom);
    }
    return room;
  }

  async findIfRoomAlreadyTaken(fkRoom: number): Promise<boolean> {
    let flag = false;
    const findOptionsWhere: FindOptionsWhere<Client> = {};
    findOptionsWhere.fkRoom = Equal(fkRoom);
    const clientWithThisRoom = await this.clientRepository.find({
      where: findOptionsWhere,
    });
    if (clientWithThisRoom.length > 0) {
      flag = true;
    }
    return flag;
  }

  async createClient(body: CreateClientDTO): Promise<CreateResultDTO> {
    const findIfEmailAlreadyUsed = await this.findIfEmailAlreadyUsed(
      body.email,
    );
    const associatedRoom: Room = await this.findRoomByID(body?.fkRoom);
    let findIfRoomAlreadyTaken = false;
    let bodyUpdateRoom = null;
    if (associatedRoom !== null) {
      findIfRoomAlreadyTaken = await this.findIfRoomAlreadyTaken(body?.fkRoom);
    }
    const bodySaveClient = {
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      birthDate: body.birthDate,
      nationality: body.nationality,
      fkRoom: associatedRoom,
    };

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
    } else if (findIfRoomAlreadyTaken) {
      const data = null;
      const success = false;
      const message = 'Wanted room already taken. Please choose an other one.';
      const bodyReturn = {
        success,
        data,
        message,
      };
      return bodyReturn;
    } else {
      const dataSaveClient = await this.clientRepository.save(bodySaveClient);

      bodyUpdateRoom = {
        id: body.fkRoom,
        number: associatedRoom.number,
        area: associatedRoom.area,
        price: associatedRoom.price,
        fkApartment: associatedRoom.fkApartment.id,
        fkClient: dataSaveClient.id,
      };
      await this.roomService.updateRoom(bodyUpdateRoom);

      const success = true;
      const message = `Client with email ${body.email} has been created`;
      const bodyReturn = {
        success,
        data: dataSaveClient,
        message,
      };
      return bodyReturn;
    }
  }

  async updateClient(body: UpdateClientDTO): Promise<UpdateResultDTO> {
    const findCondition: FindOptionsWhere<Client> = {
      id: Equal(body.id),
    };
    const client = await this.getClientByID(body.id);
    const currentRoomIDForClient = client?.fkRoom?.id;
    const idRoom = body.fkRoom;
    let associatedRoom: Room = null;
    const findIfRoomAlreadyTaken = await this.findIfRoomAlreadyTaken(idRoom);
    if (findIfRoomAlreadyTaken) {
      const updateResult = null;
      const message = 'Room already taken, please select another one.';
      const updateBody = {
        updateResult,
        message,
      };
      return updateBody;
    } else {
      if (currentRoomIDForClient !== undefined) {
        const bodyReleasedRoom = {
          id: currentRoomIDForClient,
          fkClient: null,
        };
        await this.roomService.updateRoom(bodyReleasedRoom);
      }

      associatedRoom = await this.findRoomByID(idRoom);
      const bodyUpdateRoom = {
        id: body.fkRoom,
        fkClient: body.id,
      };
      await this.roomService.updateRoom(bodyUpdateRoom);
      const updateResult = await this.clientRepository.update(findCondition, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        birthDate: body.birthDate,
        nationality: body.nationality,
        fkRoom: associatedRoom,
      });
      const message = `Entity client with id ${body.id} updated`;
      const updateBody = {
        updateResult,
        message,
      };
      return updateBody;
    }
  }

  async deleteClient(body: DeleteDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Client> = {
      id: Equal(body.id),
    };
    return await this.clientRepository.delete(findCondition);
  }
}
