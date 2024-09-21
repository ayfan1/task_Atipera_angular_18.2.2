import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShareModule } from '../../share/share.module';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ShareModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {}
