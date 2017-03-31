import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewNoteComponent }   from './new-note.component';
import { EditNoteComponent }  from './edit-note.component';

const routes: Routes = [
  { path: '', component: NewNoteComponent },
  { path: 'edit/:id',  component: EditNoteComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
