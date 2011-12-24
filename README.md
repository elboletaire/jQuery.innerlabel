#About
**jQuery Inner Label** is a plug-in that lets you easily convert your labels into crossbrowser html5 placeholders (it uses html4 + css when html5 placeholder is not possible).

## Syntax
```
jQuery(function($){
	// Default options
	$('label').innerlabel();
	
	// Disable html5 placeholders
	$('label').innerlabel({
		placeholder: false
	});
});
```
## Default options
```
jQuery(function($){
	$('label').innerlabel({
		label_class: "inner-label", // class applied to label
		wrapper: false, // is the label yet wrapped? specify it's wrapper tag here
		wrapper_class: "inner-label-wrapper", // class applied to wrapper
		active_class: "active", // class added to wrapper when input is active
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
	});
});
```

## Notes
Also remember to add the css to your site.

You can style each inner-label using CSS:
	#my-container .user-form .inner-label {
		color: red;
	}

## Compatibility

Works with jQuery versions 1.6 to 1.7.1. In previous versions works but buggy (maybe 'bind' or 'trigger' issues).

Must work under every browser. 

Tested under (Win, Linux & Mac)... 
* IE 6 to 9 
* FF 7 & 8 
* Opera 11.6
* Safari (5.1 under Mac and 5.1.2 under Win)
* Chrome 16