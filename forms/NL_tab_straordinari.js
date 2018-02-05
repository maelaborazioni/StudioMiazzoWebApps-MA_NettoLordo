/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"51DAA7CB-0853-4B76-A5A2-95DC750F9CD3"}
 */
function aggiungiVoce(event) {
	
	var frm = forms.NL_maggiorazione_dtl;
	frm.vIsInEdit = false;
	frm.inizializzaVariabiliVoceCosto('',null,0);
	globals.ma_utl_showFormInDialog(frm.controller.getName(),'Aggiungi una maggiorazione per lo straordinario');
	
}

/**
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"FAAD64FE-D912-4E82-96B3-170E4AF9AB62"}
 */
function modificaVoce(event)
{
	var frmTbl = forms['NL_maggiorazione_tbl_temp'];
	if(frmTbl.foundset.getSize() > 0)
	{
		var frmDtl = forms.NL_maggiorazione_dtl;
		frmDtl.vIsInEdit = true;
		frmDtl.inizializzaVariabiliVoceCosto(frmTbl.foundset['descrizione']
		                                    ,frmTbl.foundset['percentuale']
		                                    ,frmTbl.foundset['sutfr']);
		globals.ma_utl_showFormInDialog(frmDtl.controller.getName(),'Modifica una maggiorazione per lo straordinario');
	}
	else
		forms.NL_main.setStatusWarning('Non esistono voci di costo orario da modificare',null,500);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2D30B9D1-3268-400E-A988-38A2F5496F17"}
 */
function eliminaVoce(event)
{
	var frm = forms['NL_maggiorazione_tbl_temp'];
	if (frm && frm.foundset && frm.foundset.getSize() > 0) 
	{
		var success = frm.foundset.deleteRecord();
		if (!success)
			forms.NL_main.setStatusWarning('Maggiorazione straordinario non eliminata, riprovare',null,500);
		else
			globals.verificaDatiInseriti();
				
	}
	else
		forms.NL_main.setStatusWarning('Non esistono maggiorazioni straordinario da eliminare',null,500);
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D0333791-6732-422F-A995-6E7DAFD9FA6C"}
 * @SuppressWarnings(unused)
 */
function onShow(firstShow, event) {
	
	if(firstShow)
	{
		// prepara la gestione delle maggiorazioni per lo straordinario
		var frm = forms.NL_maggiorazione_tbl;
		var frmName = frm.controller.getName() + '_temp';
		
		elements.tab_maggiorazioni.removeAllTabs();
		
		if(solutionModel.getForm(frmName) != null)
		{
			history.removeForm(frmName);
			solutionModel.removeForm(frmName);
		}
		
		var frmTemp = solutionModel.cloneForm(frmName,solutionModel.getForm(frm.controller.getName()));
		
		var dsMaggiorazioni = databaseManager.createEmptyDataSet(0,0);
		dsMaggiorazioni.addColumn('descrizione',1,JSColumn.TEXT);
		dsMaggiorazioni.addColumn('percentuale',2,JSColumn.NUMBER);
		dsMaggiorazioni.addColumn('sutfr',3,JSColumn.INTEGER);
		
		var dSMaggiorazioni = dsMaggiorazioni.createDataSource('dSMaggiorazioni');
		
		solutionModel.getForm(frmName).dataSource = dSMaggiorazioni;
		solutionModel.getForm(frmName).getField('fld_descrizione').dataProviderID = dsMaggiorazioni.getColumnName(1);
		solutionModel.getForm(frmName).getField('fld_maggiorazione').dataProviderID = dsMaggiorazioni.getColumnName(2);
		solutionModel.getForm(frmName).getField('fld_sutfr').dataProviderID = dsMaggiorazioni.getColumnName(3);
	    
		elements.tab_maggiorazioni.addTab(frmName);
	}
	
	globals.ma_utl_setStatus(globals.Status.EDIT,controller.getName());
}

/**
 * @return {Array}
 * 
 * @properties={typeid:24,uuid:"6FDC7353-D00B-4CF9-ADF7-C741FE857208"}
 */
function getMaggiorazioni()
{
	var frmName = elements.tab_maggiorazioni.getTabFormNameAt(1);
	var frm = forms[frmName];
	var arrMaggiroazioni = [];
	
	if (frm && frm.foundset) {
		for (var i = 1; i <= frm.foundset.getSize(); i++) {
			var vociMagRiga = new Object();
			frm.foundset.alldataproviders.forEach(function(dp) {
				vociMagRiga[dp] = frm.foundset.getRecord(i)[dp]
			})

			arrMaggiroazioni.push(vociMagRiga);
		}
	}
	
	return arrMaggiroazioni;
}

/**
 * @properties={typeid:24,uuid:"8C035DC1-8625-427A-884E-1106FAB6A9FD"}
 */
function resetValues()
{
	var frm = forms['NL_maggiorazione_tbl_temp'];
	if (frm && frm.foundset && frm.foundset.getSize() > 0) 
	{
		var frmSize = frm.foundset.getSize();
		for(var i=1; i<=frmSize; i++)
		{
			frm.foundset.deleteRecord();
		}
	}
		 
	globals.verificaDatiInseriti();
}
