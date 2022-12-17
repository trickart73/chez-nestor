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
  private readonly roomRepository: Repository<Room>;
  constructor(private readonly apartmentService: ApartmentService) {}

  public getAllRooms(): Promise<Room[]> {
    return this.roomRepository.find({ order: { id: 'ASC' } });
  }

  public getRoomByID(id: number): Promise<Room> {
    return this.roomRepository.findOne({ where: { id: id } });
  }

  async createRoom(body: CreateRoomDTO): Promise<Room> {
    const idApartment = body.fkApartment;
    let apartment: Apartment = null;
    if (idApartment !== null) {
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
    let apartment: Apartment = null;
    if (idApartment !== null) {
      apartment = await this.apartmentService.getApartmentByID(idApartment);
    }
    return await this.roomRepository.update(findCondition, {
      number: body.number,
      area: body.area,
      price: body.price,
      fkApartment: apartment,
    });
  }

  async deleteRoom(body: DeleteDTO): Promise<DeleteResult> {
    const findCondition: FindOptionsWhere<Room> = {
      id: Equal(body.id),
    };
    return await this.roomRepository.delete(findCondition);
  }
}
