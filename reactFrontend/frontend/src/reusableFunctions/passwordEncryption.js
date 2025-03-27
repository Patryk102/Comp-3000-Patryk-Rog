import React from "react";
//import NodeRSA from 'node-rsa';

//const publicKey = "THIS IS A PUblic key#!* Its secure now."

/*function encryptPassword(password){
    const rsa = new NodeRSA(publicKey);
    const encryptedData = rsa.encrypt("base-64", password);
    return encryptPassword;
}*/

const publicKeyPem = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsX+7IjmG6...
-----END PUBLIC KEY-----
`;

async function hashPassword(password) {
    // Convert the password string into binary data
    const encodedPassword = new TextEncoder().encode(password);
    
    // Generate the SHA-256 hash
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
    
    // Convert the hash to a hexadecimal string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    
    return hashHex;
      

}

async function encryptPassword(password) {
    // Convert the password string into binary data
    const encodedPassword = new TextEncoder().encode(password);
  
    // Generate the SHA-256 hash
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedPassword);
  
    // Convert the hash to a hexadecimal string for readability
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  
    return hashHex;
  }


export {encryptPassword};