import { NgModule } from '@angular/core';
import { UserNameFormaterPipe } from '../application/pipes/user-name-formater.pipe';
import { MainLoaderComponent } from '../application/components/main-loader/main-loader.component';
import { MessageTextComponent } from '../application/components/message-text/message-text.component';
import { CommonModule } from '@angular/common';
import { InputErrorMessageComponent } from '../application/components/input-error-message/input-error-message.component';

@NgModule({
  declarations: [
    UserNameFormaterPipe,
    MainLoaderComponent,
    MessageTextComponent,
    InputErrorMessageComponent,
  ],
  imports: [CommonModule],
  exports: [
    UserNameFormaterPipe,
    MainLoaderComponent,
    MessageTextComponent,
    InputErrorMessageComponent,
  ],
})
export class SharedModuleModule {}
