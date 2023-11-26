// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// pipes
import { UserNameFormaterPipe } from '../application/pipes/user-name-formater.pipe';

// components
import { MainLoaderComponent } from '../application/components/main-loader/main-loader.component';
import { MessageTextComponent } from '../application/components/message-text/message-text.component';
import { InputErrorMessageComponent } from '../application/components/input-error-message/input-error-message.component';

@NgModule({
  declarations: [
    // pipes
    UserNameFormaterPipe,
    // components
    MainLoaderComponent,
    MessageTextComponent,
    InputErrorMessageComponent,
  ],
  imports: [
    // modules
    CommonModule,
  ],
  exports: [
    // pipes
    UserNameFormaterPipe,
    // components
    MainLoaderComponent,
    MessageTextComponent,
    InputErrorMessageComponent,
  ],
})
export class SharedModuleModule {}
