/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"5EC719D4-11C3-41F9-ABCC-2F2CD41F14D0",variableType:8}
 */
var vIrpefAliquotaDigitata = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"29010E16-BC3F-4EA7-8C2B-972C202464FF",variableType:4}
 */
var vChkIrpefAliquotaDigitata = 0;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"C0B4329B-B8FC-4B27-8A8C-EFC5B0073AC1",variableType:8}
 */
var vIrpefConiuge = 3;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"39032272-E0A5-4839-A37E-6C11B38A7C37",variableType:8}
 */
var vIrpefCriterioCalcoloAdd = 1;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"49FF41A2-2438-4CE3-A917-19642D29CB59",variableType:8}
 */
var vIrpefNumAltriFamiliari = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"A1813A9D-D965-442A-9F03-70A37668B98A",variableType:8}
 */
var vIrpefNumeroMesiAltriFamiliari = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"CA759D60-E2C0-4470-AA9E-F3971A9F5E45",variableType:8}
 */
var vIrpefNumeroMesiFigli = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"725CEE9F-1043-4807-8D5A-8B44643FF2E8",variableType:8}
 */
var vIrpefNumFigliACarico = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"B2EF5138-E7A9-4574-90B9-4C69810894ED",variableType:8}
 */
var vIrpefNumFigliFino3Anni = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"FEB1B6FF-256B-491E-9B28-40CB9CCC7063",variableType:8}
 */
var vIrpefNumFigliFino3AnniHandicap = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"8CD37411-7AEA-4E1D-9E4B-1F385DFCAE89",variableType:8}
 */
var vIrpefNumFigliSup3Anni = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"E18F66B7-B2D5-4BDB-8D63-EA018F8B61D3",variableType:8}
 */
var vIrpefNumFigliSup3AnniHandicap = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"2DBB690A-147B-4727-AD63-3889C505DF33",variableType:8}
 */
var vIrpefPercAltriFamiliari = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"FB352246-5D0F-4E99-BE0B-C93BC70B9178",variableType:8}
 */
var vIrpefPercFigliACarico = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"A9919C6B-A56A-4CED-97BF-0A82A8F31839",variableType:8}
 */
var vIrpefProduzioneReddito = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"1358A7ED-5EB0-4C9B-BF1D-3192989289E0",variableType:4}
 */
var vChkBonusRenzi = 0;

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
 * @properties={typeid:24,uuid:"1FE0F54D-E357-4514-9899-E31F0E8B086F"}
 */
function onDataChangeCriterioCalcAddiz(oldValue, newValue, event) {
	
	switch(newValue)
	{
		case 1:
		forms.NL_tab_ipref_detraz_comune.vIrpefAliquotaComuneResidenza = 0;
		forms.NL_tab_ipref_detraz_comune.vIrpefCodComuneResidenza = null;
		forms.NL_tab_ipref_detraz_comune.vIrpefComuneResidenza = '';
		
		forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizComunale = 0;
		forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizRegionale = null;
	    break;
	    
		case 2:
		forms.NL_tab_ipref_detraz_comune.vIrpefAliquotaComuneResidenza = 0;
		forms.NL_tab_ipref_detraz_comune.vIrpefCodComuneResidenza = null;
		forms.NL_tab_ipref_detraz_comune.vIrpefComuneResidenza = '';
		break;
		
		case 3:
		forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizComunale = 0;
		forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizRegionale = 0;
		break;
		
		default:
			break;
			
	}
	
	elements.tabpanel_Addiz.tabIndex = newValue;
	
	if(newValue != 3)
	{
		globals.calcolaImponibile();
		globals.aggiornaImponibileTabella();
		globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"487807E6-5932-4D40-BD0F-37566A73A055"}
 */
function onDataChangePercFigliACarico(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefPercFigliACarico = null;
		return false;
	}
	
	if (!(newValue == 0 || newValue == 50 || newValue == 100))
	{
		forms.NL_main.setStatusWarning('I valori consentiti per la % sono 0,50,100',null,500);
		vIrpefPercFigliACarico = null;
		return false;
	}
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"8E1C331A-421A-4313-B2D3-3D861CAC50C6"}
 */
