import { Injectable } from '@angular/core';
@Injectable()
export class MyProvider {

	constructor() {}

	someFunction(){
		console.log("I do something useful!");
	}

}