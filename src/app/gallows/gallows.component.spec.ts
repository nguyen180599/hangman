import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GallowsComponent } from './gallows.component';

describe('GallowsComponent', () => {
  let component: GallowsComponent;
  let fixture: ComponentFixture<GallowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GallowsComponent]
    });
    fixture = TestBed.createComponent(GallowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
