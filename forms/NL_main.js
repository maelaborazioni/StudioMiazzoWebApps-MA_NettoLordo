/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"CFE529D4-1094-4FAC-BFDF-C2F7429E3BC3",variableType:-4}
 */
var arrBtnsStatus = [false,false,true,true,true,false,true,true,true,true,true,true,true,false,false,true,true,true];

/** 
 * @param _firstShow
 * @param _event
 *
 * @properties={typeid:24,uuid:"67DE164C-D762-459C-AE5A-8906AB6A4B97"}
 */
function onShowForm(_firstShow, _event) {
	
   plugins.busy.prepare();
   
   var frmInq = forms.NL_tab_inquadramento;
   var frmRetrib = forms.NL_tab_retrib_contr;
   var frmDetraz = forms.NL_tab_ipref_detraz;
   var frmStrao = forms.NL_tab_straordinari;
   
   _super.onShowForm(_firstShow, _event);
   
   if(_firstShow)
   {
	   setButtonsStatus();
	   
	   elements.tabSteps.setTabEnabledAt(1,true);
	   elements.tabSteps.setTabEnabledAt(2,false);
	   elements.tabSteps.setTabEnabledAt(3,false);
	   elements.tabSteps.setTabEnabledAt(4,false);
	   
	   globals.ma_utl_setStatus(globals.Status.EDIT,frmInq.controller.getName());
	   globals.ma_utl_setStatus(globals.Status.EDIT,frmRetrib.controller.getName());
	   globals.ma_utl_setStatus(globals.Status.EDIT,frmDetraz.controller.getName());
	   globals.ma_utl_setStatus(globals.Status.EDIT,frmStrao.controller.getName());
   }
     
}

/**
 * @param {Number} currIndex
 * @param {Number} nextIndex
 *
 * @return {String}
 * 
 * @properties={typeid:24,uuid:"235E0D54-7A92-4882-9E73-F009B1F0728F"}
 */
function verificaPassaggioTab(currIndex, nextIndex) {
	
	var error = 0;
	var errMsg = '';
	
	switch (currIndex) {
	case 1:
		error = verificaDatiInquadramento();
		switch (error) {
		case 1:
			errMsg = 'Inserire l\'anno fiscale per il quale eseguire il calcolo';
			break;
		case 2:
		errMsg = 'Inserire le ore di ferie e di rol mensili';
			break;
		case 3:
		errMsg = 'Compilare i campi specifici del contratto di lavoro';
			break;
		case 4:
		errMsg = 'Inserire il settore di appartenenza contributiva';
			break;
		case 5:
		errMsg = 'Selezionare la dimensione aziendale';
			break;
		case 6:
		errMsg = 'Inserire il valore dell\'aliquota INAIL per il calcolo del costo ditta';
			break;
		case 7:
		errMsg = 'Selezionare la qualifica';
			break;
		case 8:
		errMsg = 'Selezionare la situazione lavorativa';
			break;
		case 9:
		errMsg = 'Selezionare la tipologia del rapporto di lavoro';
			break;
		case 10:
		errMsg = 'Inserire i valori per le ore di ferie e di rol mensili';
			break;
		case 11:
		errMsg = 'Inserire il valore per l\'orario part-time';
			break;
		default:
			break;
		}
		break;
	case 2:
		error = verificaDatiRetribCtr();
		switch (error) {
		case 1:
		errMsg = 'Inserire il valore per la retribuzione mensile';
			break;
		case 2:
		errMsg = 'Inserire il valore per la retribuzione annuale';
			break;
		default:
			break;

		}
		break;
	case 3:
		error = verificaDatiIrpef();
		switch (error) {
		case 1:
		errMsg = 'Inserire entrambi i valori degli importi addizionali comunale e regionale';
			break;
		case 2:
		errMsg = 'Selezionare il comune di residenza';
			break;
		case 3:
		errMsg = 'Selezionare l\'aliquota relativa al comune di residenza';
			break;
		case 4:
		errMsg = 'Non lo so';
			break;
		case 5:
		errMsg = 'Selezionare la produzione di reddito';
			break;
		case 6:
		errMsg = 'Selezionare la presenza o meno del coniuge';
			break;
		case 7:
		errMsg = 'Compilare tutti i campi relativi alla presenza di figli a carico';
			break;
		case 8:
		errMsg = 'Compilare tutti i campi relativi alla presenza di altri familiari a carico';
		    break;
		case 9:
		errMsg = 'Il numero di figli immessi non combacia col numero di figli totale';
		    break;	
		
		default:
			break;
		}
		break;
	default:
		break;

	}
	
    return errMsg;
}

/** 
 * @param event
 *
 * @properties={typeid:24,uuid:"92DC9758-C907-46B8-B246-71FF80AEB1DE"}
 */
