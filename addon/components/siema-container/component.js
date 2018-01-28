import Component from '@ember/component';
import layout from './template';
import Siema from 'siema';
import { assign }  from '@ember/polyfills';
import { scheduleOnce }  from '@ember/runloop';

export default Component.extend({
  layout,
  _siema: null,
  options: null,
  prevSlideCount: 1,
  nextSlideCount: 1,

  actions: {
    prev() {
      let siema = this.get('_siema');
      let count = this.get('prevSlideCount');
      siema.prev(count);
    },
    next() {
      let siema = this.get('_siema');
      let count = this.get('nextSlideCount');
      siema.next(count);
    }
  },

  didInsertElement() {
    scheduleOnce('afterRender', this, () => {
      let slidesEl = document.getElementById(`slides-${this.elementId}`);
      let options = assign({}, this.get('options'), {selector: slidesEl});
      let siema = new Siema(options);
      this.set('_siema', siema);
    });
  },

  willDestroyElement() {
    let siema = this.get('_siema');
    if (siema) {
      siema.destroy();
    }
  }
});
