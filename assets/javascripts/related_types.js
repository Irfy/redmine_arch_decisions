/**
 * Functions used by the "related factors", "related strategies" and other forms in 
 * the Redmine Arch Decisions plugin.
 * NOTE: requires the shortcut.js script to be included in any page that uses these scripts
 * 
 * @author timothy.high@gmail.com
 */

/*
 * Functions for the New <Entity> forms
 */
function initializeForm(frm) {
	deactivateShortcuts(frm)
	cancelForm(frm);
}
function showForm(frm) {
	Element.hide(frm + '_link');
	Element.show(frm + '_form_row');
	$(frm).elements[0].focus();
	// TODO: get rid of this hack. Dunno why I can't call scrollTo outside this method.
	if (frm == "new_discussion") {
		Element.scrollTo('new_discussion_form_row');
	}
	deactivateShortcuts();
}
function hideForm(frm) {
	Element.hide(frm + '_form_row');
	Element.show(frm + '_link');
	activateShortcuts()
}
function cancelForm(frm) {
	hideForm(frm);
	Form.reset(frm)
}
function callOnSubmit(frm) {
	var code = $(frm).getAttribute('onsubmit');
	eval(code);
}
// Hotkey / Shortcut functions
function activateShortcuts() {
	// New Factor
	shortcut.add("f",function() {
		showForm('new_factor');
	});
	// Add Factor
	shortcut.add("a",function() {
		var elem = $('add_factor_link');
		elem.onclick.apply(elem);
		});
	// New Strategy
	shortcut.add("s",function() {
		showForm('new_strategy');
	});
	// Add Issue
	shortcut.add("i",function() {
		showForm('add_issue');
	});
	// New Discussion Comment
	shortcut.add("c",function() {
		showForm('new_discussion');
	});
}
function deactivateShortcuts() {
	shortcut.remove("f");
	shortcut.remove("a");
	shortcut.remove("s");
	shortcut.remove("i");
	shortcut.remove("c");
}

/*
 * Functions for Factor prioritization (drag and drop)
 */
function showDropTarget(target) {
	Element.setStyle(target, "background-color: #000000;")
}
function showDropped(target) {
	Element.setStyle(target, "background-color: #FF0000;")
}

/*
 * Document intialization actions
 */
// Note: this takes too long and looks chunky. For better visuals, include a call to initializeForm()
// right in your page
//Event.observe(window, 'load',
//      function() { initializeForm() }
//    );
