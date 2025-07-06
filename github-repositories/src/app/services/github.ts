import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/token`);
  }

  searchRepositories(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/github/search?q=${query}`);
  }



  getBookmarks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/github/getbookmarks`, {
      withCredentials: true
    });

  }

  addBookmark(repo: any): Observable<any> {
    const bookmark = {
      id: repo.id,
      name: repo.name,
      fullName: repo.full_name,
      htmlUrl: repo.html_url,
      description: repo.description,
      ownerLogin: repo.owner.login,
      ownerAvatarUrl: repo.owner.avatar_url
    };
    const token = sessionStorage.getItem('jwt') || '';
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.apiUrl}/github/addbookmark`, bookmark, {
      withCredentials: true
    });
  }

}
