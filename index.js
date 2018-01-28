'use strict';
const path = require('path');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-cli-siema',
  included() {
    this.import('vendor/siema/siema.min.js');
    this.import('vendor/shims/siema.js');
  },

  treeForVendor(vendorTree) {
    let siemaPath = path.dirname(require.resolve('siema'));
    let newTree = new Funnel(siemaPath, {
      files: ['siema.min.js'],
      destDir: '/siema',
    });

    return new mergeTrees([vendorTree, newTree]);
  },
};
