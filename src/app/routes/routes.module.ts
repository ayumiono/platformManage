import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';


import { OfflineDeployProgressComponent } from './offline/deploy-progress/deploy-progress.component';
import { BinlogComponent } from './binlog/binlog.component';
import { DatabaseComponent } from './binlog/database/database.component';
import { OfflineVersionSnapshotComponent } from './offline/version-snapshot/version-snapshot.component';
import { OfflineSchemeComponent } from './offline/scheme/scheme.component';
import { OfflineShopComponent } from './offline/shop/shop.component';
import { TopicSnapshotComponent } from './mq/topic/snapshot.component';
import { TraceComponent } from './asm/trace/trace.component';

import { AgGridModule } from 'ag-grid-angular';

const COMPONENTS = [
  OfflineDeployProgressComponent,
  BinlogComponent,
  DatabaseComponent,
  OfflineVersionSnapshotComponent,
  OfflineSchemeComponent,
  OfflineShopComponent,
  TopicSnapshotComponent,
  TraceComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule,AgGridModule.withComponents([]) ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}
