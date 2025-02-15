import { AuthModule } from '@app/auth'
import { LoggingInterceptor, UserMiddleware } from '@app/common'
import { mailerConfig } from '@app/config'
import { PrismaModule } from '@app/db'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { MailerModule } from '@nestjs-modules/mailer'
import { ZodValidationPipe } from 'nestjs-zod'

import { MassagerModule } from './api/massager/massager.module'
import { PropertyModule } from './api/property/property.module'
import { UserModule } from './api/user/user.module'

@Module({
  imports: [
    MassagerModule,
    PropertyModule,
    UserModule,
    //
    AuthModule,
    PrismaModule,
    MailerModule.forRoot(mailerConfig),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*')
  }
}
