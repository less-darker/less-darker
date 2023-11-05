import { Component, OnInit } from '@angular/core';
import { Sockets } from '@foxglove/electron-socket/renderer';

@Component({
  selector: 'app-ping-tester',
  templateUrl: './ping-tester.component.html',
  styleUrls: ['./ping-tester.component.css']
})
export class PingTesterComponent implements OnInit {
  constructor() {
  }

  ping = 0;
  darkSocket: Sockets;

  ngOnInit() {
    // this.setupDarkSocket()
  }

  setupDarkSocket() {
    console.log('inside setupDarkSocket');
  }
}
