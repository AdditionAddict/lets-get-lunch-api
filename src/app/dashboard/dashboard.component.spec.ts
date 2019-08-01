import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { DashboardModule } from './dashboard.module';
import { AuthService } from '../services/auth/auth.service';
import { EventsService } from '../services/events/events.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Event } from '../services/events/event';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

const currentUser = {
  _id: '5a55135639fbc4ca3ee0ce5a',
  username: 'myUser'
};

const events: Array<Event> = [
  {
    _creator: '5a550ea739fbc4ca3ee0ce58',
    title: 'My First Event',
    description: 'My First Description',
    city: 'Atlanta',
    state: 'GA',
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    __v: 0,
    suggestLocations: true,
    _id: '5a55135639fbc4ca3ee0ce5a',
    members: ['5a550ea739fbc4ca3ee0ce58']
  }
];

class MockAuthService {
  currentUser = jasmine
    .createSpy('currentUser')
    .and.callFake(() => currentUser);
}

class MockEventsService {
  getUserEvents = jasmine
    .createSpy('currentUser')
    .and.callFake(() => of(events));
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authService: AuthService;
  let eventsService: EventsService;
  let viewDateElement: DebugElement[];
  let calendarEventElement: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DashboardModule,
        RouterTestingModule.withRoutes([
          { path: 'event', redirectTo: '/event' }
        ])
      ]
    })
      .overrideComponent(DashboardComponent, {
        set: {
          providers: [
            { provide: AuthService, useClass: MockAuthService },
            { provide: EventsService, useClass: MockEventsService }
          ]
        }
      })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;

    authService = fixture.debugElement.injector.get(AuthService);
    eventsService = fixture.debugElement.injector.get(EventsService);
    spyOn(component, 'addEventColors').and.callThrough();
    spyOn(component, 'addJSDate').and.callThrough();

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      viewDateElement = fixture.debugElement.queryAll(
        By.css('.toggle-view .btn-primary')
      );
      calendarEventElement = fixture.debugElement.queryAll(
        By.css('.cal-event')
      );
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // tslint:disable-next-line: quotemark
  it("should initialise with a call to get the current user's events", () => {
    expect(authService.currentUser).toHaveBeenCalled();
    expect(eventsService.getUserEvents).toHaveBeenCalledWith(
      '5a55135639fbc4ca3ee0ce5a'
    );
    expect(component.addJSDate).toHaveBeenCalled();
    expect(component.addEventColors).toHaveBeenCalled();
    expect(component.events.length).toEqual(1);
  });

  it('should default the calendar to a week view', () => {
    expect(viewDateElement[0].classes.active).toEqual(false);
    expect(viewDateElement[1].classes.active).toEqual(true);
    expect(viewDateElement[2].classes.active).toEqual(false);
  });

  it('should display events within the current week in the calendar', () => {
    expect(
      calendarEventElement[0].nativeElement.textContent
    ).toContain('My First Event');
  });

  describe('addJSDate', () => {
    it('should add a start and end property to the events', () => {
      const result = component.addJSDate(events);
      expect(result[0].start).toEqual(jasmine.any(Date));
      expect(result[0].end).toEqual(jasmine.any(Date));
    });
  });

  describe('addEventColors', () => {
    it('should add a color property to an event', () => {
      const result = component.addEventColors(events);
      expect(result[0].color).toBeDefined();
    });
  });
});
