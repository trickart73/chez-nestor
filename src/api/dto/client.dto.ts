import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateClientDTO {
  @ApiProperty({
    example: 'Nestor',
    description: 'First name of client',
  })
  @IsString()
  public firstName?: string | null;

  @ApiProperty({
    example: 'Tintin',
    description: 'Last name of client',
  })
  @IsString()
  public lastName?: string | null;

  @ApiProperty({
    example: 'nestor.tintin@chez-nestor.com',
    description: 'Email of client',
  })
  @IsString()
  public email?: string | null;

  @ApiProperty({
    example: '0601020304',
    description: 'Phone number of client',
  })
  @IsString()
  public phone?: string | null;

  @ApiProperty({
    example: '01/01/1970',
    description: 'Birth date of client',
  })
  @IsString()
  public birthDate?: string | null;

  @ApiProperty({
    example: 'Guatemala',
    description: 'Nationality of client',
  })
  @IsString()
  public nationality?: string | null;

  @ApiProperty({
    example: '1',
    description: 'Id of room reserved by client',
  })
  @IsNumber()
  public fkRoom?: number | null;
}

export class UpdateClientDTO {
  @ApiProperty({
    example: '1',
    description: 'Id of client in DB',
  })
  @IsNumber()
  public id?: number | null;

  @ApiProperty({
    example: 'Nestor',
    description: 'First name of client',
  })
  @IsString()
  public firstName?: string | null;

  @ApiProperty({
    example: 'Tintin',
    description: 'Last name of client',
  })
  @IsString()
  public lastName?: string | null;

  @ApiProperty({
    example: 'nestor.tintin@chez-nestor.com',
    description: 'Email of client',
  })
  @IsString()
  public email?: string | null;

  @ApiProperty({
    example: '0601020304',
    description: 'Phone number of client',
  })
  @IsString()
  public phone?: string | null;

  @ApiProperty({
    example: '01/01/1970',
    description: 'Birth date of client',
  })
  @IsString()
  public birthDate?: string | null;

  @ApiProperty({
    example: 'Guatemala',
    description: 'Nationality of client',
  })
  @IsString()
  public nationality?: string | null;

  @ApiProperty({
    example: '1',
    description: 'Id of room reserved by client',
  })
  @IsNumber()
  public fkRoom?: number | null;
}
