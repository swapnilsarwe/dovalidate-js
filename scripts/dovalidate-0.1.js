/**
 * Project Name : dovalidate-js
 * Project Leader : Well there is no project leader as such, its just an attempt to learn javascript in a better way and contribute to the others. 
 * Description : This is the basic javascript validator under SWAPJS namespace. Its at its very early stage. It is not attempted to be the best validator. But the efforts will be made to make it usable in its best form to most of the people. Right now it only works on textfields and textareas and validates the empty, numeric, email, url type of data. 
 * Syntax : 
   Initially you need to initiate the validator. 
   For Eg: 
   var dovalidate = new SWAPJS.doValidate(); 
   Secondly you need to pass on the parameters. The parameters foremost consists of the id of the HTML form which you want to validate. Second the set of ids of the elements which you want to validate with the type of validation you want ao have on it. 
   For Eg:
   dovalidate.init('form_id', { // form_id is the id of the form 
   name: ['empty'], // 1. name is the id of an element. empty is the type of validation 
   email: ['empty', 'email'], // 2. email is the id of an element. empty and email are the type of validation 
   webpage: ['url'] // 3. webpage is the id of an element. url is the type of validation });
   
   1. empty is in other words required field, if that field is empty form would not submit 
   2. if there is a combination of validation type. then both the validation will be checked before letting form to submit. 
   3. no empty specified means, no need for that field to be filled, but if it has some content it has to be of the type mentioned or else it wont submit. 
   Last. If we dont want any particular element to get validated, just dont mention that element's id. 
   
 * Contact Me : swapnilsarwe[at]gmail[dot]com 
 * URL : http://swapnilsarwe.com/ 
 * Examples : Run the dovalidate.0.1.html and check the source code to see the working. 
 * Limitations : It works good with the form structure I have been using for quiet some time (which is shown in the example). I am working on it to be applicable to any kind of form structure. If not then atleast make it configurable to adjust to any form structure.
 */
var SWAPJS = {};
SWAPJS.doValidator = {
	Messages : {
		'email' : 'Please enter your valid email address',
		'empty' : 'This field is required',
		'digits' : 'Please enter only numbers',
		'url' : 'Please enter appropriate URL prefixing http://site.name',
		'alphanum' : 'Alphanumeric',
		'alpha' : 'Alphabets'
	},
	RegEx : {
		'email' : /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/,
		'digits' : /^[0-9]*$/,
		'url' : /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/,
		'alphanum' : /^[a-zA-Z0-9 ]*$/,
		'alpha' : /^[a-zA-Z]*$/
	},
	Validators : {
		testreg : function(mode, val) {
			var reg = SWAPJS.doValidator.RegEx[mode];
			if (this.empty(val)) {
				if (reg.test(val) === false) {
					return false;
				} else {
					return true;
				}
			} else {
				return true;
			}
		},
		trim : function(val) {
			return val.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
		},
		empty : function(val) {
			if (this.trim(val)) {
				return true;
			} else {
				return false;
			}
		},
		email : function(val) {
			return this.testreg('email', val);
		},
		digits : function(val) {
			return this.testreg('digits', val);
		},
		url : function(val) {
			return this.testreg('url', val);
		},
		alphanum : function(val) {
			return this.testreg('alphanum', val);
		},
	},
	Error : {
		write : function(elObj) {
			SWAPJS.doValidator.DOM.addClass(elObj, 'warning');
			this.writeMsg(elObj);
		},
		remove : function(elObj) {
			SWAPJS.doValidator.DOM.removeClass(elObj, 'warning');
			this.removeMsg(elObj);
		},
		writeMsg : function(obj) {
			if (typeof obj.err == 'undefined') {
				var msgD = SWAPJS.doValidator.DOM.newElement('small', ' ('
						+ SWAPJS.doValidator.Messages[obj.val[0]] + ')', {
					id : 'x' + obj.id
				});
				SWAPJS.doValidator.DOM.addClass(msgD, 'mandatory');
				((obj.parentNode).getElementsByTagName('label'))[0]
						.appendChild(msgD);
				obj.err = true;
			}
		},
		removeMsg : function(obj) {
			if (obj.err) {
				SWAPJS.doValidator.DOM.removeElement($('x' + obj.id));
				obj.err = undefined;
			}
		}

	},
	DOM : {
		get : function(id) {
			return document.getElementById(id);
		},
		newElement : function(elementName, text, attributes) {
			if (typeof elementName != "string" || typeof attributes != "object") {
				return;
			}
			var element = document.createElement(elementName);
			if (text) {
				element.appendChild(document.createTextNode(text));
			}
			for ( var i in attributes) {
				element[i] = attributes[i];
			}
			return element;
		},
		removeElement : function(el) {
			return el.parentNode.removeChild(el);
		},
		hasClass : function(ele, cls) {
			return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
		},
		addClass : function(ele, cls) {
			if (!this.hasClass(ele, cls))
				ele.className += " " + cls;
		},
		removeClass : function(ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
				ele.className = ele.className.replace(reg, ' ');
			}
		}
	},
	Validate : {
		all : function(els) {
			var returnVal = true;
			var firstErr = null;
			for (ids in els) {
				var elObj = SWAPJS.doValidator.DOM.get(ids);
				var rules = els[ids];
				for (ruleid in rules) {
					if (!SWAPJS.doValidator.Validators[rules[ruleid]]
							(elObj.value)) {
						SWAPJS.doValidator.Error.write(elObj);
						if (returnVal) {
							firstErr = elObj;
							returnVal = false;
						}
						break;
					} else {
						SWAPJS.doValidator.Error.remove(elObj);
					}
				}
			}
			if (!returnVal) {
				if (firstErr) {
					firstErr.focus();
					firstErr.select();
				}
			}
			return returnVal;
		}
	},
	FormEvents : {
		inits : function(id, els) {
			SWAPJS.doValidator.DOM.get(id).onsubmit = function() {
				return SWAPJS.doValidator.Validate.all(els);
			};
			for (ids in els) {
				var elObj = SWAPJS.doValidator.DOM.get(ids);
				elObj.val = els[ids];
				if (elObj.val[0] == 'empty') {
					var manD = SWAPJS.doValidator.DOM.newElement('small',
							' (Required)', {});
					SWAPJS.doValidator.DOM.addClass(manD, 'mandatory');
					((elObj.parentNode).getElementsByTagName('label'))[0]
							.appendChild(manD);
				}

				elObj.onblur = function() {
					var rules = this.val;
					for (ruleid in rules) {
						if (!SWAPJS.doValidator.Validators[rules[ruleid]]
								(this.value)) {
							SWAPJS.doValidator.Error.write(this);
							break;
						} else {
							SWAPJS.doValidator.Error.remove(this);
						}
					}
				};
			}
		}
	}
};
SWAPJS.doValidate = function() {
	var validators = SWAPJS.doValidator;
	validators.init = function(id, els) {
		this.FormEvents.inits(id, els);
	};
	return validators;
};