import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AESDecrypt,
  AESEncrypt,
} from 'src/encryptionFunction/aesEncryptionFunction';
import { EncryptionHelper } from 'src/encryptionFunction/EncryptionHelper';
import { decryptData } from 'src/encryptionFunction/encryptionKeyGenerate';
import { Repository } from 'typeorm';
import { UserKeys } from './entity/userKey.entity';
import { CreateEntryParams } from './utils/createEntry.utils';
import { EncryptedData } from './utils/encryptedData.utils';

@Injectable()
export class UserKeysService {
  constructor(
    @InjectRepository(UserKeys) private userKeyRepository: Repository<UserKeys>,
  ) {}

  async createEntry(createEntryparams: CreateEntryParams) {
    const newEntry = this.userKeyRepository.create({
      ...createEntryparams,
    });
    return await this.userKeyRepository.save(newEntry);
  }

  async findEntry(id: number) {
    return this.userKeyRepository.find({
      where: {
        userId: id,
      },
    });
  }

  async allEntry() {
    return await this.userKeyRepository.find({});
  }

  async decryptData(encryptedData: EncryptedData, id: number) {
    // query to get private key from id
    const privateKey = await this.userKeyRepository.find({
      select: {
        privateKey: true,
      },
      where: {
        id: id,
      },
    });
    //decryption data
    const decryptedData = await decryptData(
      encryptedData.cryptedata,
      privateKey[0].privateKey,
    );
    return decryptedData;
  }

  async aesEncrypt(id: number) {
    const aesKey = EncryptionHelper.AESEncrypt(
      'saikatKar112233445566778899',
      id.toString(),
    );
    // const aesKey = aesGenerateKeys(id);
    return aesKey;
  }
  async aesDecrypt(data: string, id: number) {
    const aesKey = EncryptionHelper.AESDecrypt(data, id.toString());
    // const aesKey = aesGenerateKeys(id);
    return aesKey;
  }
}
