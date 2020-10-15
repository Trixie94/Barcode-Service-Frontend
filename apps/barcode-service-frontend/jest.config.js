module.exports = {
  name: 'barcode-service-frontend',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/barcode-service-frontend',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
