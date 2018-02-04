import {NgModule} from "@angular/core";
import {MaterialModule} from "../material.module";
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {FormsModule} from "@angular/forms";

const SHARED_MODULES = [
  CommonModule,
  MaterialModule,
  FormsModule,
  FlexLayoutModule
];

@NgModule({
  imports: [SHARED_MODULES],
  exports: [SHARED_MODULES]
})
export class SharedModule {}
