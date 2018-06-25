/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"5C2D98F9-9A6E-415C-861F-6131E77F89ED",variableType:-4}
 */
var vArrAltreVociSelezionate = [];

/**
 * @type {Array}
 *
 * @properties={typeid:35,uuid:"2C8D6CFD-BC6E-4165-AD70-27E79514CFB7",variableType:-4}
 */
var vArrContributiSelezionati = [];

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"847FF961-4BE5-4727-8562-032801C463EE",variableType:4}
 */
var vDetrazioniPreviste = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DB6CB193-326A-45F0-8F8A-3FA8B66A13E5",variableType:4}
 */
var vDetrazioniUlteriori = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"AA3C76D2-1105-4F39-BC50-399EEB69D946",variableType:4}
 */
var vImponibile = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"57B7AFDF-92EB-4D7C-ABE4-41F7E8D1714C",variableType:4}
 */
var vImponibileDitta = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"20F650BD-585A-4781-8724-E05D2AE3F16F",variableType:4}
 */
var vImponibileSoggBen = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6305012B-56D2-4BF8-93CA-B75C7CDAD5CF",variableType:4}
 */
var vImponibileTfr = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"9303A22E-4B2D-4F6E-BA64-45C77368F318",variableType:8}
 */
var vRetCtrFt = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"99B653C6-F009-4E9D-B95A-9F75472210F6",variableType:8}
 */
var vRetCtrPc = 0;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"639A94F9-528C-4D13-8695-8FA628800EDD",variableType:8}
 */
var vRetCtrTipologiaRetribuzione = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"DA91F27D-212F-4601-934D-7A762EBA1295",variableType:8}
 */
var vRetMaggiorazione = 0;

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
 * @properties={typeid:24,uuid:"D7BBB6A8-E80F-4754-A5B4-65485BAD2330"}
 */
function onDataChangeTipologiaRetribuzione(oldValue, newValue, event) {
	
	forms.NL_tab_retrib_contr_mensile.vRetCtrRetribuzioneMensile = 
	forms.NL_tab_retrib_contr_oraria.vRetCtrRetribuzioneAnnuale = null;
	
    elements.tabpanel_tiporetrib.tabIndex = newValue;
    
    globals.verificaDatiInseriti();
    
	return true;
}

/**
 * Filtra i contributi aggiuntivi selezionabili in base alla scelta del settore di appartenenza
 * 
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"AA863851-3296-45CD-8393-8B44C4C07D22"}
 */
function filterContributiAggiuntivi(fs)
{
	fs.addFoundSetFilterParam('idsettore','=',forms.NL_tab_inquadramento.vInqIdSettoreAppartenenza);
	return fs;
}

/**
 * Aggiorna la selezione e la visualizzazione dei contributi selezionati
 * 
 * @param {Array} arrRec
 *
 * @properties={typeid:24,uuid:"724BC9E7-11FE-4DC5-B9F2-0EE6094B53AA"}
 */
