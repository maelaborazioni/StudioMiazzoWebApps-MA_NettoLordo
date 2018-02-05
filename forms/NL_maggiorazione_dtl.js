/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"8FED7F8F-A926-4EA5-83B1-C2F14EDFEBB6"}
 */
var vDescrizione = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"4AF8A860-2908-42A6-85B0-3D798A28EDCA",variableType:-4}
 */
var vIsInEdit = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"A3E644DB-3129-431A-8684-B4F7583C9589",variableType:8}
 */
var vMaggiorazione = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CE06403D-456C-4625-AE51-355FAFA6B976",variableType:8}
 */
var vSuTfr = 0;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E1A41228-031B-4612-BD5A-B9560260BA59"}
 */
function annullaInserimento(event) {
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	
}

/**
 * @properties={typeid:24,uuid:"4BCC382D-4999-41C4-8086-FAC545723973"}
 */
function validaVoceStraordinario()
{
	if(isNaN(vMaggiorazione) || vMaggiorazione == null)
	   return false;
	return true;
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"874ED864-A1B2-4527-AAE8-47F84ADF2734"}
 */
function confermaInserimento(event)
{
	if(validaVoceStraordinario())
	{
		try
		{
			var frm = forms['NL_maggiorazione_tbl_temp'];
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
				rec['sutfr'] = vSuTfr;
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
 * @param {Number} _suTfr
 *
 * @properties={typeid:24,uuid:"5D9CE89D-55C0-40A8-851B-59C65377AE74"}
 */
function inizializzaVariabiliVoceCosto(_descrizione,_maggiorazione,_suTfr)
{
	vDescrizione = _descrizione;
	vMaggiorazione = _maggiorazione;
	vSuTfr = _suTfr;
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"1749E6BD-6CF7-495F-ABB7-66CF62B682A6"}
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
 * @properties={typeid:24,uuid:"444938EE-BA26-4AC9-A155-1A450E9D2A51"}
 */
function onDataChangeMaggiorazione(oldValue, newValue, event) {
	
	if(newValue == null)
	{	
		forms.NL_main.setStatusWarning('Inserire un valore valido per la maggiorazione',null,500);
	    return false;
	}
	return true;
}
