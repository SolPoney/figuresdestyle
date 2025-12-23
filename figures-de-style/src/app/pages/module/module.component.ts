import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ModuleService } from '../../services/module.service';
import { Module } from '../../models/module.model';

@Component({
  selector: 'app-module',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './module.component.html',
  styleUrl: './module.component.css',
})
export class ModuleComponent implements OnInit {
  module?: Module;
  moduleId: string = '';

  constructor(
    private route: ActivatedRoute,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.moduleId = params['id'];
      this.module = this.moduleService.getModuleById(this.moduleId);
    });
  }
}
