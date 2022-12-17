import { Apartment } from './../entity/apartment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from '../entity/room.entity';
import { ApartmentService } from '../apartment/apartment.service';
import { CreateRoomDTO } from '../dto/room.dto';

@Injectable()
export class RoomService {
  @InjectRepository(Room)
  private readonly roomRepository: Repository<Room>;
  constructor(private readonly apartmentService: ApartmentService) {}

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
}
