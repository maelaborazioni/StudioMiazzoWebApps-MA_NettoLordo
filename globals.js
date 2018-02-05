/**
 * @properties={typeid:35,uuid:"767FABD0-A738-4CE3-977C-7AB01A752CDD",variableType:-4}
 */
var SettoriAppartenenza = {COLLABORATORI : 9};

/**
 * Sospende l'inserimento in corso, è possibile riprenderlo in seguito
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"BCAC10CC-CCC4-475D-8F59-B9A42669DCB5"}
 */
function sospendiElaborazione(event) 
{
   var frm = forms.NL_main;
   var frmInq = forms.NL_tab_inquadramento;
   var frmRetrib = forms.NL_tab_retrib_contr;
   var frmDetraz = forms.NL_tab_ipref_detraz;
   var frmStrao = forms.NL_tab_straordinari;
   
   globals.ma_utl_setStatus(globals.Status.BROWSE,frmInq.controller.getName());
   globals.ma_utl_setStatus(globals.Status.BROWSE,frmRetrib.controller.getName());
   globals.ma_utl_setStatus(globals.Status.BROWSE,frmDetraz.controller.getName());
   globals.ma_utl_setStatus(globals.Status.BROWSE,frmStrao.controller.getName());
   
   frm.saveButtonsStatus(frm.elements.btn_openRtf.enabled,
	                    frm.elements.btn_prev.enabled,
						frm.elements.btn_next.enabled,
	                    frm.elements.btn_refresh_all.enabled,
						frm.elements.btn_refresh.enabled,
	                    frm.elements.btn_riprendi_elab.enabled,
						frm.elements.btn_sospendi_elab.enabled,
						frmInq.elements.btn_nuova_voce.enabled,
						frmInq.elements.btn_modifica_voce.enabled,
						frmInq.elements.btn_cancella_voce.enabled,
						frmRetrib.elements.btn_voci_add.enabled,
						frmRetrib.elements.btn_voci_edit.enabled,
						frmRetrib.elements.btn_voci_remove.enabled,
						frmRetrib.elements.btn_lkp_contributiaggiuntivi.enabled,
						frmRetrib.elements.btn_ctr_remove.enabled,
						frmStrao.elements.btn_nuova_magg.enabled,
						frmStrao.elements.btn_modifica_magg.enabled,
						frmStrao.elements.btn_cancella_magg.enabled)
   
   frm.elements.btn_riprendi_elab.enabled = true;
   frm.elements.btn_sospendi_elab.enabled = false;
   frm.elements.btn_refresh_all.enabled = false;
   frm.elements.btn_refresh.enabled = false;
   frm.elements.btn_next.enabled = false;
   frm.elements.btn_prev.enabled = false;
   frm.elements.btn_openRtf.enabled = false;
   frmInq.elements.btn_nuova_voce.enabled = false;
   frmInq.elements.btn_modifica_voce.enabled = false;
	frmInq.elements.btn_cancella_voce.enabled = false;
	frmRetrib.elements.btn_voci_add.enabled = false;
	frmRetrib.elements.btn_voci_edit.enabled = false;
	frmRetrib.elements.btn_voci_remove.enabled = false;
	frmRetrib.elements.btn_lkp_contributiaggiuntivi.enabled = false;
	frmRetrib.elements.btn_ctr_remove.enabled = false;
	frmStrao.elements.btn_nuova_magg.enabled = false;
	frmStrao.elements.btn_modifica_magg.enabled = false;
	frmStrao.elements.btn_cancella_magg.enabled = false;
}

/**
 * Riprende un inserimento precedente
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"132FC2A5-117D-40CB-9974-C6D840F4F843"}
 */
