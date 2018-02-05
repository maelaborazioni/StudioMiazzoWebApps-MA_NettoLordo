/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"41D70489-01EB-4F6E-8E99-3031796E4740",variableType:-4}
 */
var vBenefit = false;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"14AF1CFF-7749-404F-9E53-8B6F3D753A06"}
 */
var vDescrizione = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"182000FE-F8E5-4435-8818-893BF4ADB6E9",variableType:-4}
 */
var vDetassata = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"0E59BFA9-8560-44DC-A65A-7A3EB9B0B802",variableType:8}
 */
var vImportoLordo = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"A3C06792-4635-43F0-8265-F34A577D6055",variableType:-4}
 */
var vIsInEdit = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"40AF5EE5-E404-4491-9E40-290312AB5671",variableType:8}
 */
var vMesi = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"327883F0-640B-494A-A902-4D6E6EDA4BCE",variableType:8}
 */
var vQta = null;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"ACF4C18F-D228-4B8E-AB76-F33F12D3F63C",variableType:-4}
 */
var vSoggetto = false;

/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"C8DE0231-BC40-498C-AF21-DBF98AA1515E",variableType:-4}
 */
var vSuTfr = false;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"F20A533C-80CA-4437-9FF6-E17D77A615A6",variableType:8}
 */
var vTotale = 0;

/**
 * Inizializza le variabili della form per l'inserimento e/o la modifica di una voce
 * 
 * @param {String} _descrizione
 * @param {Number} _mesi
 * @param {Number} _qta
 * @param {Number} _importoLordo
 * @param {Number} _totale
 * @param {Boolean} _vaSuTfr
 * @param {Boolean} _soggetto
 * @param {Boolean} _benefit
 * @param {Boolean} _detassata
 * 
 * @properties={typeid:24,uuid:"96ABD40C-E2A9-42BA-9640-EA8B92A8EA27"}
 */
function inizializzaVariabiliVoce(_descrizione,_mesi,_qta,_importoLordo,_totale,_vaSuTfr,_soggetto,_benefit,_detassata)
{
	vDescrizione = _descrizione;
	vMesi = _mesi;
	vQta = _qta;
	vImportoLordo = _importoLordo;
	vTotale = _totale;
	vSuTfr = _vaSuTfr;
	vSoggetto = _soggetto;
	vBenefit = _benefit;
	vDetassata = _detassata;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"584DB128-7435-4AE7-AE99-FB13A011DDC6"}
 */
function annullaInserimento(event) {
	
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	globals.svy_mod_closeForm(event);
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"CDC489C9-24E1-4855-A932-324960FC4431"}
 */
function confermaInserimento(event) {

	if (validaVoce()) {

		try {
			var frm = forms['NL_voci_aggiuntive_tbl_temp'];
			var rec;
			databaseManager.startTransaction();

			if (vIsInEdit)
			    rec = frm.foundset.getSelectedRecord();
			else
				rec = frm.foundset.getRecord(frm.foundset.newRecord());

			if (rec && rec != -1) {
				rec['descrizione'] = vDescrizione;
				rec['mesi'] = vMesi;
				rec['qta'] = vQta;
				rec['importolordo'] = vImportoLordo;
				rec['totale'] = vTotale;
				rec['sutfr'] = vSuTfr;
				rec['soggetto'] = vSoggetto;
				rec['benefit'] = vBenefit;
				rec['detassata'] = vDetassata;
			} else
				throw new Error("Errore durante il recupero del record");

			if (!databaseManager.commitTransaction())
				throw new Error("Errore durante il salvataggio");
			else
			{
				globals.calcolaSoggBen();
				globals.calcolaImponibile();
				globals.aggiornaImponibileTabella();
				globals.verificaDatiInseriti();
			}
			
		} catch (ex) {
			application.output(ex.message, LOGGINGLEVEL.ERROR);
			databaseManager.rollbackTransaction();
		}

		globals.ma_utl_setStatus(globals.Status.BROWSE, controller.getName());
		globals.svy_mod_closeForm(event);
	} 
	else
		forms.NL_main.setStatusWarning('Inserire almeno un valore per mesi,quantità od importo lordo',null,500);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"77CA123B-EB8B-46D2-9F81-E59EE162A231"}
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
 * @properties={typeid:24,uuid:"F4D65B59-5955-4ABD-B854-9DC715B80A53"}
 */
function onDataChangeMesi(oldValue, newValue, event) {
	
   calcolaTotale(newValue,vQta,vImportoLordo);
   
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
 * @properties={typeid:24,uuid:"CB2D24BA-3ECE-47F9-8B5A-1DE861861D1F"}
 */
function onDataChangeQta(oldValue, newValue, event) {
	
	calcolaTotale(vMesi,newValue,vImportoLordo);
	
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
 * @properties={typeid:24,uuid:"40FFA52C-FE78-4C14-83B5-BA138A98F264"}
 */
function onDataChangeImporto(oldValue, newValue, event) {
	
	calcolaTotale(vMesi,vQta,newValue);
	
	return true;
}

/**
 * Calcola il totale per il  numero di mesi, quantità ed importo immessi
 * 
 * @param {Number} mesi
 * @param {Number} qta
 * @param {Number} importo
 *
 * @properties={typeid:24,uuid:"C76E8709-B3B8-4243-9975-ABE8F9DFCC98"}
 */
function calcolaTotale(mesi,qta,importo)
{
	if(mesi == null) mesi = 1;
	if(qta == null) qta = 1;
	if(importo == null) importo = 1;
	
	vTotale = mesi*qta*importo;
}

/**
 * @properties={typeid:24,uuid:"2A09AC5C-2872-4CAE-8F0A-EC1F8600449F"}
 */
function validaVoce()
{
	if(vMesi == null)
		vMesi = 1;
	if(vQta == null)
		vQta = 1;
	if(vImportoLordo == null)
		vImportoLordo = 1;
		
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
 * @properties={typeid:24,uuid:"F9B95D93-72A7-4ADF-9F6A-7D94D1C64D9B"}
 */
function onDataChangeSoggetto(oldValue, newValue, event) {
	
	if(newValue)
	{
		vBenefit = 0;
		vDetassata = 0;
	}
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
 * @properties={typeid:24,uuid:"023CDBD7-0042-4A80-870B-23218D5F62DD"}
 */
function onDataChangeBenefit(oldValue, newValue, event) {
	
    if(newValue)
    {
    	vSoggetto = 0;
    	vDetassata = 0;
    }
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
 * @properties={typeid:24,uuid:"0013684E-F148-40F6-81BE-E0AD537F5692"}
 */
function onDataChangeDetassata(oldValue, newValue, event) {
	
    if(newValue)
    {
    	vSoggetto = 0;
    	vBenefit = 0;
    }
	return true;
}
