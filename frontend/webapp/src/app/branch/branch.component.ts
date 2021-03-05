import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GitApiService } from '../services/git-api.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit, OnDestroy {

    branch_name;
    commits;
    params_subscription;

  constructor(private apiService: GitApiService, private route: ActivatedRoute,
                private router: Router) { }

  ngOnInit(): void {

      this.params_subscription = this.route.params.subscribe((params) => {
          this.branch_name = this.route.snapshot.params['branch']

          this.apiService.getBranch( this.branch_name, (err, res) => {
              if(err){
                  console.log(err)
              }
              else{
                  this.commits = res.commits;
              }
          })
      });

  }

  ngOnDestroy(): void {
      this.params_subscription.unsubscribe();
  }

}
