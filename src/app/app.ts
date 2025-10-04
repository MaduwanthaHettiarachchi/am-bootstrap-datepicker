import { Component, signal } from '@angular/core';
import { Datepicker } from "./shared/datepicker/datepicker";

@Component({
  selector: 'app-root',
  imports: [Datepicker],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('am-bootstrap-datepicker');
}
