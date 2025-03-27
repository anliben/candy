import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

const mModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PoModule
]

@NgModule({
  imports: mModules,
  exports: mModules
})
export class SharedModule { }
