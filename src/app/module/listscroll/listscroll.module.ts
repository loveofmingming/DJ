import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListscrollComponent } from './listscroll.component';

@NgModule({
  declarations: [ListscrollComponent],
  imports: [
    CommonModule
  ],
    exports: [ListscrollComponent]
})
export class ListscrollModule { }
