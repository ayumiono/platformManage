import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from './module-import-guard';

import {
	LoginService,
	BinlogService,
	OfflineService,
	MQApiService,
} from '@core/service/public_api';

@NgModule({
  providers: [
  	LoginService,
  	BinlogService,
  	OfflineService,
  	MQApiService,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
