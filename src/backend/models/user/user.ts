const mongoose = require("mongoose");
const Schema = mongoose.Schema;
'use strict';
import * as crypto from 'crypto';
//const encrypt = require('mongoose-encryption');



const defaultUser = "usuario";

const userSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type:String, require:true },
    type: { type: String, default: defaultUser }
    //token: Se necesitará agregar un token de validación
});





/*
var encKey = 'W80UPaYW8Y5N5M9aWPackJEjeErt3RzC03R5hiBk1cA=';
var sigKey = 'XrFzv0K+lG0dZ2v7T/QvjXP9LFUnrSDW9B8lNbsT1FOhv3abg5cuRAIFAlGVJpKOU/9TGmGZ+fyCoT/NGvEWcg==';
userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey , encryptedFields: ['password']});
*/


const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex'; // this could be base64, for instance

export class  PersistedPassword {
    salt: string;
    hash: string;
    iterations: number;
}

export async function generateHashPassword(password): Promise<PersistedPassword> {
    return new Promise<PersistedPassword>((accept, reject) => {
        const salt = crypto.randomBytes(SALT_LENGTH).toString(BYTE_TO_STRING_ENCODING);
        crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (error, hash) => {
            if (error) {
                reject(error);
            } else {
                accept({
                    salt,
                    hash: hash.toString(BYTE_TO_STRING_ENCODING),
                    iterations: ITERATIONS,
                });
            }
        });
    });
}

export const User = mongoose.model("User", userSchema);


