import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {WorldDlComponent} from "./world-dl-component/world-dl.component";

const routes: Routes = [
    {
        path: '', component: WorldDlComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorldDlRoutingModule {}