function onHide(event) {
	
	_super.onHide(event);
	globals.ma_utl_setStatus(globals.Status.BROWSE,controller.getName());
	
}

/**
 * Verifica se i parametri del tab inquadramento siano sufficienti a procedere
 * 
 * @return {Number} valore corrispondente alla segnalazione di compilazione necessaria campo
 * 
 * @properties={typeid:24,uuid:"BCA57075-D752-4819-8FFC-CE8D8D7F3FFE"}
 */
function verificaDatiInquadramento()
{
	var frm = forms.NL_tab_inquadramento;
	if(!frm.vInqAnnoFiscale)
	   return 1;
	if(frm.vInqTipoCalcoloFerie == 2 && (!frm.vInqOreFerie || !frm.vInqOreRol))
	   return 2;
	if(frm.vInqDivisoreCCNL == null || frm.vInqOreSettimanali == null || frm.vInqMensilita == null)
	   return 3;
	if(frm.vInqCodSettoreAppartenenza == null)
	   return 4;
	if(!frm.vInqDimAziendale)
	   return 5;
	if(frm.vInqAliquotaINAIL == null)
	   return 6;
	if(!frm.vInqIdQualifica)
	   return 7;
	if(!frm.vInqSituazioneLavorativa)
	   return 8;
	if(!frm.vInqTipologiaRapporto)
	   return 9;
	if(frm.vInqIdSettoreAppartenenza != globals.SettoriAppartenenza.COLLABORATORI && (frm.vInqOreFerie  == null || frm.vInqOreRol == null))
	   return 10;
	if(frm.vInqOrarioDiLavoro == 2 && !frm.vInqOrePartTime)
	   return 11;
		
	return 0;
}

/**
 * Verifica se i parametri del tab retribuzione e contributi siano sufficienti a procedere
 * 
 * @return {Number} valore corrispondente alla segnalazione di compilazione necessaria campo
 * 
 * @properties={typeid:24,uuid:"A4584BF6-6D44-4212-975B-E5CEEA3363C7"}
 */
function verificaDatiRetribCtr()
{
	var frm = forms.NL_tab_retrib_contr;
	var frmMensile = forms.NL_tab_retrib_contr_mensile;
	var frmAnnuale = forms.NL_tab_retrib_contr_oraria;
	
	if(frm.vRetCtrTipologiaRetribuzione == 1 && !frmMensile.vRetCtrRetribuzioneMensile)
	   return 1;
	
	if(frm.vRetCtrTipologiaRetribuzione == 2 && !frmAnnuale.vRetCtrRetribuzioneAnnuale)
	   return 2;
	
	return 0;
}

/**
 * Verifica se i parametri del tab irpef e detrazioni siano sufficienti a procedere
 * 
 * @return {Number} valore corrispondente alla segnalazione di compilazione necessaria campo
 *  
 * @properties={typeid:24,uuid:"D5636DEA-F88F-410E-9239-B910A968C266"}
 */
function verificaDatiIrpef()
{
	var frm = forms.NL_tab_ipref_detraz;
	var frmFisso = forms.NL_tab_ipref_detraz_importo;
	var frmComun = forms.NL_tab_ipref_detraz_comune;
	
	if(frm.vIrpefCriterioCalcoloAdd == 2 && (frmFisso.vIrpefImportoAddizComunale == null
			                                  || !frmFisso.vIrpefImportoAddizRegionale))
		return 1;
	if(frm.vIrpefCriterioCalcoloAdd == 3) 
		if(!frmComun.vIrpefComuneResidenza)
			return 2;
	    if(frmComun.vIrpefAliquotaComuneResidenza == null)
	    	return 3;
		
	if(frm.vIrpefProduzioneReddito == null && !frm.vChkIrpefAliquotaDigitata
		||	frm.vIrpefProduzioneReddito == null && frm.vChkIrpefAliquotaDigitata && frm.vIrpefAliquotaDigitata == null)
		return 5;
	if(frm.vIrpefProduzioneReddito){
	
		if(frm.vIrpefConiuge == null)
	        return 6;
		if(frm.vIrpefNumFigliACarico && (frm.vIrpefPercFigliACarico == null || frm.vIrpefNumeroMesiFigli == null))
		    return 7;
	    if(frm.vIrpefNumAltriFamiliari && (frm.vIrpefPercAltriFamiliari == null || frm.vIrpefNumeroMesiAltriFamiliari == null))
	    	return 8;
	    if(frm.vIrpefNumFigliACarico && ((frm.vIrpefNumFigliFino3Anni + frm.vIrpefNumFigliSup3Anni) != frm.vIrpefNumFigliACarico))
	    	return 9;
	}
	
	return 0;
}

