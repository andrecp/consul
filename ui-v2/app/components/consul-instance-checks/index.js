import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',
  healthCheck: computed(function() {
    let ChecksCritical = 0;
    let ChecksWarning = 0;
    let ChecksPassing = 0;

    get(this, 'items').forEach(item => {
      switch (item.Status) {
        case 'critical':
          ChecksCritical += 1;
          break;
        case 'warning':
          ChecksWarning += 1;
          break;
        case 'passing':
          ChecksPassing += 1;
          break;
        default:
          break;
      }
    });

    switch (true) {
      case ChecksCritical !== 0:
        return {
          check: 'critical',
          status: 'failing',
          count: ChecksCritical,
        };
      case ChecksWarning !== 0:
        return {
          check: 'warning',
          status: 'with warning',
          count: ChecksWarning,
        };
      case ChecksPassing !== 0:
        return {
          check: 'passing',
          status: 'passing',
          count: ChecksPassing,
        };
      default:
        return {
          check: 'empty',
        };
    }
  }),
});
