import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { dynamicGenerateKeys } from 'src/encryptionFunction/encryptionKeyGenerate';
import { CryptedDataParam } from './dto/cryptedData.dto';
import { CreateKeys } from './dto/userKeyCreate.dto';
import { UserKeysService } from './user-keys.service';

@Controller('user-keys')
export class UserKeysController {
  constructor(private userKeyService: UserKeysService) {}

  @Post(':id') // create keys by id
  createEntry(@Param('id', ParseIntPipe) id: number) {
    const keys = dynamicGenerateKeys(id);
    const createKeys = new CreateKeys();
    createKeys.userId = keys.userId;
    createKeys.privateKey = keys.privateKey;
    createKeys.publicKey = keys.publicKey;

    return this.userKeyService.createEntry(createKeys);
  }

  @Get()
  getKeys() {
    return this.userKeyService.allEntry();
  }

  @Get(':id')
  async decryptDataById(
    // decrypt the input data by id based private key
    @Param('id', ParseIntPipe) id: number,
    @Body() cryptedData: CryptedDataParam,
  ) {
    return await this.userKeyService.decryptData(cryptedData, id);
  }
}
