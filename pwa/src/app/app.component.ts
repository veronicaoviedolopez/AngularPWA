import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessagingService } from './core/services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pwa';
  message: any = null;
  constructor(private swUpdate: SwUpdate,
              private msgService: MessagingService) {}
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe((v) => {
        if (confirm('Actualización disponible, deseas obtenerla?')) {
          window.location.reload();
        }
      });
    }
    this.msgService.getPermission();
    this.msgService.receiveMessage();
    this.message = this.msgService.currentMessage;
  }
}
