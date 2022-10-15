import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PagedResultDto } from 'src/common/dto/PagedResult.dto';
import { BooksService } from './books.service';
import { BookDto } from './dto/book.dto';
import { GetBookListRequestDto } from './dto/BookGetListRequest.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { plainToClass } from "class-transformer";
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('books')
@ApiTags("Books")
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiQuery({ type: GetBookListRequestDto })
  @ApiResponse({ type: PagedResultDto<BookDto> })
  async findAll(@Query() query: GetBookListRequestDto): Promise<PagedResultDto<BookDto>> {
    let res = await this.booksService.findAll(query);
    let items: BookDto[] = res[0].map(x => Object.assign(new BookDto(), x))
    return new PagedResultDto<BookDto>(items, res[1]);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: BookDto })
  async findOne(@Param('id') id: string) {
    let entity = await this.booksService.findOne(+id);
    return plainToClass(BookDto, entity);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
