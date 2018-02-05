/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A1C6D492-C073-4C07-9E4C-DEF4452D5180"}
 */
function onDataChangeVaSuTfr(oldValue, newValue, event) {
	
	if(forms.NL_tab_inquadramento.vInqIdSettoreAppartenenza == 9)
	{
		forms.NL_main.setStatusWarning('Non si può modificare nel caso di collaboratori o amministratori',null,500);
	    newValue = oldValue;
	}
	return true;
}
