import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private BASEURL: string = 'https://api.github.com'; // base url

  constructor(private http: HttpClient) { }

  public getRepoContents(owner: string, repo: string, path: string, branch: string = 'main'): Observable<any> {
    let url = encodeURI(`${this.BASEURL}/repos/${owner}/${repo}/contents/${path}?ref=${branch}`);
    const headers = new HttpHeaders({
      accept: 'application/vnd.github+json'
    })
    return this.http.get(url, {headers});
  }

}
