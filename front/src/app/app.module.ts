
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HeadersInterceptor } from './shared/service/interceptors/headers.interceptor';
import { ErrorHandlingInterceptor } from './shared/service/interceptors/error-handling.interceptor';
import { AuthGuard } from './shared/service/auth/auth.guard';
import { ComponentsModule } from './shared/components/components.module';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { SubirArchivosComponent } from './pages/subir-archivos/subir-archivos.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DataTableComponent } from './pages/data-table/data-table.component';
import { FilesCardComponent } from './shared/components/files-card/files-card.component';
import { FilterComponent } from './filter/filter.component';
import {MatIconModule} from '@angular/material/icon';
import { DetailComponent } from './detail/detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";


//Load JSON translations
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const INTERCEPTOR_PROVIDERS = [
  { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi: true, },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SubirArchivosComponent,
    HeaderComponent,
    SidebarComponent,
    DataTableComponent,
    FilesCardComponent,
    FilterComponent,
    DetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    ComponentsModule,
    NgxDatatableModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [AuthGuard, INTERCEPTOR_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }
