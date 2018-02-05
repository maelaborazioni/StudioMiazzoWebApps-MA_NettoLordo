/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"2029051A-7334-4565-837E-49157FE2C96D",variableType:8}
 */
var vRetCtrRetribuzioneMensile = null;

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
 * @properties={typeid:24,uuid:"840AC52C-35C8-496B-ACD2-8974D8D6C485"}
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
