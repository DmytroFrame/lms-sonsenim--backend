import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaClientExceptionFilterProvider } from 'src/filters/prisma-error.filter';
import { GroupsModule } from './groups/groups.module';
import { DecksModule } from './decks/decks.module';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [AuthModule, UsersModule, GroupsModule, DecksModule, CardsModule],
  providers: [PrismaClientExceptionFilterProvider],
})
export class ApiModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
