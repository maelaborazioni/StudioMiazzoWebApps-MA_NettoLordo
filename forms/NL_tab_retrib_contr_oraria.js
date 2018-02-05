/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"B003282E-D6C1-41F3-8DB7-A9DEA24C46F4",variableType:8}
 */
var vRetCtrRetribuzioneAnnuale = null;

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
 * @properties={typeid:24,uuid:"D9F4EE0E-F7E8-4E9F-89EB-D73F9CD8CCB7"}
 */
function onDataChangeRetribuzione(oldValue, newValue, event) {
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('La retribuzione non ammette valori valori negativi',null,500);
		return false;
	}
	
	if(newValue == null)
	{
		forms.NL_main.setStatusWarning('Attenzione, i contributi precedentemente immessi verranno eliminati',null,500);
		globals.pulisciContributi();
		forms.NL_tab_retrib_contr.elements.btn_lkp_contributiaggiuntivi.enabled = 
		forms.NL_tab_retrib_contr.elements.btn_ctr_remove.enabled = false;
		return true;
	}
	
	forms.NL_tab_retrib_contr.elements.btn_lkp_contributiaggiuntivi.enabled = 
	forms.NL_tab_retrib_contr.elements.btn_ctr_remove.enabled = true;
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
    return true;
}
