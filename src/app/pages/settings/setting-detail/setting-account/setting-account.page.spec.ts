import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingAccountPage } from './setting-account.page';

describe('SettingAccountPage', () => {
  let component: SettingAccountPage;
  let fixture: ComponentFixture<SettingAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
