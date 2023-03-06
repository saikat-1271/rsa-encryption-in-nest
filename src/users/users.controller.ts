import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/registration.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}

  @Post() // add users
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.userservice.createUser(createUserDto);
  }

  @Get()
  showUser() {
    return this.userservice.showallUsers();
  }

  @Get(':id') // get users by id but in encrypted form
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userservice.getUserById(id);
  }
}
