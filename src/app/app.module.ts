import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { BookmarkListComponent } from './bookmark/bookmark-list/bookmark-list.component';
import { BookmarkFormComponent } from './bookmark/bookmark-form/bookmark-form.component';

@NgModule({
  declarations: [
    AppComponent,
    BookmarkComponent,
    BookmarkListComponent,
    BookmarkFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
