import { Response } from 'express';
import { HttpService } from '@nestjs/axios';
import { SearchMoviesDto } from './dto/search-movies.dto';
import { Injectable } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private readonly httpService: HttpService) {}
  async search(searchMoviesDto: SearchMoviesDto) {
    const result = await firstValueFrom(
      this.httpService
        .get(
          `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${searchMoviesDto.query}&page=${searchMoviesDto.page}`,
        )
        .pipe(catchError((err) => err)),
    );
    const { Search, Response } = result['data'];
    if (Response === 'False') {
      return [];
    }
    return Search.map((movie) => movie.Title);
  }

  async getMovie(title: string) {
    const result = await firstValueFrom(
      this.httpService
        .get(
          `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`,
        )
        .pipe(catchError((err) => err)),
    );
    const { Title, Released, Ratings, Plot } = result['data'];
    return {
      Title,
      'Release Date': Released,
      Rating: Ratings[0].Value,
      Synopsis: Plot,
    };
  }
}
