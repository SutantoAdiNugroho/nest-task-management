import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './modules/tasks/tasks.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { typeOrmConfig } from './config/typeorm.config';
@Module({
  imports: [
    TasksModule,
    AuthenticationModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
  ],
})
export class AppModule {}
