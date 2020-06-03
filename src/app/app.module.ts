import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceWorkerModule} from '@angular/service-worker';
import {Platform} from '@ionic/angular';
import {Keyboard} from '@ionic-native/keyboard/ngx';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Vibration} from '@ionic-native/vibration/ngx';

import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {HomePage} from './home/home.page';

@NgModule({
    declarations: [AppComponent, HomePage],
    entryComponents: [],
    imports: [
        BrowserModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})],
    providers: [
        Platform,
        Keyboard,
        StatusBar,
        SplashScreen,
        Vibration
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
