import { Component } from '@angular/core';
import { DataService } from './data.service';
import { GlobalService } from './global.service';

@Component({
  selector: 'app-routing',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[DataService, GlobalService]
})
export class AppComponent {
  title = 'app works!';
}
