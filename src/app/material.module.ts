import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [],
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  exports: [
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
})
export class MaterialModule {}
