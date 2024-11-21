import {Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild} from '@angular/core';
import {UserCountry} from "@funixproductions/funixproductions-requests";

@Component({
    selector: 'app-user-country-select',
    templateUrl: './user-country-select.component.html',
    styleUrl: './user-country-select.component.scss'
})
export class UserCountrySelectComponent {

    private readonly ALL_COUNTRIES: UserCountry[] = [
        new UserCountry('France', 250, 'FR', 'FRA'),
        new UserCountry('Belgique', 56, 'BE', 'BEL'),
        new UserCountry('Canada', 124, 'CA', 'CAN'),
        new UserCountry('Suisse', 756, 'CH', 'CHE'),
        new UserCountry('Allemagne', 276, 'DE', 'DEU'),
        new UserCountry('Albanie', 8, 'AL', 'ALB'),
        new UserCountry('Algérie', 12, 'DZ', 'DZA'),
        new UserCountry('Australie', 36, 'AU', 'AUS'),
        new UserCountry('Autriche', 40, 'AT', 'AUT'),
        new UserCountry('Brésil', 76, 'BR', 'BRA'),
        new UserCountry('Chine', 156, 'CN', 'CHN'),
        new UserCountry('Grèce', 300, 'GR', 'GRC'),
        new UserCountry('Guadeloupe', 312, 'GP', 'GLP'),
        new UserCountry('Japon', 392, 'JP', 'JPN'),
        new UserCountry('Maroc', 504, 'MA', 'MAR'),
        new UserCountry('Pays Bas', 528, 'NL', 'NLD'),
        new UserCountry('Norvège', 578, 'NO', 'NOR'),
        new UserCountry('Portugal', 620, 'PT', 'PRT'),
        new UserCountry('Pologne', 616, 'PL', 'POL'),
        new UserCountry('Espagne', 724, 'ES', 'ESP'),
        new UserCountry('Suède', 752, 'SE', 'SWE'),
        new UserCountry('Thaïlande', 764, 'TH', 'THA'),
        new UserCountry('Tunisie', 788, 'TN', 'TUN'),
        new UserCountry('Royaume-Uni', 826, 'GB', 'GBR'),
        new UserCountry('États-Unis', 840, 'US', 'USA')
    ]

    @Input() selectedCountry?: UserCountry
    @Input() required: boolean = true
    @Input() formSent: boolean = false
    @Input() inputErrors: string[] = []
    @Output() countrySelected = new EventEmitter<UserCountry>()
    @Output() countryClear = new EventEmitter<void>()

    resultSearch: UserCountry[] = []
    doneSearching: boolean = false;
    @ViewChild('resultsContainer') resultsContainer?: ElementRef;

    constructor(private renderer: Renderer2) {
        this.renderer.listen('window', 'click', (event: Event) => {
            if (this.resultsContainer && !this.resultsContainer.nativeElement.contains(event.target)) {
                this.doneSearching = false;
            }
        });
    }

    searchCountries(query: string = ''): void {
        const lowerCaseQuery = query.toLowerCase()

        this.resultSearch = this.ALL_COUNTRIES.filter(country => country.name.toLowerCase().includes(lowerCaseQuery)).slice(0, 5)
        this.doneSearching = this.resultSearch.length > 0
    }

    onSelectCountry(country: UserCountry): void {
        this.selectedCountry = country
        this.countrySelected.emit(country)
        this.doneSearching = false
    }

    clearSelection(): void {
        this.resultSearch = []
        this.doneSearching = false
        this.selectedCountry = undefined
        this.countryClear.emit()
    }
}
