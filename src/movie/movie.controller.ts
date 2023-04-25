import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('movie')
@ApiBearerAuth()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('search:query&:page')
  async search(@Param('query') query: string, @Param('page') page: number) {
    return await this.movieService.search({
      query,
      page,
    });
  }

  @Get(':title')
  async getMovie(@Param('title') title: string) {
    return await this.movieService.getMovie(title);
  }
}
