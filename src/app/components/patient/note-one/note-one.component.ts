import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator, PageEvent, MatTableDataSource } from '@angular/material';
import { BusService } from '../../../services/bus.service';
import { EventsService } from '../../../services/events.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-one',
  templateUrl: './note-one.component.html',
  styleUrls: ['./note-one.component.scss']
})
export class NoteOneComponent implements OnInit, OnDestroy {
  public model: any = {note: {}};

  constructor(
    private bus: BusService,
    private events: EventsService,
    private router: Router
  ) {}
  public setData (data): void {
    this.model = data;
  }
  public edit (): void {
    this.router.navigate([`edit-note/${localStorage.getItem('noteId')}`]);
  }
  public delete (data): void {
    this.bus.publish(this.events.requested.data.note.delete);
  }
  // subscribe on validation success/failure
  public subscribe(): void {
    this.bus.subscribe(this.events.received.note.one.success, this.setData, this);
  }

   // unsubscribe on validation success/failure
  public unSubscribe(): void {
    this.bus.unsubscribe(this.events.received.note.one.success, this.setData);
  }

   // make subscribe on a component initialization
  public ngOnInit(): void {
    this.bus.publish(this.events.requested.data.note.one);
    this.subscribe();
  }

   // make unsubscribe before destroying component
  public ngOnDestroy(): void {
    this.unSubscribe();
  }
}
