import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtStrategy } from './helpers/jwt-acc.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ secret: 'secret', signOptions: { expiresIn: 3600 } }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [AuthenticationService, JwtStrategy],
  controllers: [AuthenticationController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthenticationModule {}
