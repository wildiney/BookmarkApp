import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkListComponent } from './bookmark/bookmark-list/bookmark-list.component';
import { BookmarkFormComponent } from './bookmark/bookmark-form/bookmark-form.component';
import { BookmarkSearchComponent } from './bookmark/bookmark-search/bookmark-search.component';

const appRoutes:Routes = [
  {path:"", component:BookmarkListComponent, pathMatch:'full'},
  {path:"add", component:BookmarkFormComponent},
  {path:"list/:delete", component:BookmarkFormComponent},
  {path:"search/:tag", component:BookmarkSearchComponent},
  {path:"**", component:BookmarkListComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarkListComponent,
    BookmarkFormComponent,
    BookmarkSearchComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
