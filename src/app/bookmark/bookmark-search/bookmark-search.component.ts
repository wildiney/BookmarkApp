import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark-search',
  templateUrl: './bookmark-search.component.html',
  styleUrls: ['./bookmark-search.component.css']
})
export class BookmarkSearchComponent implements OnInit {
  bmCollection: AngularFirestoreCollection<Bookmark>;
  bookmarks: Observable<Bookmark[]>;
  enableEditAndDelete: boolean = false;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(params => {
      let enable = params.get('enable');
      if (enable == 'false' || enable == '' || enable == null) {
        this.enableEditAndDelete = false;
      } else {
        this.enableEditAndDelete = true;
      }
    });
  }

  ngOnInit() {
    let term = this.route.snapshot.params.tag;
    this.bookmarks = this.bookmarkService.getDataWhere(term);
  }
}
