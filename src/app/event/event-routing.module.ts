import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: EventCreateComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule {}
