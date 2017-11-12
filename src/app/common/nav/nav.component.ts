import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  links: any[] = [{ name: 'Clients', path: 'clients' },
                  { name: 'Orders', path: 'orders' }
                 ];

  constructor() { }

  ngOnInit() {
  }

}