/**
 * Visualizza il tab precedente
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BCDD4A19-FF62-449D-ACAE-6415E32E2D82"}
 */
function goToPreviousTab(event) 
{
	process_previous_tab();
	
//	var params = {
//		processFunction: process_previous_tab,
//		message: '',
//		opacity: 0.2,
//		paneColor: '#434343',
//		textColor: '#EC1C24',
//		showCancelButton: false,
//		cancelButtonText: '',
//		dialogName: 'This is the dialog',
//		fontType: 'Arial,4,25',
//		processArgs: []
//	};
//	plugins.busy.block(params);
}

/**
 * @properties={typeid:24,uuid:"8FB1530D-AB8B-40AD-89FC-3CF9B015BB18"}
 */
function process_previous_tab()
{
	try
	{
		var currentIndex = elements.tabSteps.tabIndex;
		
		var errMsg = verificaPassaggioTab(currentIndex, currentIndex + 1); 
		if (errMsg == '') {			
			switch(currentIndex)
			{
				case 2:
				elements.tabSteps.setTabEnabledAt(1, true);
				elements.tabSteps.setTabEnabledAt(2, false);
				elements.tabSteps.setTabEnabledAt(3, false);
				elements.tabSteps.setTabEnabledAt(4, false);
				elements.btn_next.enabled = true;
				elements.btn_prev.enabled = false;
				break;
				case 3:
				elements.tabSteps.setTabEnabledAt(1, false);
				elements.tabSteps.setTabEnabledAt(2, true);
				elements.tabSteps.setTabEnabledAt(3, false);
				elements.tabSteps.setTabEnabledAt(4, false);
				elements.btn_next.enabled = true;
				elements.btn_prev.enabled = true;
				break;
				case 4:
				elements.tabSteps.setTabEnabledAt(1, false);
				elements.tabSteps.setTabEnabledAt(2, false);
				elements.tabSteps.setTabEnabledAt(3, true);
				elements.tabSteps.setTabEnabledAt(4, false);
				elements.btn_next.enabled = true;
				elements.btn_prev.enabled = true;
				break;
				default:
					break;
			}
					
			elements.tabSteps.tabIndex = currentIndex - 1;
		}
	}
	catch(ex)
	{
		var msg = 'Metodo process_previous_tab : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
//		plugins.busy.unblock();
		errMsg != '' ? setStatusWarning(errMsg,null,5000) : setStatusNeutral();
	}
	
}

/**
 * Visualizza il tab successivo
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"E4E04753-DAE9-4B97-8841-F428F4111B64"}
 */
function goToNextTab(event) 
{
	process_next_tab();
	
//	plugins.busy.unblock();
//	
//	var params = {
//		processFunction: process_next_tab,
//		message: '',
//		opacity: 0.2,
//		paneColor: '#434343',
//		textColor: '#EC1C24',
//		showCancelButton: false,
//		cancelButtonText: '',
//		dialogName: 'This is the dialog',
//		fontType: 'Arial,4,25',
//		processArgs: []
//	};
//	plugins.busy.block(params);
}

/**
 * @properties={typeid:24,uuid:"80EAD411-BA98-4849-82EB-62DD9D90A575"}
 */
