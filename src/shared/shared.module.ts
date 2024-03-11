import { Module } from '@nestjs/common';
import { getNowString } from './utils';

@Module({
  providers: [],
  exports: [getNowString],
})
export class SharedModule { }
