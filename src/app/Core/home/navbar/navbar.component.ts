import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { PersonaModel } from 'src/app/shared/models/persona.model';
import { CoreService } from 'src/app/shared/services/core.service';
import { ServicioToggleService } from 'src/app/shared/services/servicio-toggle.service';
import { NavegationModel } from 'src/app/shared/models/navegation.model';
import { AdjustNavbarService } from 'src/app/shared/services/adjust-navbar.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public sidebarMinimized = false;
  public persona: PersonaModel | null = null;
  @ViewChild('luna') public luna!: ElementRef;
  @ViewChild('sol') public sol!: ElementRef;
  @ViewChild('campana') public campana!: ElementRef;
  @ViewChild('option') public option!: ElementRef;
  @ViewChild("dropdown") dropdown!: ElementRef;

  public toggle: 'Dark' | 'Light' = 'Dark';

  check: boolean = false;
  textState: boolean = false;
  expandState: boolean = false;
  classState: boolean = false;
  menuState: boolean = true;
  timeoutRef: any;
  filler: any;
  selectedMenuItem: string | null = null;

  constructor(
    private toggleService: ServicioToggleService,
    private coreService: CoreService,
    private adjustNavbar: AdjustNavbarService,
    private renderer2: Renderer2,
    private router: Router

  ) { }


  ngOnInit(): void {
    const menue: NavegationModel[] = [
      {
        name: 'Areas',
        url: 'dashboard',
        icon: 'team_dashboard'
      },
      {
        name: 'Programas Formativos',
        url: '/programa',
        icon: 'patient_list'
      },
      {
        name: 'Proyectos Formativos',
        url: '/proyecto',
        icon: 'settings_account_box'
      },
      {
        name: 'Sedes',
        url: 'sede',
        icon: 'holiday_village'
      },
      {
        name: 'ERWTW',
        url: '123123',
        icon: 'refresh'
      },
      {
        name: 'subir_nomina',
        url: 'nomina',
        icon: 'settings_account_box'
      }
    ]

    this.filler = menue;




    this.coreService.getUserAuthenticated();

    this.coreService.persona.subscribe((persona) => {
      this.persona = persona;
    });
  }
  optionsElen() {
    this.option.nativeElement.style.display = 'none';
  }
  options() {
    this.option.nativeElement.style.display = 'flex';
  }
  Toggle(): void {
    if (this.toggle === 'Dark') {
      this.toggle = 'Light';
      this.toggleService.ChaneColor.emit({ classToAdd: 'color-change' });
      this.luna.nativeElement.style.opacity = '0';
      this.sol.nativeElement.style.opacity = '1';
    } else {
      this.toggle = 'Dark';
      this.toggleService.ChaneColor.emit({ classToRemove: 'color-change' });
      this.luna.nativeElement.style.opacity = '1';
      this.sol.nativeElement.style.opacity = '0';
    }
  }
  logout(): void {
    this.coreService.logout();
  }
  get Nombre() {
    return this.persona ? this.persona.nombre1 : '';
  }
  get Apellido() {
    return this.persona ? this.persona.apellido1 : '';
  }
  get imagen_perfil() {
    return this.persona ? this.persona.rutaFotoUrl : '';
  }



  toggleClass() {
    var dropdown = this.dropdown.nativeElement;
    this.menuState = !this.menuState;
    if (!this.menuState) {
      if (this.timeoutRef) { clearTimeout(this.timeoutRef); }
      this.renderer2.removeClass(dropdown, "showNN");
      this.renderer2.removeClass(dropdown, "show")
      this.renderer2.addClass(dropdown, "hide")
      this.adjustNavbar.Adjust_navbar("0");
      this.timeoutRef = setTimeout(() => {
        this.renderer2.removeClass(dropdown, "hide")
      }, 450);
    }
    else {
      this.renderer2.addClass(dropdown, "show");
      this.adjustNavbar.Adjust_navbar("70");
    }
  }

  enter() {
    var dropdown = this.dropdown.nativeElement;
    this.expandState = true;
    this.renderer2.removeClass(dropdown, "show")
    this.renderer2.addClass(dropdown, "showNN")
    this.adjustNavbar.Adjust_navbar("130")
  }

  leave() {

    this.expandState = false;
    this.adjustNavbar.Adjust_navbar("70");
  }



  selectMenuItem(name: string): void {
    this.selectedMenuItem = name;
  }

  ngAfterViewInit(): void {

  }

}
