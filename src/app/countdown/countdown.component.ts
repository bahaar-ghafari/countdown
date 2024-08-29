import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [FormsModule,MatFormField,MatLabel],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit {
  eventTitle = 'Midsummer Eve';
  targetDate: string = '2025-06-21';
  timeRemaining = '';

  ngOnInit() {
    this.updateCountdown();
    setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date().getTime();
    const targetDateTime = new Date(this.targetDate).getTime();
    const distance = targetDateTime - now;

    if (distance < 0) {
      this.timeRemaining = 'The event has passed!';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    this.timeRemaining = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}
