import { NgModule } from '@angular/core';
import { UserNameFormaterPipe } from '../application/pipes/user-name-formater.pipe';

@NgModule({
  declarations: [UserNameFormaterPipe],
  exports: [UserNameFormaterPipe],
})
export class SharedModuleModule {}
