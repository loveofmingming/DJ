
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private messageSource = new Subject<string>();
    message$ = this.messageSource.asObservable();
    messageAction(name: string) {
        this.messageSource.next(name);
    }
  constructor() { }

}
