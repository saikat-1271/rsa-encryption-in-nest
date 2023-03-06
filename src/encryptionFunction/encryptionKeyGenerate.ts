/* eslint-disable prettier/prettier */

import { constants, privateDecrypt, publicEncrypt } from 'crypto';
import * as rsa from 'node-rsa';

export const dynamicGenerateKeys = (id: number) => {
  // );

  const key = new rsa({ b: 2048, uniqueOption: id }); // generating keys
  const privateKey = key.exportKey('private');
  const publicKey = key.exportKey('public');

  return {
    userId: id,
    publicKey: publicKey,
    privateKey: privateKey,
  };
};

export const encryptedData = async (data: string, publicKey: string) => {
  const encryptedData = await publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(data, 'utf8'), // encrypting json.stringify
  );
  return encryptedData.toString('base64');
};

export const decryptData = async (
  encryptedData: string,
  privateKey: string,
) => {
  const bufferData = Buffer.from(encryptedData, 'base64'); // converting encrypted string in buffer

  const decryptedData = privateDecrypt(
    {
      key: privateKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: 'sha256',
    },
    bufferData, // decrypt buffer
  );

  return JSON.parse(decryptedData.toString());// return data from string to object

};
