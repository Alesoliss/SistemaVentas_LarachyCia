import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module'; 
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { NgxExtendedPdfViewerModule} from  'ngx-extended-pdf-viewer'
import { ReportesListadoComponent} from '../app/demo/components/Reportes/listReportes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FiltroReportesComponent } from './ReportesFiltrados/FiltroReportes.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, 
        AppLayoutModule,
         NgxExtendedPdfViewerModule,
         HttpClientModule,
         NgbModule


        ], 
    providers: [{ provide: LocationStrategy,
         useClass: PathLocationStrategy }],
    bootstrap: [AppComponent],
})
export class AppModule {}
