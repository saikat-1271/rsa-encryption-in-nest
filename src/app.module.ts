import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { UserKeysModule } from './user-keys/user-keys.module';
import { UserKeys } from './user-keys/entity/userKey.entity';
import * as redisStore from 'cache-manager-redis-store';
import * as cacheManager from 'cache-manager';
import { UserAesKeys } from './user-keys/entity/userAesKey.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db4free.net',
      port: 3306,
      username: 'saikat007',
      password: 'saikat1234',
      database: 'mydatabase1',
      entities: [User, UserKeys, UserAesKeys],
      synchronize: true,
    }),
    UsersModule,
    UserKeysModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
