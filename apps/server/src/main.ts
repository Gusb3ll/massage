import { env } from '@app/config'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

const main = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 20 * 1024 * 1024 }),
    {
      bodyParser: true,
      cors: { origin: '*' },
    },
  )

  if (env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Massage API')
      .addBearerAuth({
        name: 'Authorization',
        bearerFormat: 'Bearer',
        type: 'http',
      })
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  await app.enableShutdownHooks()

  await app.listen({ host: '0.0.0.0', port: 4000 }).then(() => {
    console.log('Server  at http://127.0.0.1:4000/[paths]')
    console.log('Swagger at http://127.0.0.1:4000/api')
  })
}

main()
