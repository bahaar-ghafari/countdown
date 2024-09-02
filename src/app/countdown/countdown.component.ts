import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  AfterViewInit,
} from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker'
import { Subject } from 'rxjs'
import { debounceTime, takeUntil } from 'rxjs/operators'

import { TextFittingAlgorithmService } from './text-fitting-algorithm.service'
import { getLocalStorageItem, setLocalStorageItem } from '../app.utils'
import { getTimeRemaining } from './countdown.utils'

import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { provideNativeDateAdapter } from '@angular/material/core'

@Component({
  selector: 'app-countdown',
  standalone: true,
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class CountdownComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly MIDSUMMER_ENV_DATE = '2025-06-21'
  private readonly UPDATE_LOCALSTORAGE = 1000
  private readonly UPDATE_INTERVAL = 1000

  private destroy$ = new Subject<void>()

  targetDate: Date = new Date(this.MIDSUMMER_ENV_DATE)
  timeRemaining = ''

  isLoading = true

  titleFormControl = new FormControl<string>('Midsummer Eve')
  dateFormControl = new FormControl<Date>(this.targetDate)

  @ViewChild('datepicker') datepicker!: MatDatepicker<Date>
  @ViewChild('titleRef', { static: true }) titleRef!: ElementRef
  @ViewChild('timeRef', { static: true }) timeRef!: ElementRef

  constructor(
    private TextFittingAlgorithmService: TextFittingAlgorithmService,
  ) {}

  ngOnInit() {
    this.initializeForm()
    this.subscribeToFormChange()
    this.startCountDownTimer()
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustEventFontSize()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.adjustEventFontSize()
    }, 1000)

  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private initializeForm() {
    const eventTitle = getLocalStorageItem('eventTitle')
    const eventDate = getLocalStorageItem('eventDate')

    if (eventTitle && eventDate) {
      this.titleFormControl.setValue(eventTitle)
      this.dateFormControl.setValue(new Date(eventDate))

      getTimeRemaining(this.dateFormControl.value)
    }
  }

  private subscribeToFormChange() {
    this.handleTitleChange()
    this.handleDateChange()
  }

  public startCountDownTimer() {
    setInterval(() => {
      const date = this.dateFormControl.value

      if (date) {
        this.timeRemaining = getTimeRemaining(date)
      }
      if (this.isLoading) {
        this.isLoading = false
      }
    }, this.UPDATE_INTERVAL)
  }

  handleTitleChange() {
    this.titleFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          setLocalStorageItem('eventTitle', value)
          this.TextFittingAlgorithmService.adjustFontSizeToFit(this.titleRef)
        }
      })
  }

  handleDateChange() {
    this.dateFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          setLocalStorageItem('eventDate', value.toISOString())
          getTimeRemaining(value)
        }
      })
  }

  openDatepicker() {
    this.datepicker.open()
  }

  private adjustEventFontSize() {
    this.TextFittingAlgorithmService.adjustFontSizeToFit(this.titleRef)
    this.TextFittingAlgorithmService.adjustFontSizeToFit(this.timeRef)
  }
}
