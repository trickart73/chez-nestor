import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public firstName?: string | null;

  @IsString()
  public lastName?: string | null;

  @IsString()
  public email?: string | null;

  @IsString()
  public phone?: string | null;

  @IsString()
  public birthDate?: string | null;

  @IsString()
  public nationality?: string | null;
}
