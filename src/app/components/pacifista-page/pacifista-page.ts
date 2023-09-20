import {Component, OnInit, Renderer2} from "@angular/core";
import {Title} from "@angular/platform-browser";

@Component({ template: ''})
export abstract class PacifistaPage implements OnInit {

  protected title: string = '';
  protected canonicalPath: string = '';
  protected pageDescription: string = "Bienvenue sur Pacifista, le serveur Minecraft français survie créatif en 1.19 ! Rejoignez une communauté bienveillante, profitez d'un staff attentif et découvrez nos plugins faits maison.";
  protected pageImage: string = 'https://pacifista.fr/assets/img/pacifista-logo.webp';

  constructor(protected titleService: Title,
              protected renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.updateTitle();
    this.updateCanonicalPath();
    this.updateMetaTags();
    this.onPageInit();
  }

  protected onPageInit() {
  }

  private updateTitle(): void {
    const prefix = this.title.length > 0 ? this.title + ' - ' : '';
    this.titleService.setTitle(prefix + 'Pacifista Minecraft - Serveur Minecraft Survie Creatif Français en 1.19');
  }

  private updateCanonicalPath(): void {
    const canonical = this.renderer.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    canonical.setAttribute('href', 'https://pacifista.fr/' + this.canonicalPath);
    this.renderer.appendChild(document.head, canonical);
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
    const meta = this.renderer.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('property', name);
    meta.setAttribute('content', content);
    this.renderer.appendChild(document.head, meta);
  }

}
