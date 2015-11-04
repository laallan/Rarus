var GameRule = (function (_super) {
    __extends(GameRule, _super);
    function GameRule(w, h, rate) {
        _super.call(this);
        this._resoucePrefix = 'rule_';
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var d = __define,c=GameRule;p=c.prototype;
    p.onAddToStage = function (evt) {
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp5" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        this.addBlackBg();
        this.addRule();
    };
    p.removeFromStage = function (evt) {
        this.removeChild(this.alphaBlack);
        this.alphaBlack = null;
        this.ruleCT.removeChild(this.ruleBg);
        this.ruleBg = null;
        this.txtScroll.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameTop, this);
        this.txtScroll.setContent(null);
        this.ruleCT.removeChild(this.txtScroll);
        this.txtScroll = null;
        this.ruleTxt = null;
        this.ruleCT.removeChild(this.ruleBanMask);
        this.ruleBanMask = null;
        this.ruleCT.removeChild(this.ruleBan);
        this.ruleBan = null;
        this.ruleCT.removeChild(this.ruleClose);
        this.ruleClose = null;
        this.removeChild(this.ruleCT);
        this.ruleCT = null;
    };
    p.addBlackBg = function () {
        this.alphaBlack = new egret.Shape();
        this.alphaBlack.graphics.beginFill(0x000000);
        this.alphaBlack.graphics.drawRect(0, 0, this._iW, this._iH);
        this.alphaBlack.graphics.endFill();
        this.alphaBlack.alpha = .9;
        this.addChild(this.alphaBlack);
        this.alphaBlack.touchEnabled = true;
    };
    p.addRule = function () {
        this.ruleCT = new egret.Sprite();
        this.ruleCT.x = this._scaleRate * 64;
        this.ruleCT.y = this._iH;
        this.ruleCT.scaleX = this.ruleCT.scaleY = this._scaleRate;
        this.addChild(this.ruleCT);
        this.ruleBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'bg'));
        this.ruleCT.addChild(this.ruleBg);
        this.ruleTxt = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'txt'));
        this.txtScroll = new egret.ScrollView(this.ruleTxt);
        this.txtScroll.y = 50;
        this.txtScroll.height = 758;
        this.ruleCT.addChild(this.txtScroll);
        this.ruleBan = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'ban'));
        this.ruleBan.x = 452;
        this.ruleCT.addChild(this.ruleBan);
        this.ruleBanMask = new egret.Shape();
        this.ruleBanMask.graphics.beginFill(0xFF0000);
        this.ruleBanMask.graphics.drawRect(452, GameRule.banTop, 30, 692);
        this.ruleBanMask.graphics.endFill();
        this.ruleCT.addChild(this.ruleBanMask);
        this.ruleBan.mask = this.ruleBanMask;
        this.txtScroll.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrameTop, this);
        this.ruleClose = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'close'));
        this.ruleClose.anchorOffsetX = this.ruleClose.width;
        this.ruleClose.x = 508;
        this.ruleClose.y = 2;
        this.ruleCT.addChild(this.ruleClose);
        this.ruleClose.touchEnabled = true;
        this.ruleClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        this.introAnim();
    };
    p.onEnterFrameTop = function (evt) {
        this.ruleBan.y = evt.currentTarget.scrollTop * ((GameRule.banBottom - GameRule.banTop) / 244) + GameRule.banTop;
    };
    p.onClose = function (evt) {
        egret.Tween.get(this.ruleCT).to({ y: this._iH }, 350, egret.Ease.cubicInOut).call(function () {
            this.dispatchEvent(new egret.Event('hideRule', true));
        }, this);
    };
    p.introAnim = function () {
        egret.Tween.get(this.ruleCT).to({ y: (this._iH - this._scaleRate * this.ruleBg.height) * .5 }, 350, egret.Ease.cubicInOut);
    };
    GameRule.banTop = 98;
    GameRule.banBottom = 606;
    return GameRule;
})(egret.Sprite);
egret.registerClass(GameRule,"GameRule");
