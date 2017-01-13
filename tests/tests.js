/**
 * Global tests
 */

// Test if main function still works
/*QUnit.test('global test', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    assert.ok(simplenav, 'simplenav function works')
});

QUnit.test('appending html', function (assert) {
    $('.js-simplenav').simplenav();
    assert.ok($('.js-simplenav').find('#menu-button-0').length, 'menu toggle button appended correctly')
});

QUnit.test('test done callback', function (assert) {
    var done = false;
    $('.js-simplenav').simplenav({
        done: function () {
            done = true;
        }
    });
    assert.ok(done, 'done callback fired')
});

QUnit.test('test update varialbes', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    var data = simplenav[0].globalData[0];
    simplenav.app.checkVars(data);
    assert.ok(test, 'done callback fired');
});

QUnit.test('test move item', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    var data = simplenav[0].globalData[0];
    simplenav.app.moveItem(data.element);
    simplenav.app.moveItem(data.element);
    simplenav.app.moveItem(data.element);
    var items = $('.js-simplenav-dropdown').children().length;
    assert.equal(items, "3", '3 items moved manually to dropdown');
});

QUnit.test('test retrieve item', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    simplenav.app.moveItem(simplenav);
    simplenav.app.moveItem(simplenav);
    simplenav.app.moveItem(simplenav);
    simplenav.app.retrieveItem(simplenav);
    var items = $('.js-simplenav-dropdown').children().length;
    assert.equal(items, "2", 'retrieved one item from 3 dropdown items');
});

QUnit.test('test update varialbes', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    simplenav.app.moveItem(simplenav);
    simplenav.app.moveItem(simplenav);
    assert.ok(test, 'done callback fired');
});

QUnit.test('check if aria attributes are set', function (assert) {
    // Number of tests
    assert.expect(7);

    var simplenav = $('.js-simplenav').simplenav();

    // Check if initial aria attrs are set
    assert.equal(simplenav.find('.js-simplenav-toggle').attr('aria-expanded'), 'false', "Aria expanded was set correctly");
    assert.ok(simplenav.find('.js-simplenav-wrapper').find('[aria-label]'), "Aria label was set correctly");
    assert.ok(simplenav.find('.js-simplenav-wrapper').find('[aria-controls]'), "Aria controls was set correctly");
    assert.equal(simplenav.find('.js-simplenav-dropdown').attr('aria-hidden'), 'true', "Aria hidden was set correctly");
    assert.ok(simplenav.find('.js-simplenav-dropdown[aria-labelledby]'), "Aria labelledby was set correctly");

    // Move items in dropdown so we an open dropdown
    simplenav.app.moveItem(simplenav);

    // Open dropdown to fire callback
    simplenav.app.openDropdown(simplenav);

    // Done callback
    var done = assert.async();
    simplenav.on("simplenav:open", function () {
        assert.equal(simplenav.find('.js-simplenav-toggle').attr('aria-expanded'),'true', "Toggle has aria expanded on true");
        assert.equal(simplenav.find('.js-simplenav-dropdown').attr('aria-hidden'),'false', "Dropdown has aria hidden on false");
        done();
    });
});*/

QUnit.test('test if open toggle works', function (assert) {
    var simplenav = $('.js-simplenav').simplenav();
    var settings = simplenav[0].globalData[0].settings;

    // Move items in dropdown so we see an open dropdown
    simplenav.app.moveItem(simplenav);

    simplenav.find('.js-simplenav-toggle').trigger('click');
    assert.ok(simplenav.find('.js-simplenav-toggle').hasClass(settings.activeclass), "Simplenav is open");
    simplenav.find('.js-simplenav-toggle').trigger('click');
    assert.notOk(simplenav.find('.js-simplenav-toggle').hasClass(settings.activeclass), "Simplenav is not open");
});
