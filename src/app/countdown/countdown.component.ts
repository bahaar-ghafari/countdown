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

  loading = true

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
    this.adjustTitleFontSize()
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.adjustTitleFontSize()
      this.loading = false
    }, 1000)
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  private initializeForm() {
    const eventTitle = this.getLocalStorageItem('eventTitle')
    const eventDate = this.getLocalStorageItem('eventDate')

    if (eventTitle && eventDate) {
      this.titleFormControl.setValue(eventTitle)
      this.dateFormControl.setValue(new Date(eventDate))

      this.updateCountdown(this.dateFormControl.value)
    }
  }

  private subscribeToFormChange() {
    this.handleTitleChange()
    this.handleDateChange()
  }

  private startCountDownTimer() {
    setInterval(() => {
      const date = this.dateFormControl.value

      if (date) {
        this.timeRemaining = this.updateCountdown(date)
      }
      this.loading = false
    }, this.UPDATE_INTERVAL)
  }

  setLocalStorageItem(key: string, title: string) {
    localStorage.setItem(key, title)
  }

  getLocalStorageItem(key: string) {
    return localStorage.getItem(key)
  }

  handleTitleChange() {
    this.titleFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.setLocalStorageItem('eventTitle', value)
          this.adjustTitleFontSize()
        }
      })
  }

  handleDateChange() {
    this.dateFormControl.valueChanges
      .pipe(debounceTime(this.UPDATE_LOCALSTORAGE), takeUntil(this.destroy$))
      .subscribe((value) => {
        if (value) {
          this.setLocalStorageItem('eventDate', value.toISOString())

          this.updateCountdown(value)
        }
      })
  }

  openDatepicker() {
    this.datepicker.open()
  }

  updateCountdown(targetDate: Date | null): string {
    if (!targetDate) return ''
    const now = new Date().getTime()
    const distance = targetDate.getTime() - now

    if (distance < 0) {
      return 'The event has passed!'
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    return `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }

  private adjustTitleFontSize() {
      this.TextFittingAlgorithmService.adjustFontSizeToFit(this.titleRef)
      this.TextFittingAlgorithmService.adjustFontSizeToFit(this.timeRef)

  }
}
