/*
---

name: UI.BarButton

description: Provides a button used inside a bar such as the navigation bar.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- UI.Button

provides:
	- UI.BarButton

...
*/

UI.BarButton = new Class({

	Extends: UI.Button,

	options: {
		className: 'ui-bar-button',
		styleName: 'ui-bar-button-normal'
	}	

});