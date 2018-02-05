/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"428F4C72-20EB-414A-9A41-20BCC244D3D4",variableType:8}
 */
var vIrpefAliquotaComuneResidenza = 0;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"E0AD6EA5-2A03-4293-BAE7-4A781EE9EDD3",variableType:12}
 */
var vIrpefCodComuneResidenza = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"930741CE-BC5F-4492-8FED-E1FF4CF0B29C",variableType:12}
 */
var vIrpefComuneResidenza = null;

/**
 * Aggiorna il valore dell'aliquota in base al comune di residenza selezionato
 * 
 *
 * @properties={typeid:24,uuid:"105BB859-2B55-4B9A-9B7F-6189529CA1BA"}
 */
function updateAliquota(rec)
{
	//TODO verificare dove recuperare l'aliquota del comune
	vIrpefCodComuneResidenza = rec['codcomune'];
	vIrpefComuneResidenza = rec['descrizione'];
	vIrpefAliquotaComuneResidenza = 0;
	
	globals.verificaDatiInseriti();
}

/**
 * @properties={typeid:24,uuid:"7D8B6455-389B-46EB-B759-626C32645DCF"}
 */
function resetValues()
{
	vIrpefAliquotaComuneResidenza = 0;
	vIrpefCodComuneResidenza = null;
	vIrpefAliquotaComuneResidenza = null;
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
 * @properties={typeid:24,uuid:"E1308B4D-619C-42CB-A72E-9144DD971820"}
 */
function onDataChangeComuneResidenza(oldValue, newValue, event) {
	
     globals.calcolaImponibile();
     globals.aggiornaImponibileTabella();
     
	 return true;
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
 * @properties={typeid:24,uuid:"1E65B707-C3CB-4860-8A36-76381222B8CC"}
 */
function onDataChangeAliquota(oldValue, newValue, event) {
	
	globals.calcolaImponibile();
    globals.aggiornaImponibileTabella();
	return true
}
