import { NgModule } from '@angular/core';
import { UserNameFormaterPipe } from '../application/pipes/user-name-formater.pipe';
import { MainLoaderComponent } from '../application/components/main-loader/main-loader.component';

@NgModule({
  declarations: [UserNameFormaterPipe,MainLoaderComponent],
  exports: [UserNameFormaterPipe,MainLoaderComponent],
})
export class SharedModuleModule {}
