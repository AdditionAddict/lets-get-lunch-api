import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule
} from 'ng-pick-datetime';

import { EventRoutingModule } from './event-routing.module';
import { EventCreateComponent } from './event-create/event-create.component';

@NgModule({
  declarations: [EventCreateComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class EventModule {}
