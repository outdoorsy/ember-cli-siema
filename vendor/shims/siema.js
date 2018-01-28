(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self.Siema,
      __esModule: true,
    };
  }

  define('siema', [], vendorModule);
})();
