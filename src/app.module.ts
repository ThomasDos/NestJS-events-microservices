import ormConfig from '@config/orm.config';
import { AttendeesModule } from '@domains/attendees/attendees.module';
import { EventsModule } from '@domains/events/events.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [ormConfig] }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    EventsModule,
    AttendeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
