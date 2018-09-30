import { Injectable } from '@angular/core';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bookmark } from './bookmark.model';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  name: string;
  url: string;
  description: string;
  tags: string;

  bmCollection: AngularFirestoreCollection<Bookmark>;
  bookmarks: Observable<Bookmark[]>;

  constructor(private afs: AngularFirestore) {}

  getData() {
    this.bmCollection = this.afs.collection<Bookmark>('bookmarklet', ref =>
      ref.orderBy('name', 'asc')
    );
    return this.bmCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Bookmark;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  searchTag(term) {
    this.bmCollection = this.afs.collection<Bookmark>('bookmarklet', ref =>
      ref
        .orderBy('name', 'asc')
        .startAt(term)
        .endAt(term + '\uf8ff')
    );
    return this.bmCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Bookmark;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  add(name, url, description, tags) {
    this.afs.collection('bookmarklet').add({
      name: name,
      url: url,
      description: description,
      tags: tags
    });
  }

  update(id, { name, url, description, tags }) {
    this.afs.doc('bookmarklet/' + id).update({ name, url, description, tags });
  }

  delete(id) {
    this.afs.doc('bookmarklet/' + id).delete();
  }
}
