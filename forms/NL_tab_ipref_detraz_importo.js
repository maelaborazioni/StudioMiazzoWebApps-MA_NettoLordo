/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"D14B65C5-8570-4165-8A4C-29C24568D9D6",variableType:8}
 */
var vIrpefImportoAddizComunale = 0;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"82D19CFA-0137-4DC4-B062-8F0F20C0F6DF",variableType:8}
 */
var vIrpefImportoAddizRegionale = 0;

/**
 * @properties={typeid:24,uuid:"BBCFC473-ED36-4144-81C4-20145AAE5890"}
 */
function resetValue()
{
	vIrpefImportoAddizRegionale = 0;
	vIrpefImportoAddizComunale = 0;
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
 * @properties={typeid:24,uuid:"08B1ED25-0E6E-4B81-84F6-B0C7DECC18CC"}
 */
function onDataChangeAddizionaliReg(oldValue, newValue, event)
{
	globals.verificaDatiInseriti();
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
 * @properties={typeid:24,uuid:"CEDABA99-1572-4A2D-8299-9E0C6DE0B972"}
 */
function onDataChangeAddizionaliCom(oldValue, newValue, event)
{
	globals.verificaDatiInseriti();
	globals.calcolaImponibile();
    globals.aggiornaImponibileTabella();
	return true;
}
