import { NgModule } from '@angular/core';
import { CallFlowComponent } from './callFlow/callflow.component';

const COMPONENTS = [
	CallFlowComponent,
	
];

@NgModule({
  declarations: [
    ...COMPONENTS,
  ]
})
export class ThirdPartComponents {}