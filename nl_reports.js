/**
 * Crea il file .pdf a partire dal foundset e lo gestisce come operazione lunga 
 *
 * @properties={typeid:24,uuid:"D58264E8-D9AC-4193-B0C9-49A610B46D1C"}
 */
function exportNettoLordo()
{
	try
	{	
		var params = globals.inizializzaParametriNettoLordo();
		var url = globals.WS_NL + "/NL/Calculate";
		/** @type {{StatusCode : Number,
				    Message : String,
				    ReturnValue : Object,
				    ReportArray : Array<Object>}} */
		var response = globals.getWebServiceResponse(url,params);
		
		if(response && response.StatusCode == globals.HTTPStatusCode.OK)
		{
			if(response.ReportArray && response.ReportArray.length)					
			{
				var op_values = {op_progress : 25,
								 op_periodo : globals.TODAY.getFullYear() * 100 + globals.TODAY.getMonth() + 1,
								 op_message : 'Recupero dei dati in corso...' };
				
				var operation = scopes.operation.getNewOperation(globals.OpType.SNL,op_values);
				if(!operation)
				throw new Error('createReport: Cannot create operation');		
					
				var frm = forms.mao_history_main_lite;
				globals.ma_utl_showFormInDialog(frm.controller.getName(), 'Avanzamento stato operazione');		
				
				/** @type{Array} */
				var array = response.ReportArray;
				var types = [JSColumn.INTEGER, JSColumn.TEXT, JSColumn.TEXT, JSColumn.INTEGER];
				var names = ['fieldbold','fieldname','fieldvalue','section'];
				var ds  = databaseManager.createEmptyDataSet(0, names);
				if(ds)
				{
					array.forEach(function(row){ ds.addRow([row.fieldbold ? 1 : 0, row.fieldname, row.fieldvalue, row.section]); });
					var fs = databaseManager.getFoundSet(ds.createDataSource('ds_report_nl', types));
					fs.loadAllRecords();
					fs.sort('section asc'); 
				
					var reportParams = new Object();
					    reportParams.tipocalcolo = forms.NL_tab_inquadramento.vInqTipologiaCalcolo == 1 ? 
					    		"Da lordo a netto" : "Da netto a lordo";
					    reportParams.nominativo = forms.NL_tab_inquadramento.vInqNominativo ? forms.NL_tab_inquadramento.vInqNominativo : '';
					    reportParams.intestazione = forms.NL_tab_inquadramento.vInqQualifica +
						                            ' - Situazione lavorativa : ' + forms.NL_tab_inquadramento.getDescrizioneSituazioneLavorativa();
						reportParams.settore = ' Settore : ' + forms.NL_tab_inquadramento.vInqDimAziendale;
					    reportParams.ccnl = 'CCNL applicato : ' + forms.NL_tab_inquadramento.vInqCCNL;
						reportParams.descragg = forms.NL_tab_inquadramento.vInqDescrAgg ? forms.NL_tab_inquadramento.vInqDescrAgg : ''; 
					    				
				}
				
				var reportName = 'MA_NettoLordo.jasper';
				var fileName = 'NettoLordo.pdf';
				globals.createReportWithFoundset(fs,reportParams,reportName,fileName,operation);									  
			}
		}
		else				
			globals.ma_utl_showErrorDialog('Il server non risponde, si prega di riprovare','Errore di comunicazione');
		
	}
	catch(ex)
	{
		application.output(ex.message);
		globals.ma_utl_showErrorDialog('Errore durante la creazione del file');
	}
	finally
	{
		plugins.busy.unblock();
	}
}