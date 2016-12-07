import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConfigService {
  private CONFIG: any;

  constructor(private http: Http) {
  }

  public load() {
    console.log('load()');
    return new Promise((resolve) => {
      this.http.get('hip-config.json').map(res => res.json())
        .subscribe(config => {
          console.log('config loaded');
          this.CONFIG = config;
          resolve();
        })
    });
  }

  public get(config: string): string {
    return this.CONFIG[config];
  }
}