function riprendiElaborazione(event) 
{
   var frm = forms.NL_main;
   var frmInq = forms.NL_tab_inquadramento;
   var frmRetrib = forms.NL_tab_retrib_contr;
   var frmDetraz = forms.NL_tab_ipref_detraz;
   var frmStrao = forms.NL_tab_straordinari;
   
   frm.setButtonsStatus();
   frm.elements.btn_riprendi_elab.enabled = false;
   
   globals.ma_utl_setStatus(globals.Status.EDIT,frmInq.controller.getName());
   globals.ma_utl_setStatus(globals.Status.EDIT,frmRetrib.controller.getName());
   globals.ma_utl_setStatus(globals.Status.EDIT,frmDetraz.controller.getName());
   globals.ma_utl_setStatus(globals.Status.EDIT,frmStrao.controller.getName());
   
   verificaDatiInseriti();
}

/**
 * Verifica se siano stati inseriti o meno parametri sufficienti per procedere al calcolo
 * 
 * @properties={typeid:24,uuid:"45EF9C9D-9A82-46E2-A39A-0972851F613B"}
 */
function verificaDatiInseriti()
{
	// dopo ogni singolo inserimento va verificato se i dati sono sufficienti per il calcolo
	// in caso affermativo viene abilitato il pulsante 
    var frmBase = forms.NL_main;	
    var okDatiInquadramento = frmBase.verificaDatiInquadramento();
    var okDatiRetirbCtr = frmBase.verificaDatiRetribCtr();
    var okDatiIrpef = frmBase.verificaDatiIrpef();

    if(okDatiInquadramento == 0 
    	&& okDatiRetirbCtr == 0
		&& okDatiIrpef == 0)
    {
    	frmBase.setStatusNeutral();
    	frmBase.elements.btn_openRtf.enabled = true;
    }
    else
        frmBase.elements.btn_openRtf.enabled = false;
}

/**
 * Inizializza i parametri per il calcolo del netto lordo
 * 
 * @properties={typeid:24,uuid:"5D93FA12-E0CE-4BEE-83D7-FDC17FC3CCCC"}
 */
