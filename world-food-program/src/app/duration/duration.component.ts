import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css']
})
export class DurationComponent implements OnInit {
  timeForm = this.fb.group({
    startDate: ['', Validators.required],
    endDate: [''],
    duration: ['']
  });
  @Output() durationEvent = new EventEmitter<any>();
  disabled = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  get startDate() {
    return this.timeForm.get("startDate");
  }
  get endDate() {
    return this.timeForm.get("endDate");
  }
  get duration() {
    return this.timeForm.get("duration");
  }

  getDuration() {
    if (this.startDate?.value && this.endDate?.value && !this.duration?.value) {
      let time = this.endDate?.value.getTime() - this.startDate?.value.getDate();
      this.duration?.setValue(time / (1000 * 3600 * 24));
      this.disabled = !this.disabled;
    }
  }

  durationToProject() {
   this.durationEvent.emit(this.timeForm);
  }

}