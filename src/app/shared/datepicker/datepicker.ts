import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-datepicker',
  imports: [ CommonModule,   ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss'
})
export class Datepicker implements OnInit, OnDestroy {
  dateControl = new FormControl<Date | null>(null);
  useNative = false;            // true on touch devices -> use native <input type="date">
  nativeValue: string | null = null;
  private sub?: Subscription;

  ngOnInit(): void {
    this.useNative = this.isTouchDevice();
    // keep native input in sync when dateControl changes (desktop -> mobile sync)
    this.sub = this.dateControl.valueChanges.subscribe(v => {
      if (v instanceof Date && !isNaN(v.getTime())) {
        this.nativeValue = this.toInputDate(v);
      } else {
        this.nativeValue = null;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  /** Handler when user changes the native date input (mobile) */
  onNativeChange(value: string | null) {
    if (!value) {
      this.dateControl.setValue(null);
      return;
    }
    // value format is "YYYY-MM-DD" -> create Date using local date parts to avoid timezone issues
    const [y, m, d] = value.split('-').map(v => Number(v));
    const date = new Date(y, m - 1, d);
    this.dateControl.setValue(date);
  }

  /** Format a JS Date -> YYYY-MM-DD for native input value */
  private toInputDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  /** Robust touch-device detection: navigator.maxTouchPoints, any-pointer:coarse, fallback to ontouchstart */
  private isTouchDevice(): boolean {
    try {
      // navigator.maxTouchPoints is best when available
      if (typeof navigator !== 'undefined' && 'maxTouchPoints' in navigator) {
        // @ts-ignore
        if ((navigator as any).maxTouchPoints > 0) { return true; }
      }
      // any-pointer / pointer media queries
      if (typeof window !== 'undefined' && window.matchMedia) {
        if (window.matchMedia('(any-pointer: coarse)').matches) { return true; }
      }
      // last fallback
      return 'ontouchstart' in window;
    } catch {
      return false;
    }
  }
}
