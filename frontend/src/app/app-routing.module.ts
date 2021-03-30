import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailViewComponent } from './components/detail-view/detail-view.component';
import { MainViewComponent } from './components/main-view/main-view.component';

const routes: Routes = [
  {path: '', component: MainViewComponent},
  {path: ':topicId/tutorial/:id', component: DetailViewComponent},
  {path: ':topicId/excercise/:id', component: DetailViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
