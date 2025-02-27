import {platformServer} from '@angular/platform-server';
import AppModule from './app/app.module';

platformServer()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));

export default AppModule;