import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SearchMoviesDto {
  @ApiProperty()
  @IsNotEmpty()
  query: string;

  @ApiProperty()
  page: number;
}
