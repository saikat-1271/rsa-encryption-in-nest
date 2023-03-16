import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserKeys } from 'src/user-keys/entity/userKey.entity';
import { User } from './entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserKeys])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
