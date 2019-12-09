import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
document.addEventListener('jpush.receiveNotification',( event: any )=>{
    var content;
    if (this.devicePlatform == 'Android'){
        content = event.alert;
        alert(event.extras["cn.jpush.android.EXTRA"].ID)
    }else {//ios
        if (event == undefined) { //本地通知
            content = event.content;
        }else { //APNS
            content = event.aps.alert;
        }
    }
},false)