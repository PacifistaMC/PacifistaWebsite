import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import WorldDlLogsService from "./world-dl-logs.service";

@Component({
  selector: 'app-world-dl-logs',
  standalone: false,
  templateUrl: './world-dl-logs.component.html',
  styleUrl: './world-dl-logs.component.scss'
})
export class WorldDlLogsComponent implements AfterViewChecked {

  @ViewChild('logContainer') private logContainer?: ElementRef<HTMLDivElement>;

  constructor(public readonly service: WorldDlLogsService) {}

  ngAfterViewChecked(): void {
    // auto-scroll en bas quand la taille change
    this.scrollToBottom();
  }

  trackByIndex(index: number): number { return index; }

  private scrollToBottom(): void {
    const el = this.logContainer?.nativeElement;
    if (!el) return;
    // Scroll seulement si on est proche du bas (pour éviter de remonter l'utilisateur)
    const threshold = 40;
    const isNearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    if (isNearBottom) {
      el.scrollTop = el.scrollHeight;
    }
  }
}
