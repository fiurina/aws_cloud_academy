import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../config/constants/router.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() activeSection: boolean;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toUpload() {
    this.router.navigate([AppRoutes.subirArchivos]);
  }

  toData() {
    this.router.navigate([AppRoutes.dataTable]);
  }
}
