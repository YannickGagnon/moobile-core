/*
---

name: ButtonGroup

description: Provides a control that groups button.

license: MIT-style license.

authors:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	- Control

provides:
	- ButtonGroup

...
*/

/**
 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup
 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
 * @edited 0.2.0
 * @since  0.1.0
 */
Moobile.ButtonGroup = new Class({

	Extends: Moobile.Control,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	_selectedButton: null,

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	_selectedButtonIndex: -1,

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#options
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	options: {
		layout: null,
		deselectable: false,
		selectedButtonIndex: -1
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @edited 0.2.0
	 * @since  0.1.0
	 */
	willBuild: function() {

		this.parent();

		this.element.addClass('button-group');

		var layout = this.options.layout;
		if (layout) {
			this.element.addClass('button-group-layout-' + layout);
		}
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	didBuild: function() {
		this.parent();
		this.setSelectedButtonIndex(this.options.selectedButtonIndex);
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	destroy: function() {
		this._selectedButton = null;
		this._selectedButtonIndex = -1;
		this.parent();
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#setSelectedButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setSelectedButton: function(selectedButton) {

		if (this._selectedButton === selectedButton) {
			if (selectedButton && this.options.deselectable) {
				selectedButton = null;
			} else {
				return this;
			}
		}

		if (this._selectedButton) {
			this._selectedButton.setSelected(false);
			this.fireEvent('deselect', this._selectedButton);
			this._selectedButton = null;
		}

		this._selectedButtonIndex = selectedButton ? this.getChildComponentIndex(selectedButton) : -1;

		if (selectedButton) {
			this._selectedButton = selectedButton;
			this._selectedButton.setSelected(true);
			this.fireEvent('select', this._selectedButton);
		}

		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#getSelectedButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getSelectedButton: function() {
		return this._selectedButton;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#setSelectedButtonIndex
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	setSelectedButtonIndex: function(index) {

		var child = null;
		if (index >= 0) {
			child = this.getChildComponentOfTypeAt(Moobile.Button, index);
		}

		return this.setSelectedButton(child);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#getSelectedButtonIndex
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getSelectedButtonIndex: function() {
		return this._selectedButtonIndex;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#clearSelectedButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	clearSelectedButton: function() {
		this.setSelectedButton(null);
		return this;
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#addButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	addButton: function(button, where) {
		return this.addChildComponent(button, where);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#addButtonAfter
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	addButtonAfter: function(button, after) {
		return this.addChildComponentAfter(button, after);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#addButtonBefore
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	addButtonBefore: function(button, before) {
		return this.addChildComponentBefore(button, before);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#getButtons
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getButtons: function() {
		return this.getChildComponentsOfType(Moobile.Button);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#getButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getButton: function(name) {
		return this.getChildComponentOfType(Moobile.Button, name);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#getButtonAt
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getButtonAt: function(index) {
		return this.getChildComponentOfTypeAt(Moobile.Button, index);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#removeButton
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeButton: function(button, destroy) {
		return this.removeChildComponent(button, destroy);
	},

	/**
	 * @see    http://moobilejs.com/doc/latest/Control/ButtonGroup#removeAllButtons
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	removeAllButtons: function(destroy) {
		return this.removeAllChildComponentsOfType(Moobile.Button, destroy);
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	didAddChildComponent: function(child) {
		this.parent(child);
		if (child instanceof Moobile.Button) {
			child.addEvent('tap', this.bound('onButtonTap'));
		}
	},

	/**
	 * @overridden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	didRemoveChildComponent: function(child) {
		this.parent(child);
		if (child instanceof Moobile.Button) {
			child.removeEvent('tap', this.bound('onButtonTap'));
		}
	},

	/**
	 * @hidden
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	onButtonTap: function(e, sender) {
		this.setSelectedButton(sender);
	}

});

//------------------------------------------------------------------------------
// Roles
//------------------------------------------------------------------------------

Moobile.Component.defineRole('button-group', null, function(element) {
	this.addChildComponent(Moobile.Component.create(Moobile.ButtonGroup, element, 'data-button-group'));
});

