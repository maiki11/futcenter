import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarMenuPageComponent } from './side-bar-menu-page.component';

describe('SideBarMenuPageComponent', () => {
  let component: SideBarMenuPageComponent;
  let fixture: ComponentFixture<SideBarMenuPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideBarMenuPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
