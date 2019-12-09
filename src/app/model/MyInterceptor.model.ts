import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';


import { Observable ,pipe,  of} from 'rxjs';
import { tap } from 'rxjs/operators'

export class MyInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(req);
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
         
          console.log('---> status:', evt.status);
        }
      }, error => {
        console.error('NICE ERROR', error)
      })
    )


  }
}


//rxjs6 新特性移除do增加top
// import { Observable , of} from 'rxjs';
// import 'rxjs/add/operator/do';


// @Injectable()
// export class MyInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     console.log(req);
//     return next.handle(req).do(evt => {
//       console.log("------->>")
//       console.log(evt)
//       if (evt instanceof HttpResponse) {
//         console.log('---> status:', evt.status);
//        // console.log('---> filter:', req.params.get('filter'));
//       }
//     });

//   }
// }
// export class MyInterceptor implements HttpInterceptor {
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const duplicate = req.clone({ params: req.params.set('filter', 'completed') });
// console.log(req+"------interceptor");
//     return next.handle(duplicate);
//   }
// }