function onDataChangePercAltriFamACarico(oldValue, newValue, event) {
	
	if(!vIrpefNumAltriFamiliari)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di altri familiari',null,500);
		vIrpefPercAltriFamiliari = null;
	}
	
	if (!(newValue == 0 || newValue == 50 || newValue == 100))
	{
		forms.NL_main.setStatusWarning('I valori consentiti per la % sono 0,50,100',null,500);
		vIrpefPercAltriFamiliari = null;
	}
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"285279DD-DD04-4F6F-BB51-6F9A1EC21EF6"}
 */
function onDataChangeNumFigliMenodiTreAnni(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefNumFigliFino3Anni = null;
	}
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('Non sono ammessi valori inferiori a zero',null,500);
		vIrpefNumFigliFino3Anni = null;
	}
	
	var numFigliSup3Anni = vIrpefNumFigliSup3Anni ? vIrpefNumFigliSup3Anni : 0;
	if(vIrpefNumFigliSup3Anni && newValue != vIrpefNumFigliACarico - numFigliSup3Anni)
	   forms.NL_main.setStatusWarning('La somma dei figli con più e meno di 3 anni deve essere uguale al totale dei figli',null,500);
	
	if(newValue == null || newValue == 0)
		vIrpefNumFigliFino3AnniHandicap = null;
		
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"49C8C4DB-DA7F-45C7-8CF2-E25E5B36A1BE"}
 */
function onDataChangeNumFigliPiudiTreAnni(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefNumFigliSup3Anni = null;
	}
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('Non sono ammessi valori inferiori a zero',null,500);
		vIrpefNumFigliSup3Anni = null;
	}
	
	var numFigliFino3Anni = vIrpefNumFigliFino3Anni ? vIrpefNumFigliFino3Anni : 0;
	if(vIrpefNumFigliFino3Anni && newValue != vIrpefNumFigliACarico - numFigliFino3Anni)
	   forms.NL_main.setStatusWarning('La somma dei figli con più e meno di 3 anni deve essere uguale al totale dei figli',null,500);
	
	if(newValue == null || newValue == 0)
		vIrpefNumFigliFino3AnniHandicap = null;
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"43510D9E-0E06-470F-BBE0-28E1977F4635"}
 */
function onDataChangeNumeroFigliMenoDiTreAnniHandicap(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefNumFigliFino3AnniHandicap = null;
	}
	
	if(!vIrpefNumFigliFino3Anni)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli fino a 3 anni',null,500);
		vIrpefNumFigliFino3AnniHandicap = null;
	}
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('Non sono ammessi valori inferiori a zero',null,500);
		vIrpefNumFigliFino3AnniHandicap = null;
	}
	
	if(newValue > vIrpefNumFigliFino3Anni)
	{
		forms.NL_main.setStatusWarning('Non si può inserire un numero di figli con handicap superiore al totale',null,500);
		vIrpefNumFigliFino3AnniHandicap = null;
	}
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();

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
 * @properties={typeid:24,uuid:"EA6B019C-3992-417F-A594-636FCF904E9C"}
 */
function onDataChangeNumeroFigliPiuDiTreAnniHandicap(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefNumFigliSup3AnniHandicap = null;
	}
	
	if(!vIrpefNumFigliSup3Anni)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli superiore a 3 anni',null,500);
		vIrpefNumFigliSup3AnniHandicap = null;
	}
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('Non sono ammessi valori inferiori a zero',null,500);
		vIrpefNumFigliSup3AnniHandicap = null;
	}
	
	if(newValue > vIrpefNumFigliSup3Anni)
	{
		forms.NL_main.setStatusWarning('Non si può inserire un numero di figli con handicap superiore al totale',null,500);
		vIrpefNumFigliSup3AnniHandicap = null;
	}

	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"E93D3ECB-3414-45F5-8273-23B05D40B726"}
 */
