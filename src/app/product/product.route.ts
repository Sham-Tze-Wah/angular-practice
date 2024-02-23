import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContentComponent } from '../content/content.component';
// import { Shell } from '@app/shell/shell.service';

// const routes: Routes = [
//   Shell.childRoutes([
//     {
//       path: 'cust-info',
//       component: ContentComponent,
//       data: { title: extract('Case Listing') }
//     }
//   ])
// ];


@NgModule({
  declarations: [],
  imports: [
    // RouterModule.forChild(routes)
  ],
  exports: [
    // RouterModule
  ],
})
export class ProductModule { }
