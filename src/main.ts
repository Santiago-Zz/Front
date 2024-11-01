import { bootstrapApplication } from "@angular/platform-browser";
import { provideRouter } from '@angular/router';
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // provee las rutas
    provideHttpClient(), // importar httpClient 
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
  ]
})
  .catch(err => console.log(err))

export class AppModule { }
