import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { FooterComponent } from "./public/components/footer/footer.component";
import { HeaderComponent } from "./public/components/header/header.component";
import { ListDataComponent } from "./public/features/list-data/list-data.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ListDataComponent,
    MatProgressSpinner
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'task_Atipera';


}
