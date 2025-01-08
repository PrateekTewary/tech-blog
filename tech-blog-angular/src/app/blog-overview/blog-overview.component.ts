import { Component } from '@angular/core';
import { catchError, Subscription, throwError } from 'rxjs';
import { AppService } from '../app.service';
import { Router, RouterOutlet } from '@angular/router';
import { markdownConverter } from '../classes/markdown-helper';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule, provideMarkdown } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-overview',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, MarkdownModule, CommonModule],
  providers: [provideMarkdown()],
  templateUrl: './blog-overview.component.html',
  styleUrl: './blog-overview.component.scss'
})
export class BlogOverviewComponent {
public content: string = '';
    public sections: { heading: string; content: string; type: string }[] = [];

    private owner: string = "PrateekTewary";
    private repoName: string = "tech-blog-content";
    private branchName: string = "1.initial-trials";

    private subscription = new Subscription();

    constructor(private appService: AppService,
      private router: Router
    ) {}

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    ngOnInit(): void {
      const path: string = "1.job-roles/overview/overview.md";
      this.loadData(path);
    }

    public goToDetailsPage(section: any): void {
      this.router.navigateByUrl(`details/${section.type}`);
    }

    private loadData(path: string): void {
      this.subscription.add(
        this.appService.getRepoContents(this.owner, this.repoName, path, this.branchName).pipe(
          catchError(error => {
            return throwError(() => { return error });
          })
        ).subscribe((result) => {
          this.content = atob(result.content); 
          this.sections = markdownConverter(this.content);    
        })
      )
    }
}
