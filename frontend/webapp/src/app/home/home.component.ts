import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { GitApiService } from '../services/git-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

    branches = []
    selected_branch;
    router_subscription;

  constructor(private apiService: GitApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

      this.apiService.getBranches((err, res) => {
          if(err){
              console.log(err)
          }
          else{
              this.branches = res.branches;
              // console.log(this.branches)
          }
      })

      if(this.route.snapshot.firstChild){
          this.selected_branch = this.route.snapshot.firstChild.params['branch']
      }

      this.router_subscription = this.router.events.subscribe(event => {
          if(event instanceof NavigationEnd) {
              if(this.route.snapshot.firstChild){
                  this.selected_branch = this.route.snapshot.firstChild.params['branch']
              }
              else{
                  this.selected_branch = null
              }
          }
      });
  }

  ngOnDestroy(){
      this.router_subscription.unsubscribe();
  }

  onSelectBranch(branch){
      this.selected_branch = branch;
  }

}
