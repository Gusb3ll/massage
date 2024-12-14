import { mailerConfig } from '@app/config'
import { PrismaModule } from '@app/db'
import { Module, NestModule } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { MailerModule } from '@nestjs-modules/mailer'
import { ZodValidationPipe } from 'nestjs-zod'

@Module({
  imports: [
    //
    PrismaModule,
    MailerModule.forRoot(mailerConfig),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  // configure(consumer: MiddlewareConsumer) {
  // consumer.apply(UserMiddleware).forRoutes('*')
  // }
  configure() {}
}
