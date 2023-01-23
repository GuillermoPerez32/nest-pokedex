import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class ResponsePokemonDto {
  @IsInt()
  @Min(1)
  no: number;

  @IsString()
  @MinLength(1)
  name: string;
}