function inizializzaParametriNettoLordo()
{
	//recupera i dati inseriti mappandoli con quelli disponibili sul WS
    var params = new Object();
	var frmInq = forms.NL_tab_inquadramento;
    var frmRet = forms.NL_tab_retrib_contr;
    var frmRetMensile = forms.NL_tab_retrib_contr_mensile;
    var frmRetAnnuale = forms.NL_tab_retrib_contr_oraria;
    var frmIrpef = forms.NL_tab_ipref_detraz;
    var frmIrpefDaComune = forms.NL_tab_ipref_detraz_comune;
    var frmIrpefFisso = forms.NL_tab_ipref_detraz_importo;
    var frmStrao = forms.NL_tab_straordinari;
    
    //parametri fissi    
    var httpServer = application.getServerURL();
    switch(httpServer)
	{
	    case 'http://webapp.studiomiazzo.it:8080':
		case 'https://webapp.studiomiazzo.it' :
			params.nomeserver = 'srv-epiweb';
		   break;
		case 'http://srv-servoy-dev:8080' :
		case 'http://213.92.43.92:8080' :
		case 'http://srv-servoy-dev:8081' :
		case 'http://213.92.43.92:8081' :
			params.nomeserver = 'srv-epiweb-dev';
//			params.nomeserver = '213.92.43.91';
		default :
			params.nomeserver = 'srv-epiweb-d';
			break;

	}
    
	params.nomecatalogo = globals.Server.MA_PRESENZE;
    params.tipoconnessione = globals.Connessione.SEDE;
    params.databasecliente = 'Cliente_000000';
    params.idditta = 1;
    params.iddipendenti = [];
    params.periodo = 201307;
    params.gruppolavoratori = '';
    params.idgruppoinstallazione = -1;
    
    //parametri tab inquadramento
    params.nominativo = frmInq.vInqNominativo ? frmInq.vInqNominativo : "" ;
    params.annofiscale = frmInq.vInqAnnoFiscale;
    params.descraggiuntiva = frmInq.vInqDescrAgg;
    params.tipologiacalcolo = frmInq.vInqTipologiaCalcolo;
	params.ferierol = frmInq.vInqTipoCalcoloFerie;
	params.idsettore = frmInq.vInqIdSettoreAppartenenza == null ? 0 : frmInq.vInqIdSettoreAppartenenza;
	params.aliquotainail = frmInq.vInqAliquotaINAIL == null ? 0 : frmInq.vInqAliquotaINAIL;
	params.applicascontoinail = frmInq.vInqScontoINAIL;
	params.codqualifica = frmInq.vInqCodQualifica == null ? '' : frmInq.vInqCodQualifica;
	params.situazionelavorativa = frmInq.vInqSituazioneLavorativa == null ? 1 : frmInq.vInqSituazioneLavorativa;
	params.tipologiarapporto = frmInq.vInqTipologiaRapporto == null ? 1 : frmInq.vInqTipologiaRapporto;
	params.idccnl = frmInq.vInqIdCCNL == null ? -1 : frmInq.vInqIdCCNL;
	params.divisoreccnl = frmInq.vInqDivisoreCCNL == null ? 173 : frmInq.vInqDivisoreCCNL;
	params.oresettimanali = frmInq.vInqOreSettimanali == null ? 40 : frmInq.vInqOreSettimanali;
	params.mensilita = frmInq.vInqMensilita;
	params.applicasgraviojobact = frmInq.vInqSgravioJobAct;
	params.idtabcontributi = frmInq.vInqIdTabContributi == null ? 1 : frmInq.vInqIdTabContributi;
	params.orariodilavoro = frmInq.vInqOrarioDiLavoro == null ? 1 : frmInq.vInqOrarioDiLavoro;
	params.oreparttime = frmInq.vInqOrePartTime == null ? 0 : frmInq.vInqOrePartTime;
	params.oreferie = frmInq.vInqOreFerie == null ? 0 : frmInq.vInqOreFerie;
	params.orerol = frmInq.vInqOreRol == null ? 0 : frmInq.vInqOreRol;
	params.segnooreferie = frmInq.vSegnoOreFerie;
	params.segnoorerol = frmInq.vSegnoOreROL;
	params.vocicostoorario = frmInq.getVociCostoOrario();
	params.somministrato = frmInq.vInqLavoroSomministrato == 1 ? true : false;
	params.costoorario = frmInq.vInqCostoOrario == 1 ? true : false;
	
	//parametri tab retribuzione e contributi
	params.tipologiaretribuzione = frmRet.vRetCtrTipologiaRetribuzione == null ? 1 : frmRet.vRetCtrTipologiaRetribuzione;
	params.compenso = frmRet.elements.tabpanel_tiporetrib.tabIndex == 1 ? (frmRetMensile.vRetCtrRetribuzioneMensile ? frmRetMensile.vRetCtrRetribuzioneMensile : 0) 
			                                                            : (frmRetAnnuale.vRetCtrRetribuzioneAnnuale ? frmRetAnnuale.vRetCtrRetribuzioneAnnuale : 0);
	params.altrevoci = JSON.stringify(frmRet.getVociAggiuntive());
    params.altricontributi = JSON.stringify(frmRet.getContributiAggiuntivi());
    params.maggiorazionectr = frmRet.vRetMaggiorazione == 1 ? true : false; 
	params.recuperoctrft = frmRet.vRetCtrFt == 1 ? true : false; 
	params.recuperoctrpc = frmRet.vRetCtrPc == 1 ? true : false;
	
    //parametri tab irpef e detrazioni
    params.tipologiacalcoloaddizionali = frmIrpef.vIrpefCriterioCalcoloAdd;
    params.codcomune = frmIrpefDaComune.vIrpefCodComuneResidenza == null ? '' : frmIrpefDaComune.vIrpefCodComuneResidenza;
    params.tipologiacalcoloaddizionali == 1 ? params.nessuncriteriocalcoloaddizionale = 1
    		                                  : params.nessuncriteriocalcoloaddizionale = 0;
    
    params.aliquotairpefdigitata = frmIrpef.vChkIrpefAliquotaDigitata && frmIrpef.vIrpefAliquotaDigitata ? frmIrpef.vIrpefAliquotaDigitata : 0;
    params.aliquotacomune = frmIrpefDaComune.vIrpefAliquotaComuneResidenza == null ? 0 : frmIrpefDaComune.vIrpefAliquotaComuneResidenza;
    params.importoaliquotacomunale = frmIrpefFisso.vIrpefImportoAddizComunale == null ? 0 : frmIrpefFisso.vIrpefImportoAddizComunale;
    params.importoaliquotaregionale = frmIrpefFisso.vIrpefImportoAddizRegionale == null ? 0 : frmIrpefFisso.vIrpefImportoAddizRegionale;
    params.produzionereddito = frmIrpef.vIrpefProduzioneReddito == 1 ? true : false;
    params.coniuge = frmIrpef.vIrpefConiuge == null ? 1 : frmIrpef.vIrpefConiuge;
    params.numerofigli = frmIrpef.vIrpefNumFigliACarico == null ? 0 : frmIrpef.vIrpefNumFigliACarico;
    params.percfigliacarico = frmIrpef.vIrpefPercFigliACarico == null ? 0 : frmIrpef.vIrpefPercFigliACarico;
    params.nummesifigli = frmIrpef.vIrpefNumeroMesiFigli == null ? 0 : frmIrpef.vIrpefNumeroMesiFigli;
    params.numerofiglifinoa3anni = frmIrpef.vIrpefNumFigliFino3Anni == null ? 0 : frmIrpef.vIrpefNumFigliFino3Anni;
    params.numerofiglifinoa3annihandicap = frmIrpef.vIrpefNumFigliFino3AnniHandicap == null ? 0 : frmIrpef.vIrpefNumFigliFino3AnniHandicap;
    params.numerofiglisup3anni = frmIrpef.vIrpefNumFigliSup3Anni == null ? 0 : frmIrpef.vIrpefNumFigliSup3Anni;
    params.numerofiglisup3annihandicap = frmIrpef.vIrpefNumFigliSup3AnniHandicap == null ? 0 : frmIrpef.vIrpefNumFigliSup3AnniHandicap;
    params.numeroaltrifamiliari = frmIrpef.vIrpefNumAltriFamiliari == null ? 0 : frmIrpef.vIrpefNumAltriFamiliari;
    params.percaltrifamiliariacarico = frmIrpef.vIrpefPercAltriFamiliari == null ? 0 : frmIrpef.vIrpefPercAltriFamiliari;
    params.nummesialtrifam = frmIrpef.vIrpefNumeroMesiAltriFamiliari == null ? 0 : frmIrpef.vIrpefNumeroMesiAltriFamiliari;
    params.applicabonusrenzi = frmIrpef.vChkBonusRenzi == 1 ? true : false;
    //parametri tab straordinari
    params.maggiorazioni = frmStrao.getMaggiorazioni();
    
    return params;
}

