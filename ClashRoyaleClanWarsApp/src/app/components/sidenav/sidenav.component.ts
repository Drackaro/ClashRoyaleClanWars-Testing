import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';



interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter<SideNavToggle>()

  collapsed = false;
  screenWidth: number = 0;
 
  navData :any;
  LoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private router: Router) { 
    
    
   
    this.LoggedIn = !!this.tokenStorage.getToken();

    this.navData = [
      {
        routeLink: "/",
        icon: "pi pi-home",
        label: "Home",
      },
      {
        routeLink: "/players",
        icon: "pi pi-user",
        label: "Players",
      },
      {
        routeLink: "/cards",
        icon: "pi pi-id-card",
        label: "Cards",
      },
      {
        routeLink: "/clans",
        icon: "pi pi-sitemap",
        label: "Clans",
      },
      {
        routeLink: "/query",
        icon: "pi pi-database",
        label: "Query",
      },
      {
        routeLink: "/graph",
        icon: "pi pi-chart-bar",
        label: "Graph",
      },
      {
        routeLink: "/faq",
        icon: "pi pi-question-circle",
        label: "FAQ",
      },
  ]

    if (this.LoggedIn) {
      const user = this.tokenStorage.getUser();
      this.navData.push({
        routeLink: "/profile",
        icon: "pi pi-user",
        label: tokenStorage.getUser(),
      })
    }
    else {
      this.navData.push({
        routeLink: "/login",
        icon: "pi pi-user-plus",
        label: "Sign Up",
      })
    }
  } 

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }

  closeNavbar() {
    this.collapsed = false;
    this.onToggleSideNav.emit({screenWidth: this.screenWidth, collapsed: this.collapsed})
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  logout(): void {
    this.tokenStorage.signOut();
    
    this.router.navigate(['/'])
          .then(() => {
            window.location.reload();
          });

  }
}
