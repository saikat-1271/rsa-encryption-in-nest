import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';
import { UserKeysModule } from './user-keys/user-keys.module';
import { UserKeys } from './user-keys/entity/userKey.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'encryption',
      entities: [User, UserKeys],
      synchronize: true,
    }),
    UserKeysModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
