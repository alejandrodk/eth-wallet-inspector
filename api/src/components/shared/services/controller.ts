import {
  Body,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ServiceBase } from './service';

export class ControllerBase<T> {
  constructor(protected service: ServiceBase<T>) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() ...body: any): Promise<any> {
    return this.service.create(body[0]);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  find(@Query() ..._: any): Promise<any> {
    return this.service.find();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: string): Promise<any> {
    return this.service.findById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: string, @Body() body: Partial<T>): Promise<any> {
    return this.service.update(id, body);
  }
}
