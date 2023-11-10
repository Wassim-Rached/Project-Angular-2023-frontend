import { NgModule } from '@angular/core';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule],
  exports: [MatIconModule, MatButtonModule, MatCardModule, MatToolbarModule],
})
export class MaterialModule {}
