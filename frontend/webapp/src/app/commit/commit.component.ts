import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GitApiService } from '../services/git-api.service';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.css']
})
export class CommitComponent implements OnInit, OnDestroy {

    commit_hexsha;
    params_subscription;
    commit;
    loading = true;

  constructor(private apiService: GitApiService, private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {

      this.params_subscription = this.route.params.subscribe((params) => {
          this.commit_hexsha = this.route.snapshot.params['commit']

          this.apiService.getCommit( this.commit_hexsha, (err, res) => {
              if(err){
                  console.log(err)
              }
              else{
                  this.commit = res.commit;
              }
              this.loading = false;
          })
      });

  }

  ngOnDestroy(): void {
      this.params_subscription.unsubscribe()
  }

}
