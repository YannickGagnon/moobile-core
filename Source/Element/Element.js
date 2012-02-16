/*
---

name: Element

description: Provides extra methods to the Element prototype.

license: MIT-style license.

author:
	- Jean-Philippe Dery (jeanphilippe.dery@gmail.com)

requires:
	Core/Element

provides:
	- Element

...
*/


(function() {

var adopt = Element.prototype.adopt;

Element.implement({

	/**
	 * @see    http://moobile.net/api/0.1/Element/Element#ingest
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	ingest: function(element) {
		return this.adopt(Array.from(document.id(element).childNodes));
	},

	adopt: function() {
		var args = [];
		if (arguments.length == 1) {
			var arg = arguments[0];
			if (typeof arg == 'string') {
				var args = Elements.from(arg);
				if (args.length) {
					return adopt.apply(this, args);
				}
			}
		}
		return adopt.apply(this, arguments);
	},

	/**
	 * @see http://moobile.net/api/0.1/Element/Element#setRole
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	 setRole: function(role) {
	 	return this.set('data-role', role);
	 },

	/**
	 * @see http://moobile.net/api/0.1/Element/Element#getRole
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	 getRole: function(role) {
	 	return this.get('data-role');
	 },

	/**
	 * @see http://moobile.net/api/0.1/Element/Element#getRoleElement
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getRoleElement: function(role) {
		return this.getRoleElements(role)[0] || null;
	},

	/**
	 * @see http://moobile.net/api/0.1/Element/Element#getRoleElements
	 *
	 * @author Jean-Philippe Dery (jeanphilippe.dery@gmail.com)
	 * @since  0.1.0
	 */
	getRoleElements: function(role) {

		var validate = this.ownsRoleElement.bind(this);
		var selector = role
		             ? '[data-role=' + role + ']'
		             : '[data-role]';

		return this.getElements(selector).filter(validate);
	},

	ownsRoleElement: function(element) {

		var parent = element.getParent();
		if (parent) {

			if (parent === this)
				return true;

			if (parent.get('data-role'))
				return false;

			return this.ownsRoleElement(parent);
		}

		return false;
	}

});

})();