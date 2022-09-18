import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PagedResultDto } from 'src/common/dto/PagedResult.dto';
import { PagedSortedAndFilteredResultRequestDto } from 'src/common/dto/PagedSortedAndFilteredResultRequest.dto';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Controller('authors')
@ApiTags("Authors")
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(@Query() query: PagedSortedAndFilteredResultRequestDto): Promise<PagedResultDto<Author>> {
    let res = await this.authorsService.findAll(query);
    return new PagedResultDto<Author>(res[0], res[1]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
