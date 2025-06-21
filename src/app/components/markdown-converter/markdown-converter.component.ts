import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";
import {marked} from "marked";

@Component({
  selector: 'markdown-converter',
  imports: [
    FormsModule
  ],
  templateUrl: './markdown-converter.component.html',
  styleUrl: './markdown-converter.component.scss'
})
export class MarkdownConverterComponent {

  @Output() onBodyMarkdownChange = new EventEmitter<string>();
  @Output() onBodyHtmlChange = new EventEmitter<string>();

  @Input() bodyMarkdownErrors: string[] = [];
  @Input() bodyMarkdown: string = '';
  @Input() bodyHtml: string = '';

  constructor(protected sanitizer: DomSanitizer) {
  }

  protected async onMdInputChange(): Promise<void> {
    this.bodyHtml = await marked.parse(this.bodyMarkdown);
    this.onBodyMarkdownChange.emit(this.bodyMarkdown);
    this.onBodyHtmlChange.emit(this.bodyHtml);
  }

}
