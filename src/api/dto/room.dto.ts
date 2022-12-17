import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Apartment } from '../entity/apartment.entity';

export class CreateRoomDTO {
  @ApiProperty({
    example: '1',
    description: 'Number of room inside an apartment',
  })
  @IsNumber()
  public number?: number | null;

  @ApiProperty({
    example: '14.2',
    description: 'Square feet (m²) of room',
  })
  @IsNumber()
  public area?: number | null;

  @ApiProperty({
    example: '560',
    description: 'Price per month for room',
  })
  @IsNumber()
  public price?: number | null;

  @ApiProperty({
    example: '1',
    description: 'Zipcode of the apartment',
  })
  @IsString()
  public fkApartment?: number | null;
}
