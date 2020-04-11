This is updated by Kamalesh.

Project is written with back end http server & environment set up. Wherever required, codes are written to fetch/post data to server, but they are commented as there are no back end server/database running.

So data is getting loaded from stub and all functionalities can be tested, but data will vanish if you reload as data will be persisted for single time life cycle of app. No back end server called to save data, so test all features in local UI.

Steps:
1. Take git clone
2. Do npm install (to load node_modules) - it will take sometime to install all packages
3. Once above is successful, run it by using command- ng serve in localhost:4200

4. If you would like to deploy in Tomcat server, do ng build --prod and put dist folder in root directory
(Make sure to enable back end server URL and uncomment necessary codes so that on production it will run with proper back end interaction, else test stub hard coded data will be loaded).


# ContactsManager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
