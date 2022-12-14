import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

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

  @ApiProperty({
    example: '1',
    description: 'Id of client who reserved a room',
  })
  @IsNumber()
  public fkClient?: number | null;
}

export class UpdateRoomDTO {
  @ApiProperty({
    example: '1',
    description: 'Id of room in DB',
  })
  @IsNumber()
  public id?: number | null;

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

  @ApiProperty({
    example: '1',
    description: 'Id of client who reserved a room',
  })
  @IsNumber()
  public fkClient?: number | null;
}
