/**
 *	This program is free software: you can redistribute it and/or modify
 *	it under the terms of the GNU General Public License as published by
 *	the Free Software Foundation, either version 3 of the License, or
 *	(at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU General Public License for more details.
 *
 *	You should have received a copy of the GNU General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 *
 * A simple jQuery plugin to use labels as placeholders
 * v. 0.1 2010-03-06
 * v. 0.2 2010-05-15 - minnor bugfixes
 * v. 0.3 2010-08-02 - minnor bugfixes
 * v. 1.0 2011-12-24 - Fully redeveloped and added html5 placeholder support
 * @author Oscar Casajuana a.k.a. elboletaire <elboletaire {at} underave {dot} net>  
 * 
 * Usage:
 * 
 * jQuery('#form label').innerlabel();
 * 
 * Options you can set:
 * 
 * jQuery('#form label').innerlabel({
 * 		label_class: "inner-label", // class set to label (used in css)
 *		wrapper: false, // are the label and input wrapped by a div? specify the tag here (div, li, dd...)
 *		wrapper_class: "inner-label-wrapper", // the class applied to the wrapper
 *		active_class: "active", // class applied to the wrapper on input focus
 *		possible_wrappers: [
 *			'div',
 *			'li',
 *			'dd'
 *		],
 *		possible_inputs: [
 *			'input',
 *			'textarea'
 *		],
 *		placeholder: true // enables placeholder if available
 * });
 * 
 */
(function($){
	$.fn.innerlabel = function(options){
		
		$.fn.innerlabel.defaults = {
			label_class: "inner-label",
			wrapper: false,
			wrapper_class: "inner-label-wrapper",
			active_class: "active",
			possible_wrappers: [
				'div',
				'li',
				'dd'
			],
			possible_inputs: [
				'input',
				'textarea'
			],
			placeholder: true // enables placeholder if available
		}
		
		var opts = $.extend({}, $.fn.innerlabel.defaults, options);
		
		// Array to string conversion
		opts.possible_wrappers = opts.possible_wrappers.join(',');
		opts.possible_inputs = opts.possible_inputs.join(',');
		
		var innerlabel = function(label) {
			var self = this, label = jQuery(label), input, wrapper, has_placeholder;

			var innerize = {
				// Converts label to input placeholder
				placeholder: function() {
					input.attr("placeholder", label.text());
					label.remove();
				},
				// Wrapps input and label
				wrap: function() {
					// Check for a unique wrapper
					wrapper = opts.wrapper;
					if (wrapper || parseInt(label.parent(opts.possible_wrappers).children().length) === 2) {
						wrapper = label.parent(wrapper || opts.possible_wrappers);
					// Otherwise create it
					} else {
						wrapper = $('<div></div>');
						var to_add = input;
						if (!label.next(opts.possible_inputs).length && !label.prev(opts.possible_inputs).length) {
							to_add = input.parent();
						}
						label.add(to_add).wrapAll(wrapper);
					}
					return wrapper.addClass(opts.wrapper_class).css( { position: "relative" , overflow: "hidden"  } );
				},
				// Get input field
				getInput: function() {
					// label has an input assigned
					if (label.attr('for')) {
						input = $('#' + label.attr('for'));
					}
					// label surrounds input
					else {
						input = label.find(opts.possible_inputs);
					}
					// Detect placeholder attribute
					has_placeholder = !! (input[0].placeholder === "") && !! (input[0].placeholder !== undefined)
				},
				init: function() {
					this.getInput();
					if (has_placeholder && opts.placeholder) {
						innerize.placeholder();
						return;
					}
					
					// Add default class to label
					if (!has_placeholder || !opts.placeholder) {
						label.addClass(opts.label_class);
					}
					
					var wrapper = this.wrap();
					
					var logic = {
						show: function() {
							if (input.val() == '') {
								label.show();
								wrapper.removeClass(opts.active_class);
							}
						},
						hide: function() {
							label.hide();
							wrapper.addClass(opts.active_class);
						}
					}
					
					// Add logic to label and input
					input.bind('focus', logic.hide).bind('blur', logic.show);
					label.bind('click', function(){input.focus();});
					// Disable label text selection
					label.bind('mousedown', function(e) {input.focus(); e.preventDefault();});

					// This is for hidding the label when input is not empty (at load page)
					if (input.val() != '') {
						logic.hide();
					} else {
						input.trigger('blur');
					}

				}
			}
			innerize.init();
		}
		
		return this.each(function(){
			if (!$(this).data('inner-label')) {
				$(this).data('inner-label', true);
				new innerlabel(this);
			}
		});
	}
})(jQuery);