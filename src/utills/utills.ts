import { configService } from "../services/_shared/config.service";
import { ConfigSettings } from "../types/constants";

const uuidv4 = require('uuid/v4');

export const utills = {
    uuid,
    currencyFormat
}

function uuid() {
    return uuidv4();
}

function currencyFormat(num, decimals = 0) {
    let cuuSym = configService.getValue(ConfigSettings.currencySymbol)
    return cuuSym + num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

