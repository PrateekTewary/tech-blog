import { Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MarkdownModule],
  providers: [provideMarkdown()],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  public content: string = '';

  private subscription = new Subscription();
  private TOKEN: string = ''; // iske bina code ni chlega, baad me mrko mat bolna
  private BASEURL: string = 'https://api.github.com'; // base url

  constructor(private http: HttpClient) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.buildRoute('hs831', 'hs831', 'README.md').subscribe((result) => {
        this.content = atob(result.content);
      })
    )
  }

  // move this in service layer
  // otherwise you will become idiot.
  private buildRoute(owner: string, repo: string, path: string): Observable<any> {
    let url = `${this.BASEURL}/repos/${owner}/${repo}/contents/${path}`;
    const headers = new HttpHeaders({
      Authorization: this.TOKEN,
      accept: 'application/vnd.github+json'
    })
    return this.http.get(url, {headers});
  }
}
