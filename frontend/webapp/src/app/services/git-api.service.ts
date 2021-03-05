import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GitApiService {

    urlBasePath = 'http://127.0.0.1:8000/'

    constructor(private http: HttpClient){}

        getBranches(callback){
            this.http.get(this.urlBasePath+'branches/')
                .subscribe(
                    res => {
                        callback(null, res);
                    },
                    err => {
                        callback('http error', null);
                    }
                )
        }

        getBranch(branch_name:string, callback){
            this.http.get(this.urlBasePath+'branch/'+branch_name)
                .subscribe(
                    res => {
                        callback(null, res);
                    },
                    err => {
                        callback('http error', null);
                    }
                )
        }

        getCommit(commit_hexsha:string, callback){
            this.http.get(this.urlBasePath+'commit/'+commit_hexsha)
                .subscribe(
                    res => {
                        callback(null, res);
                    },
                    err => {
                        callback('http error', null);
                    }
                )
        }

}
