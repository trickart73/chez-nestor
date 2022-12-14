import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { UpdateResult } from 'typeorm';

export class CreateResultDTO {
  @ApiProperty({
    example: 'true',
    description: 'If call ended in creation of specified entity',
  })
  @IsBoolean()
  public success?: boolean;

  @ApiProperty({
    description: 'Return the entity created',
  })
  @IsBoolean()
  public data?: any;

  @ApiProperty({
    description: 'Return possible reason of failure or success',
  })
  @IsBoolean()
  public message?: any;
}
export class UpdateResultDTO {
  @ApiProperty({
    description: 'UpdateResult of entity updated',
  })
  @IsNumber()
  public updateResult?: UpdateResult | null;

  @ApiProperty({
    description: 'Message concerning the entity updated',
  })
  @IsNumber()
  public message?: string | null;
}

export class DeleteDTO {
  @ApiProperty({
    example: '1',
    description: 'Id of selected entity in DB',
  })
  @IsNumber()
  public id?: number | null;
}
