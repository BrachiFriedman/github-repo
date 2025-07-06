import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { GithubService } from '../../services/github';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatButtonModule],

  template: `
    <nav style="padding: 10px; background: #f3f3f3;">
      <button mat-button routerLink="/search"> Search</button>
      <button mat-button routerLink="/bookmarks"> Bookmarks</button>
    </nav>
    <router-outlet></router-outlet>`
})

export class RootComponent implements OnInit {
  constructor(private githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getToken().subscribe(res => {
      console.log('Token loaded', res.token);
      sessionStorage.setItem('jwt', res.token);
    });
  }
}
