import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

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
