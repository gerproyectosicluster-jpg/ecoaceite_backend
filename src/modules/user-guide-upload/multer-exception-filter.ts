import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { MulterError } from 'multer';

@Catch(MulterError)
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception.code === 'LIMIT_FILE_SIZE') {
      return response.status(400).json({
        statusCode: 400,
        message: 'El archivo excede el tamaño máximo permitido de 10MB.',
        error: 'Bad Request',
      });
    }

    return response.status(400).json({
      statusCode: 400,
      message: exception.message,
      error: 'Bad Request',
    });
  }
}
