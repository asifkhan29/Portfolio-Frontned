// user/services/base24.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Base24Service {
  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'; // 32 chars for safe encoding
  private base = this.alphabet.length;

  encode(bytes: Uint8Array): string {
    let num = BigInt('0x' + Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(''));
    let str = '';
    while (num > 0) {
      const rem = num % BigInt(this.base);
      str = this.alphabet[Number(rem)] + str;
      num = num / BigInt(this.base);
    }
    return str || this.alphabet[0];
  }

  decode(str: string): Uint8Array {
    let num = BigInt(0);
    for (let i = 0; i < str.length; i++) {
      const idx = this.alphabet.indexOf(str[i]);
      if (idx === -1) throw new Error('Invalid Base24 character');
      num = num * BigInt(this.base) + BigInt(idx);
    }
    let hex = num.toString(16);
    if (hex.length % 2 !== 0) hex = '0' + hex;
    const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
    return bytes;
  }
}
