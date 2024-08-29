import { Component } from '@angular/core';
import { CountdownComponent } from './countdown/countdown.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet,CountdownComponent],
})
export class AppComponent {
  title = 'countdown';
}
