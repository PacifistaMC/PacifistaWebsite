import {Component, OnInit} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Component({ template: ''})
export abstract class PacifistaPage implements OnInit {

  protected title: string = '';
  protected canonicalPath: string = '';
  protected pageDescription: string = "Pacifista, le serveur Minecraft français survie en 1.21 ! Rejoignez une communauté bienveillante avec un staff à l'écoute !";
  protected pageImage: string = 'https://pacifista.fr/assets/img/pacifista-logo.webp';

  /**
   * seo
   * @param titleService the titleServiceManager
   * @param doc Inject(DOCUMENT) private doc: Document
   */
  constructor(protected titleService: Title,
              private doc: Document) {
  }

  ngOnInit(): void {
    this.onPageInit(() => {
        this.updateTitle();
        this.updateCanonicalPath();
        this.updateMetaTags();
    });
  }

  protected onPageInit(callback: () => void = () => {}): void {
    callback();
  }

  private updateTitle(): void {
    const prefix = this.title.length > 0 ? this.title + ' - ' : '';
    this.titleService.setTitle(prefix + 'Pacifista Minecraft - Serveur Survie français en 1.21');
  }

  private updateCanonicalPath(): void {
    const canonical = this.doc.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://pacifista.fr/' + this.canonicalPath);
    this.doc.head.appendChild(canonical);
  }

  private updateMetaTags(): void {
    this.setMetaTag('description', this.pageDescription)

    this.setMetaTag('og:title', this.titleService.getTitle());
    this.setMetaTag('og:description', this.pageDescription);
    this.setMetaTag('og:image', this.pageImage);
    this.setMetaTag('og:url', 'https://pacifista.fr/' + this.canonicalPath);

    this.setMetaTag('twitter:title', this.titleService.getTitle());
    this.setMetaTag('twitter:description', this.pageDescription);
    this.setMetaTag('twitter:image', this.pageImage);
    this.setMetaTag('twitter:url', 'https://pacifista.fr/' + this.canonicalPath);
  }

  private setMetaTag(name: string, content: string): void {
    const meta = this.doc.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('property', name);
    meta.setAttribute('content', content);
    this.doc.head.appendChild(meta);
  }

}
