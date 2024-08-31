import { Component } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ CountdownComponent],
})
export class AppComponent {}
