/**
 * Global tests
 */

const testElement = '.js-tilt';

// Test if main function still works
QUnit.test('global test', function (assert) {
    const tilt = $(testElement).tilt();
    assert.ok(tilt, 'tilt function works')
});

QUnit.test('getvalue api test', function (assert) {
    const tilt = $(testElement).tilt();
    assert.ok(tilt[0].api.getValues().tiltX === '0.00', 'tiltX set correctly')
});