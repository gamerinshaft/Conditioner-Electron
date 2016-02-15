import {Component, OnInit} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Hero} from './hero';
import {HeroDetailComponent} from './hero-detail.component';
import {SidebarComponent} from './sidebar.component';
import {HeroService} from './hero.service';
import {ShipmentComponent} from './shipment.component';
import {LoginComponent} from './login/login.component';
import {ApiService} from './services/api.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    directives: [ROUTER_DIRECTIVES, HeroDetailComponent, SidebarComponent],
    providers: [HeroService, ApiService]
})

@RouteConfig([
    { path: '/login', name: 'Login', component: LoginComponent, useAsDefault: true }
    // { path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent }
])

export class AppComponent implements OnInit {
  public title = 'Tour of Heros';
  public heroes: Hero[];
  public selectedHero: Hero;

  constructor(private _heroService: HeroService, private _router: Router, private _api: ApiService) { }

  getHeroes() {
      this._heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero) { this.selectedHero = hero; }
}
