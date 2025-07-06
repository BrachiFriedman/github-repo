import { Component } from '@angular/core';
import { GithubService } from '../../services/github';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],

})
export class SearchComponent {
  searchQuery: string = '';
  repositories: any[] = [];

  constructor(private githubService: GithubService) {
    this.githubService.getToken().subscribe(res => {
      sessionStorage.setItem('jwt', res.token);
    });
  }

  onSearch(): void {

    if (!this.searchQuery.trim()) return;

    this.githubService.searchRepositories(this.searchQuery).subscribe(
      (result) => {
        this.repositories = result.items;
      },
      (error) => {
        console.error('Error fetching repositories', error);
      }
    );
  }

  bookmarkMessage: string = '';
  bookmarkError: string = '';
  bookmark(repo: any): void {
    console.log('Bookmarking:', repo);

    this.githubService.addBookmark(repo).subscribe({
      next: () => {
        debugger;
        this.bookmarkMessage = 'Bookmark saved successfully!';
        this.bookmarkError = '';
      },
      error: err => {
        debugger;
        this.bookmarkError = 'Failed to save bookmark.';
        this.bookmarkMessage = '';
        console.error('Error saving bookmark', err);
      }
    });
  }

}