function updateContributiAggiuntivi(arrRec)
{
	vArrContributiSelezionati = arrRec;
    
	var oriFrmNamePiu = forms.NL_contributiaggiuntivi_piu_tbl.controller.getName();
    var tempFrmNamePiu = oriFrmNamePiu + '_temp';
    
    var columns = ['descrizione','imponibileclav','aliquotaclav','importofissolav',
    			   'imponibilecditta','aliquotacditta','importofissoditta','suretributiletfr',
				   'scaladairpef','solidarietainps10'];
    
    var dsPiu = databaseManager.createEmptyDataSet(arrRec.length,0);
    dsPiu.addColumn(columns[0],1,JSColumn.TEXT);
    dsPiu.addColumn(columns[1],2,JSColumn.NUMBER);
    dsPiu.addColumn(columns[2],3,JSColumn.NUMBER);
    dsPiu.addColumn(columns[3],4,JSColumn.NUMBER);
    dsPiu.addColumn(columns[4],5,JSColumn.NUMBER);
    dsPiu.addColumn(columns[5],6,JSColumn.NUMBER);
    dsPiu.addColumn(columns[6],7,JSColumn.NUMBER);
    dsPiu.addColumn(columns[7],8,JSColumn.INTEGER);
    dsPiu.addColumn(columns[8],9,JSColumn.INTEGER);
    dsPiu.addColumn(columns[9],10,JSColumn.INTEGER);    
    
    for(var i=1; i<=arrRec.length; i++)
    {
    	/** @type {JSRecord<db:/ma_presenze/e2tabcontributiaggiuntivi>}*/
    	var rec = arrRec[i-1];
        var currImponibile,currImponibileDitta;
        
		if (forms.NL_tab_inquadramento.vInqTipologiaCalcolo == 1) {
			if (rec.suretributiletfr == 'S') {
				currImponibile = vImponibile + vImponibileTfr;
				currImponibileDitta = vImponibileDitta + vImponibileTfr;
			} else {
				currImponibile = vImponibile + vImponibileSoggBen;
				currImponibileDitta = vImponibileDitta + vImponibileSoggBen;
			}
		}   
		else
		{
			currImponibile = vImponibile;
			currImponibileDitta = vImponibileDitta;
		}
    	dsPiu.setValue(i,1,rec.nomefondo);
    	dsPiu.setValue(i,2,currImponibile);
    	dsPiu.setValue(i,3,rec.aliquotaclav);
    	dsPiu.setValue(i,4,rec.importofissolav);
    	dsPiu.setValue(i,5,currImponibileDitta);
    	dsPiu.setValue(i,6,rec.aliquotacditta);
    	dsPiu.setValue(i,7,rec.importofissoditta);
    	dsPiu.setValue(i,8,rec.suretributiletfr == 'S' ? 1 : 0);
    	dsPiu.setValue(i,9,rec.scaladaimpirpef == 'S' ? 1 : 0);
    	dsPiu.setValue(i,10,rec.solidarietainps10 == 'S' ? 1 : 0);

    }
    
    var dSPiu = dsPiu.createDataSource('dSPiu');
    
    if(elements.tab_contributiaggiuntivi)
    	elements.tab_contributiaggiuntivi.removeAllTabs();
    
    if(forms[tempFrmNamePiu] != null)
    {
    	history.removeForm(tempFrmNamePiu);
    	solutionModel.removeForm(tempFrmNamePiu);
    }
    
    solutionModel.cloneForm(tempFrmNamePiu,solutionModel.getForm(oriFrmNamePiu));
    solutionModel.getForm(tempFrmNamePiu).dataSource = dSPiu;
	solutionModel.getForm(tempFrmNamePiu).getField('fld_fondo_piu').dataProviderID = 'descrizione';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_imp_c_lav_piu').dataProviderID = 'imponibileclav';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_imp_c_ditta_piu').dataProviderID = 'imponibilecditta';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_aliquota_ditta_piu').dataProviderID = 'aliquotacditta';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_aliquota_dip_piu').dataProviderID = 'aliquotaclav';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_su_tfr_piu').dataProviderID = 'suretributiletfr';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_scala_da_irpef_piu').dataProviderID = 'scaladairpef';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_fisso_ditta_piu').dataProviderID = 'importofissoditta';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_fisso_dip_piu').dataProviderID = 'importofissolav';
	solutionModel.getForm(tempFrmNamePiu).getField('fld_solidarieta_inps_10_piu').dataProviderID = 'solidarietainps10';

    elements.tab_contributiaggiuntivi.addTab(tempFrmNamePiu,null,'Contributi',null,null,null,null,null,1);

    globals.verificaDatiInseriti();
    globals.calcolaSoggBen();
	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E7854061-89EF-451A-ADD2-3EA741B95015"}
 */
