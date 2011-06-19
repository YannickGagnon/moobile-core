/*
---

name: Event.Click

description: Provides a click event that is not triggered when the user clicks
             and moves the mouse. This overrides the default click event. It's
			 important to include Mobile/Click before this class otherwise the
			 click event will be deleted.

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Custom-Event/Element.defineCustomEvent
	- Mobile/Browser.Mobile
	- Mobile/Click
	- Mobile/Touch

provides:
	- Event.Click

...
*/

(function(){

	var x = 0;
	var y = 0;
	var down = false;
	var valid = true;

	var mousemove = 'mousemove';
	var mousedown = 'mousedown';
	var mouseup = 'mouseup';
	var click = 'click';

	if (Browser.isMobile) {
		mousemove = 'touchmove';
		mousedown = 'touchstart';
		mouseup = 'touchend';
		click = 'touchend';
	}

	var onMouseDown = function(e) {
		valid = true;
		down = true;
		x = e.page.x;
		y = e.page.y;
	};

	var onMouseMove = function(e) {
		if (down) {
			valid = !moved(e);
			if (valid == false) {
				this.removeEvent(mouseup, onMouseUp).fireEvent(mouseup, e).addEvent(mouseup, onMouseUp);
			}
		}
	};

	var onMouseUp = function(e) {
		if (down) {
			down = false;
			valid = !moved(e);
		}
	};

	var moved = function(e) {
		var xmax = x + 3;
		var xmin = x - 3;
		var ymax = y + 3;
		var ymin = y - 3;
		return (e.page.x > xmax || e.page.x < xmin || e.page.y > ymax || e.page.y < ymin);
	};

	Element.defineCustomEvent('click', {

		base: click,

		onAdd: function() {
			this.addEvent(mousedown, onMouseDown);
			this.addEvent(mousemove, onMouseMove);
			this.addEvent(mouseup, onMouseUp);
		},

		onRemove: function() {
			this.removeEvent(mousedown, onMouseDown);
			this.removeEvent(mousemove, onMouseMove);
			this.removeEvent(mouseup, onMouseUp);
		},

		condition: function(e) {
			return valid;
		}

	});

})();