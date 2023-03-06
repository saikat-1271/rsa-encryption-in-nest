import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { stringify } from 'querystring';
import { encryptedData } from 'src/encryptionFunction/encryptionKeyGenerate';
import { UserKeys } from 'src/user-keys/entity/userKey.entity';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserParams } from './utils/registration.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserKeys) private userKeyRepository: Repository<UserKeys>,
  ) {}

  async createUser(createUserParams: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...createUserParams,
    });
    return await this.userRepository.save(newUser);
    // return currentId;
  }
  async showallUsers() {
    return this.userRepository.find({});
  }

  async getUserById(id: number) {
    const publicKey = await this.userKeyRepository.find({
      select: {
        publicKey: true,
      },
      where: {
        id: id,
      },
    });

    const userDetails = await this.userRepository.find({
      select: {
        name: true,
        email: true,
      },
      where: {
        id: id,
      },
    });

    const stringifyData = JSON.stringify(userDetails);

    const encryptedDataOfId = await encryptedData(
      stringifyData,
      publicKey[0].publicKey,
    );

    return encryptedDataOfId;
  }
}