function onDataChangeMesiFigli(oldValue, newValue, event) {
	
	if(!vIrpefNumFigliACarico)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di figli',null,500);
		vIrpefNumeroMesiFigli = null;
	}
	if(!newValue || newValue <= 0 || newValue > 12)
	{
		forms.NL_main.setStatusWarning('Va inserito un numero di mesi compreso tra 1 e 12',null,500);
		vIrpefNumeroMesiFigli = null;
	}

	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"F26EC4A1-9986-45E7-B57C-E7CBCA17E87B"}
 */
function onDataChangeMesiAltriFam(oldValue, newValue, event) {
	
	if(!vIrpefNumAltriFamiliari)
	{
		forms.NL_main.setStatusWarning('Non è stato indicato alcun numero di altri familiari',null,500);
		vIrpefNumeroMesiAltriFamiliari = null;
	}
	if(!newValue || newValue <= 0 || newValue > 12)
	{
		forms.NL_main.setStatusWarning('Va inserito un numero di mesi compreso tra 1 e 12',null,500);
		vIrpefNumeroMesiAltriFamiliari = null;
	}

	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
	
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
 * @properties={typeid:24,uuid:"4168A77B-D22B-4E93-BAB2-0F5EAA4A0602"}
 */
function onDataChangeProduzioneReddito(oldValue, newValue, event) {
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"E2865E30-6F6F-44EE-9C5B-94AF11050C86"}
 */
function onDataChangeConiuge(oldValue, newValue, event) {
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"ADCF8FB3-7B99-4138-AE7A-8819F36AD627"}
 */
function onDataChangeProdReddito(oldValue, newValue, event) {
	
	if(newValue == 2)
	   abilitaSelezioneFamiliari(false);
	else
	   abilitaSelezioneFamiliari(true);
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
		
	return true
}

/**
 * @param {Boolean} abilita
 *
 * @properties={typeid:24,uuid:"A390B5B0-B4E0-4424-8118-B5595135177E"}
 */
function abilitaSelezioneFamiliari(abilita)
{
	if(!abilita)
	{
		vIrpefConiuge = 3;
		vIrpefNumAltriFamiliari =
		vIrpefNumeroMesiAltriFamiliari = 
		vIrpefNumeroMesiFigli = 
		vIrpefNumFigliACarico= 
		vIrpefNumFigliFino3Anni = 
		vIrpefNumFigliFino3AnniHandicap=
		vIrpefNumFigliSup3Anni = 
		vIrpefNumFigliSup3AnniHandicap = 
		vIrpefPercAltriFamiliari = 
		vIrpefPercFigliACarico = null;
	}
	
	elements.cmb_coniuge.visible = elements.lbl_coniuge.visible =
	elements.fld_num_fam_carico.visible = elements.lbl_num_fam_carico.visible = 
	elements.fld_num_figli_carico.visible = elements.lbl_num_figli_carico.visible =
	elements.fld_num_figli_inf3.visible = elements.lbl_num_figli_inf3.visible = 
	elements.fld_num_figli_inf3_h.visible = elements.lbl_num_figli_inf3_h.visible = 
	elements.fld_num_figli_sup3.visible = elements.lbl_num_figli_sup3.visible = 
	elements.fld_num_figli_sup3_h.visible = elements.lbl_num_figli_sup3_h.visible = 
	elements.fld_num_mesi_altrifam.visible = elements.lbl_num_mesi_altrifam.visible =
	elements.fld_num_mesi_figli.visible = elements.lbl_num_mesi_figli.visible = 
	elements.fld_perc_fam_carico.visible = elements.lbl_perc_fam_carico.visible = 
	elements.fld_perc_figli_carico.visible = abilita;
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
 * @properties={typeid:24,uuid:"7E4C8157-54D7-4CEB-92ED-E2B3F9821BC5"}
 */
function onDataChangeNumFigliACarico(oldValue, newValue, event) {
	
	if(newValue < 0)
	{
		forms.NL_main.setStatusWarning('Non sono ammessi valori inferiori a zero',null,500);
		vIrpefNumFigliACarico = null;
	}
	
	if(newValue == null || (newValue && oldValue != newValue))
	{
		vIrpefNumeroMesiFigli = 
		vIrpefNumFigliFino3Anni = 
		vIrpefNumFigliFino3AnniHandicap=
		vIrpefNumFigliSup3Anni = 
		vIrpefNumFigliSup3AnniHandicap = 
		vIrpefPercFigliACarico = null;
	}
	
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	
	if(newValue == null)
		forms.NL_main.elements.btn_openRtf.enabled = true;
	else
		forms.NL_main.elements.btn_openRtf.enabled = false;
	
	return true;
}

/**
 * @properties={typeid:24,uuid:"10F034FF-E2D0-4B9C-9564-F0FF3FE5BBDB"}
 */
function resetValues()
{
//	 vIrpefCriterioCalcoloAdd = 1;

	 vIrpefProduzioneReddito = 1;

	 vIrpefConiuge = 3;

	 vIrpefNumFigliACarico = null;

	 vIrpefPercFigliACarico = null;

	 vIrpefNumeroMesiFigli = null;

	 vIrpefNumFigliFino3Anni = null;

	 vIrpefNumFigliFino3AnniHandicap = null;

	 vIrpefNumFigliSup3Anni = null;

	 vIrpefNumFigliSup3AnniHandicap = null;

	 vIrpefNumAltriFamiliari = null;

	 vIrpefPercAltriFamiliari = null;
	 
	 vIrpefNumeroMesiAltriFamiliari = null;

	 forms.NL_tab_ipref_detraz_comune.vIrpefComuneResidenza = null;
	 forms.NL_tab_ipref_detraz_comune.vIrpefCodComuneResidenza = null;
	 forms.NL_tab_ipref_detraz_comune.vIrpefAliquotaComuneResidenza = 0;
	 
	 forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizRegionale = null;
	 forms.NL_tab_ipref_detraz_importo.vIrpefImportoAddizComunale = null; 
	 
	 globals.calcolaImponibile();
	 globals.aggiornaImponibileTabella();
	 globals.verificaDatiInseriti();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"3E37809E-81AF-4A1E-87CF-9D1F66C128E1"}
 */
function onShow(firstShow, event) 
{
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
	
	var frm = forms.NL_tab_inquadramento;
	if(frm.vInqTipologiaCalcolo == 2)
	{
		elements.chk_bonus_renzi.enabled =
			elements.lbl_bonus_renzi.enabled = 
				false;
		elements.lbl_bonus_renzi.toolTipText = 'Il Bonus Renzi non è applicabile nel calcolo dal netto al lordo';		
		elements.chk_bonus_renzi.readOnly = true;
		vChkBonusRenzi = 0;		
	}
	else
	{
		elements.chk_bonus_renzi.enabled = 
		    elements.lbl_bonus_renzi.enabled =
			   true;
	   elements.lbl_bonus_renzi.toolTipText = '';		   
	   elements.chk_bonus_renzi.readOnly = false;	   
	}
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
 * @properties={typeid:24,uuid:"26A6FA53-B3F4-4787-AA96-70FA63FB920C"}
 */
function onDataChangeAltriFamiliari(oldValue, newValue, event)
{
	globals.calcolaImponibile();
    globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"09F42FCF-E86C-4169-BEA5-DF11DA97A859"}
 */
function onDataChangeChkAliquotaIrpefFissa(oldValue, newValue, event)
{
	elements.fld_aliquota_irpef.enabled = newValue;
	
	if(!newValue)
		vIrpefAliquotaDigitata = null;
	else if(newValue && vIrpefAliquotaDigitata != null)
	{
		globals.calcolaImponibile();
		globals.aggiornaImponibileTabella();
		globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"864FAF6F-D8B8-4E87-B47A-6DDEAABF7C46"}
 */
function onDataChangeAliquotaIrpefFissa(oldValue, newValue, event)
{
	if(newValue)
	{
		if(newValue >= 23 && newValue<= 45)
		{
			elements.lbl_aliquota_irpef_error.visible = false;
			
			globals.calcolaImponibile();
			globals.aggiornaImponibileTabella();
			globals.verificaDatiInseriti();
		}
		else
		{
			elements.lbl_aliquota_irpef_error.visible = true;
			return false;
		}
	}
	return true;
}