import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2FileDropModule }  from 'ng2-file-drop';

import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap';
import { TitleComponent } from './title/title.component';
import { UploadComponent } from './upload/upload.component';
import { SetupComponent } from './setup/setup.component';
import { ResultComponent } from './result/result.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    UploadComponent,
    SetupComponent,
    ResultComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    Ng2FileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
