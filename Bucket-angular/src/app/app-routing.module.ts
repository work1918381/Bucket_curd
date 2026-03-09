import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemListComponent } from './components/item-list/item-list.component';

const routes: Routes = [
  { path: '', component: ItemListComponent },  // Add Page
  { path: 'form', component: ItemFormComponent},
  { path: 'form/:id', component: ItemFormComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
