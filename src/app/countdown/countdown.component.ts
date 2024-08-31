import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  providers: [provideNativeDateAdapter()],
})
export class CountdownComponent implements OnInit, OnDestroy {
  private readonly MIDSUMMER_ENV_DATE = '2025-06-21';
  private readonly UPDATE_LOCALSTORAGE = 1000;
  private readonly UPDATE_INTERVAL = 1000;

  private destroy$ = new Subject<void>();

  targetDate: Date = new Date(this.MIDSUMMER_ENV_DATE);
  timeRemaining = '';

  loading = false;
  errorMessage: string | null = null;

  titleFormControl = new FormControl<string>('Midsummer Eve');
  dateFormControl = new FormControl<Date>(this.targetDate);

  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>;

  ngOnInit() {
    this.loading = true;
    this.initializeForm();
    this.subscribeToFormChange();
    this.startCountDownTimer();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm() {
    try {
      const eventTitle = this.getLocalStorageItem('eventTitle');
      const eventDate = this.getLocalStorageItem('eventDate');

      if (eventTitle && eventDate) {
        this.titleFormControl.setValue(eventTitle);
        this.dateFormControl.setValue(new Date(eventDate));

        this.updateCountdown(this.dateFormControl.value);
      }
    } finally {
      this.loading = false;
    }
  }

  private subscribeToFormChange() {
    this.handleTitleChange();
    this.handleDateChange();
  }

  private startCountDownTimer() {
    setInterval(() => {
      const date = this.dateFormControl.value;

      if (date) {
        this.timeRemaining = this.updateCountdown(date);
      }
    }, this.UPDATE_INTERVAL);
  }

  setLocalStorageItem(key: localStorageKey, title: string) {
    localStorage.setItem(key, title);
  }

  getLocalStorageItem(key: localStorageKey) {
    return localStorage.getItem(key);
  }

  handleTitleChange() {
    this.titleFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (value) this.setLocalStorageItem('eventTitle', value);
        },
        error: () => (this.errorMessage = 'Failed to update Title'),
      });
  }

  handleDateChange() {
    this.dateFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          if (value) {
            this.setLocalStorageItem('eventDate', value.toISOString());

            this.updateCountdown(value);
          }
        },
        error: () => (this.errorMessage = 'Failed to update Date'),
      });
  }

  openDatepicker() {
    this.datepicker.open();
  }

  updateCountdown(targetDate: Date | null): string {
    if (!targetDate) return '';
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      return 'The event has passed!';
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`;
  }
}

type localStorageKey = 'eventTitle' | 'eventDate';