function aggiungiVoce(event) {
	
	var frm = forms.NL_voci_aggiuntive_dtl;
	frm.vIsInEdit = false;
	frm.inizializzaVariabiliVoce(null,null,null,null,0,false,false,false,false);
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Aggiungi una voce contributiva');
	
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AB284DEA-08EF-4F2E-8D80-6DAEBEC0EFAF"}
 */
function modificaVoce(event) {
 
	var frmTbl = forms['NL_voci_aggiuntive_tbl_temp'];
	if(frmTbl.foundset.getSize() > 0)
	{
	   var frmDtl = forms.NL_voci_aggiuntive_dtl;
	   frmDtl.vIsInEdit = true;
	   frmDtl.inizializzaVariabiliVoce(frmTbl.foundset['descrizione']
	                             ,frmTbl.foundset['mesi']
	                             ,frmTbl.foundset['qta']
	                             ,frmTbl.foundset['importolordo']
	                             ,frmTbl.foundset['totale']
	                             ,frmTbl.foundset['sutfr']
	                             ,frmTbl.foundset['soggetto']
	                             ,frmTbl.foundset['benefit']
	                             ,frmTbl.foundset['detassata']);
	   globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Modifica una voce contributiva');
	}
	else
    	forms.NL_main.setStatusWarning('Non esistono voci da modificare',null,500);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"DBD658F4-444D-4B65-8516-218BB197B230"}
 */
function eliminaVoce(event) {
	
	var frm = forms['NL_voci_aggiuntive_tbl_temp'];
	if (frm && frm.foundset && frm.foundset.getSize() > 0) 
	{
		var success = frm.foundset.deleteRecord();
		if (!success)
			forms.NL_main.setStatusWarning('Voce non eliminata, riprovare',null,500);
		else
		{
			globals.calcolaSoggBen();
			globals.calcolaImponibile();
			globals.aggiornaImponibileTabella();
			globals.verificaDatiInseriti();
		}
		
	} else
		forms.NL_main.setStatusWarning('Non esistono voci da eliminare',null,500);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A38D2866-2B98-4389-8DF0-5217DD622B4C"}
 * @SuppressWarnings(unused)
 */
function onShow(firstShow, event) {
	
	if (firstShow) {
		var frm = forms.NL_voci_aggiuntive_tbl;
		var frmName = frm.controller.getName() + '_temp';

		elements.tab_altrevociretribuzione.removeAllTabs();

		if (solutionModel.getForm(frmName) != null) {
			history.removeForm(frmName);
			solutionModel.removeForm(frmName);
		}

		var frmTemp = solutionModel.cloneForm(frmName, solutionModel.getForm(frm.controller.getName()));

		var dsVoci = databaseManager.createEmptyDataSet(0, 0);
		dsVoci.addColumn('descrizione', 1, JSColumn.TEXT);
		dsVoci.addColumn('mesi', 2, JSColumn.NUMBER);
		dsVoci.addColumn('qta', 3, JSColumn.NUMBER);
		dsVoci.addColumn('importolordo', 4, JSColumn.NUMBER);
		dsVoci.addColumn('totale', 5, JSColumn.NUMBER);
		dsVoci.addColumn('sutfr', 6, JSColumn.INTEGER);
		dsVoci.addColumn('soggetto', 7, JSColumn.INTEGER);
		dsVoci.addColumn('benefit', 8, JSColumn.INTEGER);
		dsVoci.addColumn('detassata', 9, JSColumn.INTEGER);

		var dSVoci = dsVoci.createDataSource('dSVoci');

		solutionModel.getForm(frmName).dataSource = dSVoci;
		solutionModel.getForm(frmName).getField('fld_descrizione').dataProviderID = dsVoci.getColumnName(1);
		solutionModel.getForm(frmName).getField('fld_mesi').dataProviderID = dsVoci.getColumnName(2);
		solutionModel.getForm(frmName).getField('fld_quantita').dataProviderID = dsVoci.getColumnName(3);
		solutionModel.getForm(frmName).getField('fld_importo_lordo').dataProviderID = dsVoci.getColumnName(4);
		solutionModel.getForm(frmName).getField('fld_totale').dataProviderID = dsVoci.getColumnName(5);
		solutionModel.getForm(frmName).getField('fld_va_su_tfr').dataProviderID = dsVoci.getColumnName(6);
		solutionModel.getForm(frmName).getField('fld_soggetto').dataProviderID = dsVoci.getColumnName(7);
		solutionModel.getForm(frmName).getField('fld_benefit').dataProviderID = dsVoci.getColumnName(8);
		solutionModel.getForm(frmName).getField('fld_detassata').dataProviderID = dsVoci.getColumnName(9);

		elements.tab_altrevociretribuzione.addTab(frmName);
	}
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"649E363A-233B-4E98-8108-64E28675D112"}
 */
function getContributiAggiuntivi()
{
	var frmName = elements.tab_contributiaggiuntivi.getTabFormNameAt(1);
	var frm = forms[frmName];
	var arrContributiSelezionati = [];
	
	if (frm && frm.foundset) {
		for (var i = 1; i <= frm.foundset.getSize(); i++) {
			var ctrAggRiga = new Object();
			frm.foundset.alldataproviders.forEach(function(dp) {
				ctrAggRiga[dp] = frm.foundset.getRecord(i)[dp]
			})

			arrContributiSelezionati.push(ctrAggRiga);
		}
	}
	return arrContributiSelezionati;
			 
}

/**
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"E491B79C-C6EC-4E01-BAEE-FF29F85603DD"}
 */
function getVociAggiuntive()
{
	var frmName = elements.tab_altrevociretribuzione.getTabFormNameAt(1);
	var frm = forms[frmName];
	var arrVociAggiuntive = [];
	
	if (frm && frm.foundset) {
		for (var i = 1; i <= frm.foundset.getSize(); i++) {
			var vociAggRiga = new Object();
			frm.foundset.alldataproviders.forEach(function(dp) {
				vociAggRiga[dp] = frm.foundset.getRecord(i)[dp]
			})

			arrVociAggiuntive.push(vociAggRiga);
		}
	}
	
	return arrVociAggiuntive;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"AB0FB362-2156-4597-8145-430D418ABA5F"}
 */
function eliminaContributo(event) 
{
	var frmName = elements.tab_contributiaggiuntivi.getTabFormNameAt(1);
	var frm = forms[frmName];
	
	if (frm && frm.foundset && frm.foundset.getSize() > 0) {
		var success = frm.foundset.deleteRecord(frm.foundset.getSelectedIndex());

		if (!success)
			forms.NL_main.setStatusWarning('Errore durante l\'eliminazione, riprovare',null,500);
	} 
	else
	    forms.NL_main.setStatusWarning('Non esistono contributi da eliminare',null,500);
	
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
 * @properties={typeid:24,uuid:"0315CE84-DCF1-410C-9320-A8A9203CB3AF"}
 */
function onDataChangeChks(oldValue, newValue, event) {

	globals.calcolaImponibile();
	globals.aggiornaImponibileTabella();
	globals.verificaDatiInseriti();
    
	return true;
}

/**
 * @properties={typeid:24,uuid:"138156DF-E9BE-4206-AAAB-C9708485DF59"}
 */
function resetValues()
{
	vRetCtrTipologiaRetribuzione = 1;

	 vArrContributiSelezionati = [];

	 vArrAltreVociSelezionate = [];
	 vDetrazioniPreviste = 1;

	 vDetrazioniUlteriori = 0;

	 vRetMaggiorazione = 0;
	 vRetCtrFt = 0;
	 vRetCtrPc = 0;

	 vImponibile = 0;

	 vImponibileTfr = 0;

	 vImponibileDitta = 0;

	 vImponibileSoggBen = 0;
	 
	 forms.NL_tab_retrib_contr_mensile.vRetCtrRetribuzioneMensile = null;
	 forms.NL_tab_retrib_contr_oraria.vRetCtrRetribuzioneAnnuale = null;
	 
	 var frmVa = forms['NL_voci_aggiuntive_tbl_temp'];
	 var frmVaSize = frmVa.foundset.getSize();
	 if (frmVa && frmVa.foundset && frmVaSize > 0) 
	 {
		 for(var i=1; i<=frmVaSize; i++)
		 {
			 frmVa.foundset.deleteRecord(); 
		 }
	 }
		
	 var frmCa = forms[elements.tab_contributiaggiuntivi.getTabFormNameAt(1)];
	 var frmCaSize = frmCa.foundset.getSize();
	 if (frmCa && frmCa.foundset && frmCaSize > 0)
	 {
		 for(var j=1; j<=frmCaSize;j++)
		 {
			 frmCa.foundset.deleteRecord(); 
		 }
	 }
	 globals.verificaDatiInseriti();
}

/**
 * TODO generated, please specify type and doc for the params
 * @param oldValue
 * @param newValue
 * @param event
 *
 * @properties={typeid:24,uuid:"0E7E8844-AF1E-4385-949F-35E5AFF81673"}
 */
function onDataChangeContrAggField(oldValue,newValue,event)
{
	var resp = newValue ? true : false;
	return resp;
}