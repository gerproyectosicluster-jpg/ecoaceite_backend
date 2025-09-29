// filepath: src/common/s3.service.ts
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private configService: ConfigService) {
    this.s3 = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucket = this.configService.getOrThrow('AWS_BUCKET');
  }

  async uploadFile(
    file: Express.Multer.File,
    restaurantName: string,
    guideName: string,
    unitSlug: string,
  ): Promise<string> {
    // Sanitizar partes de la ruta
    const safeUnit = this.slugify(unitSlug);
    const safeGuide = this.slugify(guideName);
    const safeRestaurant = this.slugify(restaurantName);

    const safeFileName = this.fixFileName(file.originalname);

    const rawKey = `educational_units/${safeUnit}/responses/${safeGuide}/${safeRestaurant}/${safeFileName}`;

    // Subir el archivo
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: rawKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      }),
    );

    // Construir URL pública URL-safe
    const encodedKey = rawKey
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    return `https://${this.bucket}.s3.amazonaws.com/${encodedKey}`;
  }

  async deleteFile(fileUrl: string): Promise<void> {
    // Extraer el key del fileUrl
    const url = new URL(fileUrl);
    const key = decodeURIComponent(url.pathname.substring(1));
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      }),
    );
  }

  slugify(str: string) {
    return str
      .normalize('NFD') // elimina acentos
      .replace(/[\u0300-\u036f]/g, '') // elimina diacríticos
      .replace(/[^a-zA-Z0-9._-]/g, '_') // deja solo caracteres seguros
      .toLowerCase();
  }

  fixFileName(name: string): string {
    return Buffer.from(name, 'latin1').toString('utf8');
  }
}
