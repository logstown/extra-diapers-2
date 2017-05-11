import { Component, Input } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import _ from 'lodash';

/**
 * Generated class for the SelectPreferences component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'select-preferences',
  templateUrl: 'select-preferences.html'
})
export class SelectPreferences {
  @Input() title: string
  @Input() fbUrl: string
  @Input() preferences: { name: string, key: string, checked: boolean }[]

  constructor(private af: AngularFire) {}

  selectAll() {
    let fbLocation = this.af.database.object(this.fbUrl);

    if (this.allSelected()) {
      fbLocation.remove();
    } else {
      let allChecked = {}

      _.forEach(this.preferences, item => {
        allChecked[item.key] = true
      })

      fbLocation.set(allChecked);
    }
  }

  allSelected() {
    return _.every(this.preferences, 'checked')
  }

  updateOne(item) {
    let fbLocation = this.af.database.object(this.fbUrl + item.key)

    if (item.checked) {
      fbLocation.set(true);
    } else {
      fbLocation.remove();
    }
  }
}
