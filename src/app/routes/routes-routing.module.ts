import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'offline/deploy_progress', pathMatch: 'full' },
      { path: 'offline', redirectTo: 'offline/deploy_progress', pathMatch: 'full' },
      { path: 'offline/deploy_progress', component: OfflineDeployProgressComponent,data: { title: '门店项目发布进度', titleI18n: 'offline_deploy_progress' }},
	  	{ path: 'binlog/table', component: BinlogComponent, data: { title: 'binglog监控', titleI18n: 'binlog_monitor' }},
	  	{ path: 'binlog/table/in/:db_type', component: BinlogComponent, data: { title: 'binglog监控', titleI18n: 'binlog_monitor' }},
	  	{ path: 'binlog/database', component: DatabaseComponent, data: { title: '数据库管理', titleI18n: 'binlog_database_manage' }},
	  	{ path: 'offline/version_snapshot', component: OfflineVersionSnapshotComponent, data: { title:'门店版本快照', titleI18n:'offline_version_snapshot'}},
    	{ path: 'offline/scheme', component:OfflineSchemeComponent, data: { title:'离线同步表管理', titleI18n:'scheme_setting'}},
    	{ path: 'offline/shop', component:OfflineShopComponent, data: {title:'门店信息', titleI18n:'shop_info'}},
    	{ path: 'mq/topic_snapshot',  component:TopicSnapshotComponent, data: {title:'Topic统计快照', titleI18n:'mq_topic_snapshot'}},
    	{ path: 'apm/trace', component:TraceComponent, data:{title:'trace快照',titleI18n:'apm_trace'}},
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'offline/deployment_progress' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