/**
 * Calcola il netto lordo e produce il report 
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"B8111A47-F263-4B29-99BF-E0D9040C75C1"}
 */
function ottieniReportNettoLordo(event) 
{
	scopes.nl_reports.exportNettoLordo();
}

/**
 * @properties={typeid:24,uuid:"BDB47287-0BDA-4388-835A-23B058A2BB16"}
 */
function calcolaImponibile()
{
	var frm = forms.NL_tab_retrib_contr;
	var frmMens = forms.NL_tab_retrib_contr_mensile;
	var frmOr = forms.NL_tab_retrib_contr_oraria;
	
	//se non è presente la retribuzione resetta l'imponibile
	if(frm.vRetCtrTipologiaRetribuzione == 1 && frmMens.vRetCtrRetribuzioneMensile == null 
			|| frm.vRetCtrTipologiaRetribuzione == 2 && frmOr.vRetCtrRetribuzioneAnnuale == null)
	{
		forms.NL_tab_retrib_contr.vImponibile =
		forms.NL_tab_retrib_contr.vImponibileDitta =	
		forms.NL_tab_retrib_contr.vImponibileTfr = 0;
		return;	
	}
	//calcolo dell'imponibile
	var params = globals.inizializzaParametriNettoLordo();
	var url = globals.WS_NL_URL + "/NettoLordo/RecuperaImponibile";
	var response = globals.getWebServiceResponse(url,params);
	if(response != null)
	{
		if(response['returnValue'] == true
				&& response['imponibileditta'] != null
				&& response['imponibile'] != null
				&& response['imponibiletfr'] != null)					
		{
			forms.NL_tab_retrib_contr.vImponibile =  response['imponibile'];
			forms.NL_tab_retrib_contr.vImponibileDitta =  response['imponibileditta'];
			forms.NL_tab_retrib_contr.vImponibileTfr =  response['imponibiletfr'];
		}
		else
			globals.ma_utl_showErrorDialog('Errore nel calcolo dell\'imponibile, riprovare','Netto Lordo');
	}
	else
		globals.ma_utl_showErrorDialog('Errore nel contattare il server, riprovare','Netto Lordo');
}

