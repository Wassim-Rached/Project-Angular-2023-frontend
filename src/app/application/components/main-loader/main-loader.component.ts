import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-loader',
  templateUrl: './main-loader.component.html',
  styleUrls: ['./main-loader.component.css'],
})
export class MainLoaderComponent implements OnInit {
  randomCatFact: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // short random cat fact
    this.http
      .get('https://catfact.ninja/fact')
      .subscribe((data: any) => (this.randomCatFact = data.fact));
  }
}
