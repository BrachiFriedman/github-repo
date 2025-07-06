import { Component, OnInit } from '@angular/core';
import { GithubService } from '../services/github';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './bookmarks.html',
  styleUrls: ['./bookmarks.scss']
})
export class BookmarksComponent implements OnInit {
  bookmarks: any[] = [];

  constructor(private githubService: GithubService) {}
  
  
  ngOnInit(): void {
    this.githubService.getBookmarks().subscribe({
      next: (res) => {
        this.bookmarks = res;
        console.log('Bookmarks loaded:', res);
      },
      error: (err) => {
        console.error('Error loading bookmarks', err);
      }
    });
  }
}
