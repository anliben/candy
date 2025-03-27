import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoModule } from '@po-ui/ng-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

const mModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  PoModule,
  RouterOutlet
]

@NgModule({
  imports: mModules,
  exports: mModules
})
export class SharedModule { }
