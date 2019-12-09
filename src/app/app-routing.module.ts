import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'index', loadChildren: './index/index.module#IndexPageModule' },
  { path: 'index-tab', loadChildren: './index-tab/index-tab.module#IndexTabPageModule' },
  { path: 'wode', loadChildren: './wode/wode.module#WodePageModule' },
  { path: 'xiaoxi', loadChildren: './xiaoxi/xiaoxi.module#XiaoxiPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
  // { path: 'searchauto', loadChildren: './searchauto/searchauto.module#SearchautoPageModule' },
  //   { path: 'search2', loadChildren: './search2/search2.module#Search2PageModule' },
  { path: 'renwu-con/:id/:status', loadChildren: './renwu-con/renwu-con.module#RenwuConPageModule' },
  { path: 'renwu-choulao', loadChildren: './renwu-choulao/renwu-choulao.module#RenwuChoulaoPageModule' },
  { path: 'renwu-update/:mid/:tid', loadChildren: './renwu-update/renwu-update.module#RenwuUpdatePageModule' },
  { path: 'renwu-zuorenwu/:id/:tid', loadChildren: './renwu-zuorenwu/renwu-zuorenwu.module#RenwuZuorenwuPageModule' },

  { path: 'renwu-shenhezhong/:id/:tid', loadChildren: './renwu-shenhezhong/renwu-shenhezhong.module#RenwuShenhezhongPageModule' },

  { path: 'renwu-tongguo/:id/:tid', loadChildren: './renwu-tongguo/renwu-tongguo.module#RenwuTongguoPageModule' },
  { path: 'renwu-update-tishi/:id/:tid', loadChildren: './renwu-update-tishi/renwu-update-tishi.module#RenwuUpdateTishiPageModule' },
  { path: 'renwu-wancheng/:id/:tid', loadChildren: './renwu-wancheng/renwu-wancheng.module#RenwuWanchengPageModule' },
  { path: 'daohangbi', loadChildren: './daohangbi/daohangbi.module#DaohangbiPageModule' },
  { path: 'daohangbi-zhuanchu', loadChildren: './daohangbi-zhuanchu/daohangbi-zhuanchu.module#DaohangbiZhuanchuPageModule' },
  { path: 'xiaojinku', loadChildren: './xiaojinku/xiaojinku.module#XiaojinkuPageModule' },
  { path: 'xiaojinku-zhuanchu', loadChildren: './xiaojinku-zhuanchu/xiaojinku-zhuanchu.module#XiaojinkuZhuanchuPageModule' },
  { path: 'xinyuzhi', loadChildren: './xinyuzhi/xinyuzhi.module#XinyuzhiPageModule' },
  { path: 'shezhi', loadChildren: './shezhi/shezhi.module#ShezhiPageModule' },
  { path: 'yijian-fankui', loadChildren: './yijian-fankui/yijian-fankui.module#YijianFankuiPageModule' },
  { path: 'guanyuwomen', loadChildren: './guanyuwomen/guanyuwomen.module#GuanyuwomenPageModule' },
  { path: 'wode-gengduo', loadChildren: './wode-gengduo/wode-gengduo.module#WodeGengduoPageModule' },
  { path: 'bangdingshouji/:wechat', loadChildren: './bangdingshouji/bangdingshouji.module#BangdingshoujiPageModule' },
  { path: 'renwu', loadChildren: './renwu/renwu.module#RenwuPageModule' },
  { path: 'renwu', loadChildren: './renwu/renwu.module#RenwuPageModule' },
  { path: 'default', loadChildren: './default/default.module#DefaultPageModule' },
  { path: 'no-page', loadChildren: './no-page/no-page.module#NoPagePageModule' },
  { path: 'position', loadChildren: './position/position.module#PositionPageModule' },
  { path: 'renwu-tongguoo/:id/:tid', loadChildren: './renwu-tongguoo/renwu-tongguoo.module#RenwuTongguooPageModule' },
  { path: 'renwu-weitongguo/:id/:tid', loadChildren: './renwu-weitongguo/renwu-weitongguo.module#RenwuWeitongguoPageModule' },
  { path: 'renwu-guoqi', loadChildren: './renwu-guoqi/renwu-guoqi.module#RenwuGuoqiPageModule' },
  { path: 'privacy', loadChildren: './privacy/privacy.module#PrivacyPageModule' },
  { path: 'permission', loadChildren: './permission/permission.module#PermissionPageModule' },
  // { path: 'agreement', loadChildren: './agreement/agreement.module#AgreementPageModule' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
