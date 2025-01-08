import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Subscription, throwError } from 'rxjs';
import { markdownConverter } from '../classes/markdown-helper';
import { AppService } from '../app.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent implements OnInit {
  public content: string = '';

  private owner: string = "PrateekTewary";
  private repoName: string = "tech-blog-content";
  private branchName: string = "blogs";

  private subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute,
    private appService: AppService
  ) {}

  ngOnInit(): void {  
    this.loadData();
  }

  private loadData(): void {
    const type = this.activatedRoute.snapshot.paramMap.get('type');
    const path: string = `job-roles/content/${type}.md`;

    this.subscription.add(
        this.appService.getRepoContents(this.owner, this.repoName, path, this.branchName).pipe(
          catchError(error => {
            return throwError(() => { return error });
          })
        ).subscribe((result) => {
          this.content = atob(result.content); 
        })
      )
    
  }
}
