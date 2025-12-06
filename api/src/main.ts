import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // تفعيل CORS عشان يسمح للمتصفح / Expo Web يتصل بالـ API
  app.enableCors({
    origin: true, // يعني اسمح لأي origin (مناسب للتطوير)
    // تقدر مستقبلاً تضيقها مثلاً:
    // origin: ['http://localhost:8081'],
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
