var Obj_BlackT = (function (_super) {
    __extends(Obj_BlackT, _super);
    function Obj_BlackT(rate) {
        _super.call(this);
        this._resoucePrefix = 'game_';
        this._scaleRate = rate;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this);
    }
    var d = __define,c=Obj_BlackT;p=c.prototype;
    p.onAddToStage = function (evt) {
        this.backNoAnim = new egret.Bitmap(RES.getRes(this._resoucePrefix + "objBlackT"));
        this.addChild(this.backNoAnim);
        this.topAnim = new egret.Bitmap(RES.getRes(this._resoucePrefix + "objBlackT2"));
        this.addChild(this.topAnim);
        this.backNoAnim.scaleX = this.backNoAnim.scaleY = this.topAnim.scaleX = this.topAnim.scaleY = this._scaleRate;
        this.initState();
        this.addEventListener('doRemoveTopAnim', this.stopState, this);
        this.addEventListener('doPauseTopAnim', this.pauseState, this);
        this.addEventListener('doResumeTopAnim', this.resumeState, this);
    };
    p.onRemovedFromStage = function (evt) {
        egret.Tween.removeTweens(this.topAnim);
        this.backNoAnim.texture = null;
        this.removeChild(this.backNoAnim);
        this.backNoAnim = null;
        this.topAnim.texture = null;
        this.removeChild(this.topAnim);
        this.topAnim = null;
        this.removeEventListener('doRemoveTopAnim', this.stopState, this);
        this.removeEventListener('doPauseTopAnim', this.pauseState, this);
        this.removeEventListener('doResumeTopAnim', this.resumeState, this);
    };
    p.initState = function () {
        egret.Tween.get(this.topAnim, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
    };
    p.hideState = function () {
        egret.Tween.removeTweens(this.topAnim);
        this.backNoAnim.alpha = 0;
        egret.Tween.get(this.topAnim).to({ alpha: 0 }, 250).call(removeObj, this);
        function removeObj() {
            egret.Tween.removeTweens(this.topAnim);
            this.parent.removeChild(this);
        }
    };
    p.pauseState = function (evt) {
        if (evt === void 0) { evt = null; }
        egret.Tween.pauseTweens(this.topAnim);
    };
    p.resumeState = function (evt) {
        if (evt === void 0) { evt = null; }
        egret.Tween.resumeTweens(this.topAnim);
    };
    p.stopState = function (evt) {
        if (evt === void 0) { evt = null; }
        egret.Tween.removeTweens(this.topAnim);
    };
    return Obj_BlackT;
})(egret.Sprite);
egret.registerClass(Obj_BlackT,"Obj_BlackT");
