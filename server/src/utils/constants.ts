import { ConfigModuleOptions } from '@nestjs/config';
import { GqlModuleOptions } from '@nestjs/graphql';

export const __prod__ = process.env.NODE_ENV === 'production';

export const configConfig: ConfigModuleOptions = {
  isGlobal: true,
  ignoreEnvFile: __prod__,
  envFilePath: '.env.local',
};

export const graphQLConfig: GqlModuleOptions = {
  autoSchemaFile: true,
  installSubscriptionHandlers: true,
  subscriptions: {
    'subscriptions-transport-ws': true,
  },
  path: '/graphql',
};
