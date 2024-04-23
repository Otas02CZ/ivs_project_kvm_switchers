/**
 * @file history_item.js
 * @description This file contains class HistoryItem which is used to store history records.
 * constants HISTORY_ITEM_CALCULATION and HISTORY_ITEM_MESSAGE are here as well and
 * are used to distinguish between different types of history items.
 * @summary contains HistoryItem class and constants for history items
 * @module history_item
 * @author Otakar Kočí
 * @author Team KVM Switchers FIT BUT
 * @license GNU GPL v3
 */
//FILE:             history_item.js
//AUTHORS:          Otakar Kočí <xkocio00@stud.fit.vutbr.cz>
//                  <>
//TEAM              KVM Switchers FIT BUT
//CREATED:          14/04/2024
//LAST MODIFIED:    14/04/2024
//DESCRIPTION:      contains HistoryItem class and constants for history items

/**
 * @constant
 * @type {string}
 * @default "calculation"
 * @name HISTORY_ITEM_CALCULATION
 * @public
 * @description history item type for calculation 
 */
const HISTORY_ITEM_CALCULATION = "calculation";
/**
 * @constant
 * @type {string}
 * @default "message"
 * @name HISTORY_ITEM_MESSAGE
 * @public
 * @description history item type for message
 */
const HISTORY_ITEM_MESSAGE = "message";

/**
 * Class representing history item
 * @classdesc Class representing a history item. Each history item has a type, equation, result and message.
 * if type is HISTORY_ITEM_CALCULATION, equation and result are used, if type is HISTORY_ITEM_MESSAGE, msg is used.
 * built in function getHistoryItemHTML() returns HTML representation of history item based on its type.
 */
class HistoryItem {
    /**
     * Creates an instance of HistoryItem.
     * @param {string} type - type of history item
     * @param {string} equation - equation of history item
     * @param {string} result - result of history item
     * @param {string} msg - message of history item
     * @example
     * let historyItem = new HistoryItem(HISTORY_ITEM_CALCULATION, "2+2", "4", "");
     * @example
     * let historyItem = new HistoryItem(HISTORY_ITEM_MESSAGE, "", "", "ZERO DIVISION");
     * @see HISTORY_ITEM_CALCULATION
     * @see HISTORY_ITEM_MESSAGE
     */
    constructor(type, equation, result, msg) {
        this.type = type;
        this.equation = equation;
        this.result = result;
        this.msg = msg;
    }

    /**
     * Get history item
     * @description Returns string representation of history item's equation and result
     * in format "equation = result"
     * @returns {string} history item as a string in format "equation = result"
     * @example
     * let historyItem = new HistoryItem(HISTORY_ITEM_CALCULATION, "2+2", "4", "");
     * historyItem.getHistoryItem();
     * -> "2+2 = 4"
     */
    getHistoryItem() {
        return `${this.equation} = ${this.result}`;
    }

    /**
     * Get history item HTML
     * @param {number} id - id of history item that will be used as identificator for calling copyHistoryItem() function
     * @returns {string} HTML representation of history item based on its type
     * @example
     * let historyItem = new HistoryItem(HISTORY_ITEM_CALCULATION, "2+2", "4", "");
     * historyItem.getHistoryItemHTML(0);
     * -> "<input type="text" value="2+2 = 4" readonly onclick="copyHistoryItem(0)">"
     * @example
     * let historyItem = new HistoryItem(HISTORY_ITEM_MESSAGE, "", "", "ZERO DIVISION");
     * historyItem.getHistoryItemHTML(1);
     * -> "<input type="text" value="ZERO DIVISION" readonly>"
     * @see HISTORY_ITEM_CALCULATION
     * @see HISTORY_ITEM_MESSAGE
     * @see getHistoryItem
     */
    getHistoryItemHTML(id) {
        switch (this.type) {
            case HISTORY_ITEM_CALCULATION:
                return `<input type="text" class="resultAnimPlay" value="${this.getHistoryItem()}" readonly onclick="copyHistoryItem(${id})">`;
            case HISTORY_ITEM_MESSAGE:
                return `<input type="text" class="resultAnimPlay" value="${this.msg}" readonly>`;
        }
        return 
    }
}