function process_next_tab()
{
	try
	{
		var currentIndex = elements.tabSteps.tabIndex;
	    var errMsg = verificaPassaggioTab(currentIndex, currentIndex + 1); 
		if (errMsg == '') {
			
			switch(currentIndex)
			{
				case 1:
				elements.tabSteps.setTabEnabledAt(1, false);
				elements.tabSteps.setTabEnabledAt(2, true);
				elements.tabSteps.setTabEnabledAt(3, false);
				elements.tabSteps.setTabEnabledAt(4, false);
				elements.btn_next.enabled = true;
				elements.btn_prev.enabled = true;
				break;
				case 2:
				elements.tabSteps.setTabEnabledAt(1, false);
				elements.tabSteps.setTabEnabledAt(2, false);
				elements.tabSteps.setTabEnabledAt(3, true);
				elements.tabSteps.setTabEnabledAt(4, false);
				elements.btn_next.enabled = true;
				elements.btn_prev.enabled = true;
				break;
				case 3:
				elements.tabSteps.setTabEnabledAt(1, false);
				elements.tabSteps.setTabEnabledAt(2, false);
				elements.tabSteps.setTabEnabledAt(3, false);
				elements.tabSteps.setTabEnabledAt(4, true);
				elements.btn_next.enabled = false;
				elements.btn_prev.enabled = true;
				break;
			}
					
			elements.tabSteps.tabIndex = currentIndex + 1;
					
		}
	}
	catch(ex)
	{
		var msg = 'Metodo process_next_tab : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
//		plugins.busy.unblock();
		errMsg != '' ? setStatusWarning(errMsg,null,5000) : setStatusNeutral();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"EAE62F3D-9E26-47E1-A5E5-24D4AC791157"}
 */
function resetValues(event) 
{
	var frmName = elements.tabSteps.getTabFormNameAt(elements.tabSteps.tabIndex);
	forms[frmName].resetValues();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"9F60BB5E-5644-4B3D-BF7D-C889103478A5"}
 */
function resetAllValues(event) 
{
	var frmName;
	var totTabs = elements.tabSteps.getMaxTabIndex();
	for(var i=1; i<=totTabs; i++)
	{
		frmName = elements.tabSteps.getTabFormNameAt(i);
		forms[frmName].resetValues();
	}
		
	elements.tabSteps.tabIndex = 1;
	elements.tabSteps.setTabEnabledAt(1, true);
	elements.tabSteps.setTabEnabledAt(2, false);
	elements.tabSteps.setTabEnabledAt(3, false);
	elements.tabSteps.setTabEnabledAt(4, false);
	elements.btn_next.enabled = true;
	elements.btn_prev.enabled = false;
}

/**
 * @properties={typeid:24,uuid:"B52ABAA7-D0E6-46E4-AF11-2230CB5C668A"}
 */
function saveButtonsStatus(bReport,bPrev,bNext,bRefAll,bRef,bEdit,bCancel,bNuovaVar,bEditVar,bCancVar,
						   bNuovaVoce,bEditVoce,bCancVoce,bNuovoContr,bCancContr,
						   bNuovaMagg,bEditMagg,bCancMagg)
{
	arrBtnsStatus = new Array(bReport,bPrev,bNext,bRefAll,bRef,bEdit,bCancel,bNuovaVar,bEditVar,bCancVar,
		   bNuovaVoce,bEditVoce,bCancVoce,bNuovoContr,bCancContr,
		   bNuovaMagg,bEditMagg,bCancMagg);
}

/**
 * @properties={typeid:24,uuid:"9C033610-AF58-4C31-ACBE-F0135BD3DCA2"}
 */
function setButtonsStatus()
{
	elements.btn_openRtf.enabled = arrBtnsStatus[0];
	elements.btn_prev.enabled = arrBtnsStatus[1];
	elements.btn_next.enabled = arrBtnsStatus[2];
	elements.btn_refresh_all.enabled = arrBtnsStatus[3];
	elements.btn_refresh.enabled = arrBtnsStatus[4];
	elements.btn_riprendi_elab.enabled = arrBtnsStatus[5];
	elements.btn_sospendi_elab.enabled = arrBtnsStatus[6];
	forms.NL_tab_inquadramento.elements.btn_nuova_voce.enabled = arrBtnsStatus[7];
	forms.NL_tab_inquadramento.elements.btn_modifica_voce.enabled = arrBtnsStatus[8];
	forms.NL_tab_inquadramento.elements.btn_cancella_voce.enabled = arrBtnsStatus[9];
	forms.NL_tab_retrib_contr.elements.btn_voci_add.enabled = arrBtnsStatus[10];
	forms.NL_tab_retrib_contr.elements.btn_voci_edit.enabled = arrBtnsStatus[11];
	forms.NL_tab_retrib_contr.elements.btn_voci_remove.enabled = arrBtnsStatus[12];
	forms.NL_tab_retrib_contr.elements.btn_lkp_contributiaggiuntivi.enabled = arrBtnsStatus[13];
	forms.NL_tab_retrib_contr.elements.btn_ctr_remove.enabled = arrBtnsStatus[14];
	forms.NL_tab_straordinari.elements.btn_nuova_magg.enabled = arrBtnsStatus[15];
	forms.NL_tab_straordinari.elements.btn_modifica_magg.enabled = arrBtnsStatus[16];
	forms.NL_tab_straordinari.elements.btn_cancella_magg.enabled = arrBtnsStatus[17];
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"53FF50E0-1273-4703-8B1E-48E5CD2E6AB0"}
 */
function onActionOttieniReportNL(event) 
{
	var params = {
		processFunction: process_ottieni_report_nl,
		message: '',
		opacity: 0.2,
		paneColor: '#434343',
		textColor: '#EC1C24',
		showCancelButton: false,
		cancelButtonText: '',
		dialogName: 'This is the dialog',
		fontType: 'Arial,4,25',
		processArgs: [event]
	};
	plugins.busy.block(params);
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"CFE1A8B7-471C-4904-8397-F1B80AE5D311"}
 */
function process_ottieni_report_nl(event)
{
	try
	{
		plugins.busy.unblock();
		globals.sospendiElaborazione(event);
		scopes.nl_reports.exportNettoLordo();
		
	}
	catch(ex)
	{
		var msg = 'Metodo process_ottieni_report_nl : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}