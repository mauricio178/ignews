"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var stripe_1 = require("../../services/stripe");
var faunadb_1 = require("faunadb");
var client_1 = require("next-auth/client");
var fauna_1 = require("../../services/fauna");
exports["default"] = (function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var session, user, StripeCustomer, stripeCheckoutSession;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(req.method === 'POST')) return [3 /*break*/, 6];
                return [4 /*yield*/, client_1.getSession({ req: req })];
            case 1:
                session = _a.sent();
                return [4 /*yield*/, fauna_1.fauna.query(faunadb_1.query.Get(faunadb_1.query.Match(faunadb_1.query.Index('user_by_email'), faunadb_1.query.Casefold(session.user.email))))];
            case 2:
                user = _a.sent();
                return [4 /*yield*/, stripe_1.stripe.customers.create({
                        email: session.user.email
                    })];
            case 3:
                StripeCustomer = _a.sent();
                return [4 /*yield*/, fauna_1.fauna.query(faunadb_1.query.Update(faunadb_1.query.Ref(faunadb_1.query.Collection('users'), user.ref.id), { data: { stripe_customer_id: StripeCustomer.id } }))];
            case 4:
                _a.sent();
                return [4 /*yield*/, stripe_1.stripe.checkout.sessions.create({
                        customer: StripeCustomer.id,
                        payment_method_types: ['card'],
                        billing_address_collection: 'required',
                        line_items: [
                            {
                                price: 'price_1JN0EADM77hknLOCadDNPV01',
                                quantity: 1
                            }
                        ],
                        mode: 'subscription',
                        allow_promotion_codes: true,
                        success_url: process.env.STRIPE_SUCESS_URL,
                        cancel_url: process.env.STRIPE_CANCEL_URL
                    })];
            case 5:
                stripeCheckoutSession = _a.sent();
                return [2 /*return*/, res.status(200).json({ sessionId: stripeCheckoutSession.id })];
            case 6:
                res.setHeader('Allow', 'POST');
                res.status(405).end('Method not allowed');
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); });
