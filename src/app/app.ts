import { Component, signal } from '@angular/core';
import { Datepicker } from "./shared/datepicker/datepicker";
import { GenericDatepicker } from "./shared/generic-datepicker/generic-datepicker";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ReactiveFormsModule, GenericDatepicker,FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('am-bootstrap-datepicker');

  selectedDate: Date | null = null;
  minDate = new Date(2023, 0, 1);
  maxDate = new Date(2026, 11, 31);
}
