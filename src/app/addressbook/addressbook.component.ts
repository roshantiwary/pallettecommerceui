import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.css'],
  providers: [GlobalService]
})
export class AddressbookComponent implements OnInit {

constructor(private dataService: DataService, private globalService: GlobalService, private router:Router) { }

  ngOnInit() {
  }

}
