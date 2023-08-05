import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MousePositionStreamerComponent } from './components/streamers/mouse-pos-streamer.component';
import { CpuLoadStreamerComponent } from './components/streamers/cpu-load-streamer.component';
import { CpuLoadGraphComponent } from './components/graphs/cpu-load-graph.component';
import { MousePositionGraphComponent } from './components/graphs/mouse-pos-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    MousePositionStreamerComponent,
    CpuLoadStreamerComponent,
    CpuLoadGraphComponent,
    MousePositionGraphComponent,
  ],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
