import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [GlobalService]
})
export class ProfileComponent implements OnInit {

  constructor(private globalService: GlobalService, private dataService: DataService, private router:Router) { }
  profile: any;
  ngOnInit() {
    this.getServiceData();
  }

 getServiceData(){
    this.globalService.getProfile()
        .subscribe(
                    response => {
                      this.profile = response;
                      console.log(response);
                    },
                    error => {
                      if(error.status == 401) {
                        //Remove Token if exists
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        console.log("Token has expired Get new token and save it in local storage");
                    // Token has expired Get new token and save it in local storage
                        this.dataService.Oauth()
                        .subscribe(data => {
                            this.globalService.getProfile();
                        })
                      } else if(error.status == 403) {
                        //Remove Token if exists
                        localStorage.removeItem('refresh-token-set');
                        localStorage.removeItem('token-set');
                        console.log("Need to get authorized token to access the service, redirect to login page");
                      // Need to get authorized token to access the service, redirect to login page
                        this.router.navigate(['/']); 
                      }                   
                    }
          );
  }
}
