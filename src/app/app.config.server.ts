import {
  mergeApplicationConfig,
  ApplicationConfig,
  ɵprovideZonelessChangeDetection,
} from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [ɵprovideZonelessChangeDetection(), provideServerRendering()],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
