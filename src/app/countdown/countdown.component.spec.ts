import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TextFittingAlgorithmService } from './text-fitting-algorithm.service';
import { getTimeRemaining } from './countdown.utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let textFittingAlgorithmService: TextFittingAlgorithmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountdownComponent,
        ReactiveFormsModule,
        MatDatepickerModule,
        CountdownComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        CommonModule,
      ],
      providers: [
        TextFittingAlgorithmService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    textFittingAlgorithmService = TestBed.inject(TextFittingAlgorithmService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with local storage values if available', () => {
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'eventTitle') return 'Test Event';
      if (key === 'eventDate') return new Date('2025-06-21').toISOString();
      return null;
    });

    component.ngOnInit();

    expect(component.titleFormControl.value).toBe('Test Event');
    expect(component.dateFormControl.value).toEqual(new Date('2025-06-21'));
  });

  it('should adjust font size when title changes', fakeAsync(() => {
    spyOn(textFittingAlgorithmService, 'adjustFontSizeToFit');
  
    component.titleFormControl.setValue('New Title');
    fixture.detectChanges();
  
    tick(1000);
    fixture.detectChanges();
  
    expect(textFittingAlgorithmService.adjustFontSizeToFit).toHaveBeenCalledWith(component.titleRef);
  }));

  it('should start the countdown timer on initialization', () => {
    spyOn(window as any, 'setInterval').and.callFake((fn: any) => {
      fn(); 
      return 1234; 
    });

    component.ngOnInit();
    expect(component.isLoading).toBeFalse();
    expect(component.timeRemaining).toBe(getTimeRemaining(component.dateFormControl.value));
  });

  it('should adjust font sizes on window resize', () => {
    spyOn(component as any, 'adjustEventFontSize').and.callThrough();

    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();

    expect(component['adjustEventFontSize']).toHaveBeenCalled();
  });

  it('should open the date picker when openDatepicker is called', () => {
    spyOn(component.datepicker, 'open');

    component.openDatepicker();
    expect(component.datepicker.open).toHaveBeenCalled();
  });
});
