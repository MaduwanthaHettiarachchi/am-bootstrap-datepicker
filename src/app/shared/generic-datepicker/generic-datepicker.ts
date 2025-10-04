import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generic-datepicker',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './generic-datepicker.html',
  styleUrl: './generic-datepicker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericDatepicker),
      multi: true
    }
  ]
})
export class GenericDatepicker implements ControlValueAccessor, OnInit, OnDestroy {
  /** Label for the field */
  @Input() label: string = 'Select date';

  /** Placeholder text */
  @Input() placeholder: string = '';

  /** Min and Max dates (optional) */
  @Input() minDate?: Date;
  @Input() maxDate?: Date;

  /** Disable input */
  @Input() disabled = false;

  /** Material appearance type */
  @Input() appearance: 'fill' | 'outline' = 'fill';


  useNative = false;
  nativeValue: string | null = null;
  value: Date | null = null;

  private onChangeFn: (value: Date | null) => void = () => { };
  onTouchedFn: () => void = () => { };
  private sub?: Subscription;

  ngOnInit() {
    this.useNative = this.isTouchDevice();
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // ----- ControlValueAccessor Implementation -----
  writeValue(value: Date | null): void {
    this.value = value;
    this.nativeValue = value ? this.toInputDate(value) : null;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ----- Event handlers -----
  onMaterialChange(date: Date | null): void {
    this.value = date;
    this.nativeValue = date ? this.toInputDate(date) : null;
    this.onChangeFn(date);
  }

  onNativeChange(value: string | null): void {
    if (!value) {
      this.value = null;
      this.onChangeFn(null);
      return;
    }
    const [y, m, d] = value.split('-').map(v => Number(v));
    const date = new Date(y, m - 1, d);
    this.value = date;
    this.onChangeFn(date);
  }

  // ----- Utility -----
  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private isTouchDevice(): boolean {
    try {
      if ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0) return true;
      if (window.matchMedia && window.matchMedia('(any-pointer: coarse)').matches) return true;
      return 'ontouchstart' in window;
    } catch {
      return false;
    }
  }

}
