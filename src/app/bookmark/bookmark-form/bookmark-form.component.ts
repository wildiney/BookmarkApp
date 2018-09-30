import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../shared/bookmark.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css']
})
export class BookmarkFormComponent implements OnInit {
  update: boolean = false;
  id: string;
  name: string;
  url: string;
  description: string;
  tags: string;
  page;

  constructor(
    private bookmarkService: BookmarkService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParamMap.subscribe(params => {
      this.name = params.get('site');
      this.url = params.get('url');
      this.description = params.get('description');
    });
  }

  ngOnInit() {}

  addBookmark() {
    this.bookmarkService.add(this.name, this.url, this.description, this.tags);
    this.update = false;
    this.id = '';
    this.name = '';
    this.url = '';
    this.description = '';
    this.tags = '';
    this.router.navigate(['/list']);
  }

  updateBookmark() {
    this.bookmarkService.update(this.id, {
      name: this.name,
      url: this.url,
      description: this.description,
      tags: this.tags
    });
    this.update = false;
    this.id = '';
    this.name = '';
    this.url = '';
    this.description = '';
    this.tags = '';
    this.router.navigate(['/list']);
  }

  onUpdate(bookmark) {
    this.id = bookmark.id;
    this.name = bookmark.name;
    this.url = bookmark.url;
    this.description = bookmark.description;
    this.tags = bookmark.tags;
    this.update = true;
  }
}
