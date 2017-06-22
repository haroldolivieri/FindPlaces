import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2FileDropModule }  from 'ng2-file-drop';

import { AppComponent } from './app.component';
import { ConceptService } from './concept.service';
import { TitleService } from './title.service';
import { SearchImageService } from './search-image.service';
import { AlertModule } from 'ngx-bootstrap';
import { TitleComponent } from './title/title.component';
import { UploadComponent } from './upload/upload.component';
import { SetupComponent } from './setup/setup.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleComponent,
    UploadComponent,
    SetupComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule.forRoot(),
    Ng2FileDropModule
  ],
  providers: [ConceptService, TitleService, SearchImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

