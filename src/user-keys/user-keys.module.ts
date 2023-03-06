import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from './entity/userKey.entity';
import { UserKeysService } from './user-keys.service';
import { UserKeysController } from './user-keys.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserKeys])],
  providers: [UserKeysService],
  controllers: [UserKeysController],
})
export class UserKeysModule {}
