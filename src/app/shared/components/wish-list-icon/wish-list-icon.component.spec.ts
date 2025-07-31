import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListIconComponent } from './wish-list-icon.component';

describe('WishListIconComponent', () => {
  let component: WishListIconComponent;
  let fixture: ComponentFixture<WishListIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishListIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishListIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
