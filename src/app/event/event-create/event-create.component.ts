import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  eventForm: FormGroup;
  location: any;
  @ViewChild('city', { static: true }) citySearch: ElementRef;
  constructor(
    private fb: FormBuilder,
    private gmaps: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.createForm();

    this.gmaps.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.citySearch.nativeElement,
        {
          types: ['(cities)'],
          componentRestrictions: { country: 'uk' }
        }
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          this.location = autocomplete.getPlace();
        });
      });
    });
  }

  createForm() {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      suggestLocations: [false, Validators.required]
    });
  }
}
