/**
 * Global tests
 */

const testElement = '.js-tilt';

// Test if main function still works
QUnit.test('global test', function (assert) {
    const tilt = $(testElement).tilt();
    assert.ok(tilt, 'tilt function works')
});

QUnit.test('getvalue method', function (assert) {
    const tilt = $(testElement).tilt();
    assert.ok(tilt.tilt.getValues.call(tilt)[0].tiltX === '0.00', 'tiltX set correctly')
});