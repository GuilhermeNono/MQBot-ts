"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataModel = void 0;
const typegoose_1 = require("@typegoose/typegoose");
//@ts-ignore
class UserData {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserData.prototype, "userId", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], UserData.prototype, "isMuted", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Boolean)
], UserData.prototype, "isBan", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "exp", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "countMute", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "countBan", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "avbMutes", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [Number] }),
    __metadata("design:type", Array)
], UserData.prototype, "insigniaID", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], UserData.prototype, "balance", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "primaryInsignia", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Number)
], UserData.prototype, "secondaryInsignia", void 0);
const UserDataModel = (0, typegoose_1.getModelForClass)(UserData);
exports.UserDataModel = UserDataModel;