/**
 * @properties={typeid:24,uuid:"62663562-742F-4F50-BB9C-D5F85F543EBE"}
 */
function aggiornaImponibileTabella()
{
	var frm = forms.NL_tab_retrib_contr;
	var frmCtr = forms[frm.elements.tab_contributiaggiuntivi.getTabFormNameAt(1)];
	if (frmCtr) {
		var fsCtr = frmCtr.foundset;
		var _imponibile = frm.vImponibile;
		var _imponibileDitta = frm.vImponibileDitta;
		var _imponibileTfr = frm.vImponibileTfr;
		var _imponibileSoggBen = frm.vImponibileSoggBen;
		
		for(var i=1; i <= fsCtr.getSize(); i++)
		{
			var _rec = fsCtr.getRecord(i);
			if (forms.NL_tab_inquadramento.vInqTipologiaCalcolo == 1) {
				if (_rec['suretributiletfr']) {
					_rec['imponibileclav'] = _imponibile + _imponibileTfr;
					_rec['imponibilecditta'] = _imponibileDitta + _imponibileTfr;
				} else {
					_rec['imponibileclav'] = _imponibile + _imponibileSoggBen;
					_rec['imponibilecditta'] = _imponibileDitta + _imponibileSoggBen;
				}
			}
			else
			{
				_rec['imponibileclav'] = _imponibile
				_rec['imponibilecditta'] = _imponibileDitta;
			}
		}

	}
}

/**
 * @properties={typeid:24,uuid:"E651D421-B215-456A-AA02-23891E163570"}
 */
function pulisciContributi()
{
	var frm = forms.NL_tab_retrib_contr;
	var frmTblName = frm.elements.tab_contributiaggiuntivi.getTabFormNameAt(1); 
	if(forms[frmTblName] && forms[frmTblName].foundset.getSize() > 0)
	{
	   frm.elements.tab_contributiaggiuntivi.removeAllTabs();
	   history.removeForm(frmTblName);
       solutionModel.removeForm(frmTblName);
      
	}
}

/**
 * @properties={typeid:24,uuid:"1BD21196-1F5D-49F2-B5AC-80C539755EF6"}
 */
function calcolaSoggBen()
{
	var frm = forms.NL_tab_retrib_contr;
	var frmVoci = forms[frm.elements.tab_altrevociretribuzione.getTabFormNameAt(1)];
	var vSoggettoBenefit = 0;
	
	if (frmVoci && frmVoci.foundset) 
	{
		for (var i = 1; i <= frmVoci.foundset.getSize(); i++) 
		{
			var recVoci = frmVoci.foundset.getRecord(i);
            if(recVoci['soggetto'] || recVoci['benefit'])
            	vSoggettoBenefit += recVoci['totale'];
		}
	}
	
	frm.vImponibileSoggBen = vSoggettoBenefit;
}
