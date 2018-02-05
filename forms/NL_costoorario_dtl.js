/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"B6B77588-886A-4967-819E-54DF43F2174C"}
 */
var vDescrizione = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"71269C1E-A793-4F6A-9E92-86F2D30E0A99",variableType:-4}
 */
var vIsInEdit = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"12D89985-2B7F-42A4-B2E1-E26B2FDD3F5B",variableType:8}
 */
var vMaggiorazione = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BCE88CC6-593C-4DA2-B71C-EAC67E7D95C7"}
 */
function annullaInserimento(event) {
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	
}

/**
 * @properties={typeid:24,uuid:"B6BFC983-DB12-4D15-A7FE-CAD3431FCD60"}
 */
function validaVoceCosto()
{
	if(isNaN(vMaggiorazione) || vMaggiorazione == null)
	   return false;
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CFA7AB88-F469-4164-8177-695B84BC77D6"}
 */
function confermaInserimento(event)
{
	if(validaVoceCosto())
	{
		try
		{
			var frm = forms['NL_costoorario_tbl_temp'];
			var rec;
			databaseManager.startTransaction();
			
			if(vIsInEdit)
				rec = frm.foundset.getSelectedRecord();
			else
				rec = frm.foundset.getRecord(frm.foundset.newRecord());
				
			if(rec && rec != -1)
			{
				rec['descrizione'] = vDescrizione;
				rec['percentuale'] = vMaggiorazione;
			}
			else
				throw new Error("Errore durante il recupero del record");
				
			if(!databaseManager.commitTransaction())
				throw new Error("Errore durante il salvataggio");
			else
			{
//				globals.calcolaSoggBen();
//				globals.calcolaImponibile();
//				globals.aggiornaImponibileTabella();
				globals.verificaDatiInseriti();
			}
		}
		catch (ex) 
		{
			application.output(ex.message, LOGGINGLEVEL.ERROR);
			databaseManager.rollbackTransaction();
		}

		globals.ma_utl_setStatus(globals.Status.BROWSE, controller.getName());
		globals.svy_mod_closeForm(event);
	} else
		forms.NL_main.setStatusWarning('Inserire un valore valido per la maggiorazione',null,500);
}

/**
 * @param {String} _descrizione
 * @param {Number} _maggiorazione
 *
 * @properties={typeid:24,uuid:"002870ED-D27C-4E66-9579-5953AC5E5D85"}
 */
function inizializzaVariabiliVoceCosto(_descrizione,_maggiorazione)
{
	vDescrizione = _descrizione;
	vMaggiorazione = _maggiorazione;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6FA4EC9B-72A8-42FF-B209-5A04019B604C"}
 */
function onShow(firstShow, event) {
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
}

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
 * @properties={typeid:24,uuid:"14001198-6699-46AF-9936-54C2219D5F14"}
 */
function onDataChangeMaggiorazione(oldValue, newValue, event) {
	
	if(newValue == null)
	{	
		forms.NL_main.setStatusWarning('Inserire un valore valido per la maggiorazione',null,500);
	    return false;
	}
	return true;
}
