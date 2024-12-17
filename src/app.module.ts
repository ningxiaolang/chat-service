import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { getYamlConfig } from '@/utils/yaml.config';
import { SharedModule } from '@/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [getYamlConfig],
    }),
    AuthModule,
    SharedModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
