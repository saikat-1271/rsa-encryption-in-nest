/* eslint-disable prettier/prettier */

import { constants, privateDecrypt, publicEncrypt } from 'crypto';
import * as rsa from 'node-rsa';

export const dynamicGenerateKeys = (id: number) => {  // input a number like id, the key will generate according to that id
  // );

  const key = new rsa({ b: 2048, uniqueOption: id }); // generating keys
  const privateKey = key.exportKey('private'); // private key created
  const publicKey = key.exportKey('public'); // public key created

  return {
    userId: id,
    publicKey: publicKey,
    privateKey: privateKey,
  };
};

export const encryptedData = async (data: string, publicKey: string) => {

  // here data is stringify json  

  const encryptedData = await publicEncrypt(
    {
      key: publicKey,
      padding: constants.RSA_PKCS1_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(data, 'utf8'), // encrypting json.stringify
  );

  return encryptedData.toString('base64');  // return encrypted text into string format
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
    // decryptedData is in json stringify format
  return JSON.parse(decryptedData.toString());
  // pasre the json string and return

};
