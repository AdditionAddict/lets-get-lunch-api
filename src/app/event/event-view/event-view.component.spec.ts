import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { EventViewComponent } from './event-view.component';
import { Event } from 'src/app/services/events/event';
import { EventsService } from 'src/app/services/events/events.service';
import { HttpBackend } from '@angular/common/http';

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get', () => {
    it('should return an event with a valid event id', () => {
      const eventId = '5a55135639fbc4ca3ee0ce5a';
      const eventResponse: Event = {
        _id: '5a55135639fbc4ca3ee0ce5a',
        _creator: '5a550ea739fbc4ca3ee0ce58',
        title: 'My frist event',
        description: 'My first description',
        city: 'Atlanta',
        state: 'GA',
        startTime: '2018-01-09T19:00:00.000Z',
        endTime: '2018-01-09T20:00:00.000Z',
        __v: 0,
        suggestLocations: true,
        members: [
          {
            _id: '5a55135639fbc4ca3ee0ce5a',
            username: 'newUser',
            __v: 0,
            dietPreferences: []
          }
        ]
      };
      let response;

      EventsService.get(eventId).subscribe(res => {
        response = res;
      });

      http
        .expectOne('http://localhost:8080/api/events/' + eventId)
        .flush(eventResponse);
      expect(response).toEqual(eventResponse);
      http.verify();
    });
  });
});
