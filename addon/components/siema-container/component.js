import Component from '@ember/component';
import layout from './template';
import Siema from 'siema';
import { assign }  from '@ember/polyfills';

export default Component.extend({
  layout,
  _siema: null,
  options: null,
  prevSlideCount: 1,
  nextSlideCount: 1,
  currentSlide: null,
  hasRendered: null,
  initialSlide: 0,
  autoInterval: null,

  init() {
    this._super(...arguments);
    this.set('hasRendered', [this.get('initialSlide')]);
  },

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
      let that = this;
      let slidesEl = document.getElementById(`slides-${this.elementId}`);
      let options = assign({}, this.get('options'), {
        selector: slidesEl,
        startIndex: this.get('initialSlide'),
        onChange: function() {
          let current = this.currentSlide;
          that.get('hasRendered').pushObject(current);
          that.set('currentSlide', current);
        }
      });
      let siema = new Siema(options);
      this.set('_siema', siema);
      if (this.get('autoInterval')) {
        let interval = setInterval(() => {
          siema.next(1);
          console.log('next!');
        }, this.get('autoInterval'));
        this.set('interval', interval);
      }
  },

  willDestroyElement() {
    let siema = this.get('_siema');
    let interval = this.get('interval');
    if (siema) {
      siema.destroy();
    }
    if (interval) {
      clearInterval(interval);
    }
  }
});
