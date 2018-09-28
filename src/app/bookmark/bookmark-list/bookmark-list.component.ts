import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {
  @Output()
  updateBookmark = new EventEmitter<{ id: string }>();

  bmCollection: AngularFirestoreCollection<Bookmark>;
  bookmarks: Observable<Bookmark[]>;
  enableEditAndDelete: boolean= false;

  constructor(private bookmarkService: BookmarkService, private route:ActivatedRoute) {
    this.route.queryParamMap.subscribe(
      params=>{
        let enable = params.get('enable');
        if(enable == 'false' || enable=='' || enable==null){
          this.enableEditAndDelete = false;
        }else{
          this.enableEditAndDelete = true;
        }
      }
    );
  }

  ngOnInit() {
    this.bookmarks = this.bookmarkService.getData();
  }

  update(id) {
    this.updateBookmark.emit(id);
  }

  delete(id) {
    this.bookmarkService.delete(id);
  }
}
