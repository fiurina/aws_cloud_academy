import { TestBed, async, inject } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpParams } from '@angular/common/http';
import { RequestHelper } from 'src/app/shared/global-constants';

describe('ApiService', () => {

  let service: ApiService;
  let httpMock

  beforeEach(() => TestBed.configureTestingModule({
    imports:[
      HttpClientTestingModule
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  })

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`should be 'GET' method request`, async(inject([ApiService],
    (service: ApiService) => {
      const httpParams = new HttpParams()
      const url = RequestHelper.login()

      service.get(url, httpParams)
        .subscribe((data: any) => expect(data).toBeTruthy()
        );

      let req = httpMock.expectOne(RequestHelper.login());
      expect(req.request.method).toBe("GET");

      req.flush({});
      httpMock.verify();
    }
  )));

  it(`should be 'POST' method request`, async(inject([ApiService],
    (service: ApiService) => {
      const httpParams = new HttpParams()
      const url = RequestHelper.login()

      service.post(url, httpParams)
        .subscribe((data: any) => expect(data).toBeTruthy()
        );

      let req = httpMock.expectOne(RequestHelper.login());
      expect(req.request.method).toBe("POST");

      req.flush({});
      httpMock.verify();
    }
  )));
});
