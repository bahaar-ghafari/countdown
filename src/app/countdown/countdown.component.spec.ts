import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CountdownComponent,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        CommonModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial form values', () => {
    const titleControl = component.titleFormControl;
    const dateControl = component.dateFormControl;

    expect(titleControl.value).toBe('Midsummer Eve');
    expect(dateControl.value).toEqual(new Date('2025-06-21'));
  });

  it('should update localStorage when title changes', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    component.titleFormControl.setValue('New Event');
    tick(1000);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'eventTitle',
      'New Event',
    );
  }));

  it('should update localStorage when date changes', fakeAsync(() => {
    spyOn(localStorage, 'setItem');
    const newDate = new Date('2025-07-01');
    component.dateFormControl.setValue(newDate);
    tick(1000);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'eventDate',
      newDate.toISOString(),
    );
  }));

  it('should calculate the correct time remaining', () => {
    const targetDate = new Date(Date.now() + 86400000); // 1 day in the future
    const result = component.updateCountdown(targetDate);

    expect(result).toContain('1 days');
  });

  it('should return "The event has passed!" if the target date is in the past', () => {
    const targetDate = new Date(Date.now() - 86400000); // 1 day in the past
    const result = component.updateCountdown(targetDate);

    expect(result).toBe('The event has passed!');
  });

  it('should show loading spinner initially', () => {
    component.loading = true;
    fixture.detectChanges();

    const spinner = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinner).toBeTruthy();
  });
});
