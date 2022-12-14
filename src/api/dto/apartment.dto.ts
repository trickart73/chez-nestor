import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateApartmentDTO {
  @ApiProperty({
    example: 'Apartement rue Rabelais',
    description: 'Name of the apartment (can be anything)',
  })
  @IsString()
  public name?: string | null;

  @ApiProperty({
    example: '5, rue Rabelais',
    description: 'Localisation (street) of the apartment',
  })
  @IsString()
  public street?: string | null;

  @ApiProperty({
    example: '69003',
    description: 'Zipcode of the apartment',
  })
  @IsString()
  public zipCode?: string | null;

  @ApiProperty({
    example: 'Lyon',
    description: 'Localisation (city) of the apartment',
  })
  @IsString()
  public city?: string | null;
}

export class UpdateApartmentDTO {
  @ApiProperty({
    example: '1',
    description: 'Id of apartment in DB',
  })
  @IsNumber()
  public id?: number | null;

  @ApiProperty({
    example: 'Apartement rue Rabelais',
    description: 'Name of the apartment (can be anything)',
  })
  @IsString()
  public name?: string | null;

  @ApiProperty({
    example: '5, rue Rabelais',
    description: 'Localisation (street) of the apartment',
  })
  @IsString()
  public street?: string | null;

  @ApiProperty({
    example: '69003',
    description: 'Zipcode of the apartment',
  })
  @IsString()
  public zipCode?: string | null;

  @ApiProperty({
    example: 'Lyon',
    description: 'Localisation (city) of the apartment',
  })
  @IsString()
  public city?: string | null;
}
