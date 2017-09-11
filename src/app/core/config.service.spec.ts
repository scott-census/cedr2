import { TestBed, inject } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigService]
    });
  });

  it('should be created', inject([ConfigService], (service: ConfigService) => {
    expect(service).toBeTruthy();
  }));

  describe('getConfig', () => {
    it('should return the configuration for a given id', inject([ConfigService], (service: ConfigService) => {
      expect(service.getConfig).toBeTruthy();
    }));
  });

  describe('getConfigIds', () => {
    it('should return a list of all ids in the configuration', inject([ConfigService], (service: ConfigService) => {
      expect(service.getConfigIds).toBeTruthy();
    }));
  });

  describe('getDataServer', () => {
    it('should return the database base path for the given service', inject([ConfigService], (service: ConfigService) => {
      expect(service.getDataServer).toBeTruthy();
    }));
  });

  describe('getMapServier', () => {
    it('should return the map server base path for the given service (if any)', inject([ConfigService], (service: ConfigService) => {
      expect(service.getMapServer).toBeTruthy();
    }));
  });

  describe('load', () => {
    it('should load the configuration, returning a promise', inject([ConfigService], (service: ConfigService) => {
      expect(service.load).toBeTruthy();
    }));
  });

});
