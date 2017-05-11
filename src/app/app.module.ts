import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ChildrenPage } from '../pages/children/children';
import { ChildPage } from '../pages/child/child';
import { AddChildModalPage } from '../pages/children/add-child-modal';
import { Diapers } from '../pages/diapers/diapers';
import { Formula } from '../pages/formula/formula';
import { Clothes } from '../pages/clothes/clothes';
import { DiapersConfigPage } from '../pages/pages';

import { SelectPreferences } from '../components/select-preferences/select-preferences'

import { AuthService } from '../providers/auth-service';

import { MyFilterPipe } from '../shared/filter-pipe'
import { PropFilterPipe } from '../shared/property-filter-pipe'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: "AIzaSyChLTU8Bbbz7RROYDJJjbU-aiT6mqEAfJo",
  authDomain: "extra-diapers.firebaseapp.com",
  databaseURL: "https://extra-diapers.firebaseio.com",
  projectId: "extra-diapers",
  storageBucket: "extra-diapers.appspot.com",
  messagingSenderId: "696131233205"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ChildrenPage,
    ChildPage,
    AddChildModalPage,
    Diapers,
    Formula,
    Clothes,
    DiapersConfigPage,
    MyFilterPipe,
    PropFilterPipe,
    SelectPreferences
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    ChildrenPage,
    ChildPage,
    AddChildModalPage,
    Diapers,
    Formula,
    Clothes,
    DiapersConfigPage,
    SelectPreferences
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
