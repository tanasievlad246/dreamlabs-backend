"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
var Currency;
(function (Currency) {
    Currency["EUR"] = "EUR";
    Currency["USD"] = "USD";
    Currency["CAD"] = "CAD";
    Currency["ZAF"] = "ZAF";
    Currency["GBP"] = "GBP";
    Currency["SEK"] = "SEK";
})(Currency || (Currency = {}));
(0, graphql_1.registerEnumType)(Currency, {
    name: 'Currency',
});
exports.default = Currency;
//# sourceMappingURL=currency.enum.js.map