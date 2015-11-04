var StartGame = (function (_super) {
    __extends(StartGame, _super);
    function StartGame(w, h, rate) {
        _super.call(this);
        this._resoucePrefix = 'start_';
        this.yellowId = 0;
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var d = __define,c=StartGame;p=c.prototype;
    p.onAddToStage = function (evt) {
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp1" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        this.addGreyT();
        this.addMainTitle();
        this.addRedT();
        this.addBtns();
        this.addYellowT();
        this.addGears();
        this.introAnim();
        this.addEventListener('pauseStartAnim', this.pauseAnim, this);
        this.addEventListener('resumeStartAnim', this.resumeAnim, this);
    };
    p.removeFromStage = function (evt) {
        egret.Tween.removeTweens(this.tipPhoneAnim);
        this.tipContainer.removeChildren();
        this.removeChild(this.tipContainer);
        this.tipContainer = null;
        this.removeChild(this.tipBg);
        this.tipBg = null;
        egret.Tween.removeTweens(this.BtnStart_Over);
        egret.Tween.removeTweens(this.gear_1S);
        egret.Tween.removeTweens(this.gear_1);
        egret.Tween.removeTweens(this.gear_2S);
        egret.Tween.removeTweens(this.gear_2);
        this.gearContainer.removeChildren();
        this.removeChild(this.gearContainer);
        this.gearContainer = null;
        this.btnContainer.removeChildren();
        this.removeChild(this.btnContainer);
        this.btnContainer = null;
        this.yellowTContainer.removeChild(this.yellowT);
        this.yellowT = null;
        this.removeChild(this.yellowTContainer);
        this.yellowTContainer = null;
        this.redTContainer.removeChild(this.redT);
        this.redT = null;
        this.removeChild(this.redTContainer);
        this.redTContainer = null;
        this.titleContainer.removeChildren();
        this.removeChild(this.titleContainer);
        this.titleContainer = null;
        this.grayTContainer.removeChild(this.grayT);
        this.grayT = null;
        this.removeChild(this.grayTContainer);
        this.grayTContainer = null;
    };
    p.addGreyT = function () {
        this.grayTContainer = new egret.Sprite();
        this.grayTContainer.name = 'grayTCT';
        this.grayTContainer.scaleX = this.grayTContainer.scaleY = this._scaleRate;
        this.addChild(this.grayTContainer);
        this.grayT = new egret.Bitmap(RES.getRes(this._resoucePrefix + "grayT"));
        this.grayT.x = 8;
        this.grayT.y = -130;
        this.grayTContainer.addChild(this.grayT);
    };
    p.addMainTitle = function () {
        this.titleContainer = new egret.Sprite();
        this.titleContainer.name = 'titleCT';
        this.titleContainer.scaleX = this.titleContainer.scaleY = this._scaleRate;
        this.addChild(this.titleContainer);
        for (var i = 1; i <= 3; i++) {
            this['titlePart_' + i] = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'titlePart_' + i));
            this.titleContainer.addChild(this['titlePart_' + i]);
            switch (i) {
                case 1:
                    this['titlePart_' + i].anchorOffsetX = this['titlePart_' + i].width;
                    this['titlePart_' + i].anchorOffsetY = this['titlePart_' + i].height;
                    this['titlePart_' + i].x = 234;
                    this['titlePart_' + i].y = 248;
                    break;
                case 2:
                    this['titlePart_' + i].anchorOffsetY = this['titlePart_' + i].height;
                    this['titlePart_' + i].x = 350;
                    this['titlePart_' + i].y = 234;
                    break;
                case 3:
                    this['titlePart_' + i].anchorOffsetX = this['titlePart_' + i].width;
                    this['titlePart_' + i].x = 126;
                    this['titlePart_' + i].y = 266;
                    break;
            }
        }
        this.subTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + "subTitle"));
        this.subTitle.x = -554;
        this.subTitle.y = 394;
        this.titleContainer.addChild(this.subTitle);
        this.mainTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + "mainTitle"));
        this.mainTitle.anchorOffsetX = this.mainTitle.width * .5;
        this.mainTitle.anchorOffsetY = this.mainTitle.height * .5;
        this.mainTitle.x = 324;
        this.mainTitle.y = 220;
        this.mainTitle.scaleX = this.mainTitle.scaleY = 3;
        this.mainTitle.alpha = 0;
        this.titleContainer.addChild(this.mainTitle);
    };
    p.addRedT = function () {
        this.redTContainer = new egret.Sprite();
        this.redTContainer.name = 'redTCT';
        this.redTContainer.scaleX = this.redTContainer.scaleY = this._scaleRate;
        this.addChild(this.redTContainer);
        this.redT = new egret.Bitmap(RES.getRes(this._resoucePrefix + "redT"));
        this.redT.scaleX = this.redT.scaleY = 2;
        this.redT.x = 444;
        this.redT.y = 98;
        this.redT.alpha = 0;
        this.redTContainer.addChild(this.redT);
    };
    p.addBtns = function () {
        this.btnContainer = new egret.Sprite();
        this.btnContainer.name = 'btnCT';
        this.btnContainer.x = this._iW * .5;
        this.btnContainer.y = this._iH * (678 / 958);
        this.btnContainer.scaleX = this.btnContainer.scaleY = this._scaleRate;
        this.addChild(this.btnContainer);
        this.btnBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnBg"));
        this.btnBg.x = -170;
        this.btnBg.y = -148;
        this.btnBg.alpha = 0;
        this.btnContainer.addChild(this.btnBg);
        this.btnRule = new egret.Bitmap();
        this.btnRule.texture = RES.getRes(this._resoucePrefix + "btnRule_Init");
        this.btnRule.x = -218;
        this.btnRule.y = 64;
        this.btnRule.alpha = 0;
        this.btnContainer.addChild(this.btnRule);
        this.btnRank = new egret.Bitmap();
        this.btnRank.texture = RES.getRes(this._resoucePrefix + "btnRank_Init");
        this.btnRank.x = -218;
        this.btnRank.y = -52;
        this.btnRank.alpha = 0;
        this.btnContainer.addChild(this.btnRank);
        this.btnLine = new egret.Bitmap();
        this.btnLine.texture = RES.getRes(this._resoucePrefix + "btnLine");
        this.btnLine.x = -242;
        this.btnLine.y = -180;
        this.btnLine.alpha = 0;
        this.btnContainer.addChild(this.btnLine);
        this.btnStart = new egret.Sprite();
        this.btnStart.x = -218;
        this.btnStart.y = -166;
        this.btnStart.alpha = 0;
        this.btnContainer.addChild(this.btnStart);
        this.BtnStart_Init = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnStart_Init"));
        this.BtnStart_Over = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnStart_Over"));
        this.btnStart.addChild(this.BtnStart_Init);
        this.btnStart.addChild(this.BtnStart_Over);
        egret.Tween.get(this.BtnStart_Over, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        this.btnStart.touchEnabled = true;
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_BEGIN, startOver, this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_END, startOut, this);
        this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showTip, this);
        function startOver(evt) {
            egret.Tween.removeTweens(this.BtnStart_Over);
            this.BtnStart_Over.alpha = 1;
        }
        function startOut(evt) {
            egret.Tween.get(this.BtnStart_Over, { loop: true }).to({ alpha: 0 }, 1000).to({ alpha: 1 }, 1000);
        }
        this.btnRule.touchEnabled = true;
        this.btnRule.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ruleOver, this);
        this.btnRule.addEventListener(egret.TouchEvent.TOUCH_END, ruleOut, this);
        this.btnRule.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRule, this);
        function ruleOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRule_Over");
        }
        function ruleOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRule_Init");
        }
        this.btnRank.touchEnabled = true;
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_BEGIN, rankOver, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_END, rankOut, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
        function rankOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRank_Over");
        }
        function rankOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRank_Init");
        }
    };
    p.showRank = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_Start_list_Click', 'Click');
        this.dispatchEvent(new egret.Event('showRank', true));
    };
    p.showRule = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_Start_rules_Click', 'Click');
        this.dispatchEvent(new egret.Event('showRule', true));
    };
    p.showTip = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_Start_start_game_Click', 'Click');
        this.pauseAnim();
        this.createTip();
    };
    // 开始游戏前出现的Tip
    p.createTip = function () {
        this.tipBg = new egret.Shape();
        this.tipBg.graphics.beginFill(0x000000);
        this.tipBg.graphics.drawRect(0, 0, this._iW, this._iH);
        this.tipBg.graphics.endFill();
        this.tipBg.alpha = .9;
        this.addChild(this.tipBg);
        this.tipBg.touchEnabled = true;
        this.tipContainer = new egret.Sprite();
        this.tipContainer.scaleX = this.tipContainer.scaleY = this._scaleRate;
        this.tipContainer.x = this._iW * .5;
        this.tipContainer.y = this._iH * .5 - 60;
        this.addChild(this.tipContainer);
        this.tipPhoneAnim = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'tipPhone'));
        this.tipPhoneAnim.anchorOffsetX = this.tipPhoneAnim.width * .5;
        this.tipPhoneAnim.anchorOffsetY = this.tipPhoneAnim.height;
        this.tipPhoneAnim.x = 0;
        this.tipPhoneAnim.y = 0;
        this.tipPhoneAnim.rotation = 16;
        this.tipContainer.addChild(this.tipPhoneAnim);
        egret.Tween.get(this.tipPhoneAnim, { loop: true }).to({ rotation: -16 }, 1000).to({ rotation: 16 }, 1000);
        this.tipTxt = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'tipTxt'));
        this.tipTxt.anchorOffsetX = this.tipTxt.width * .5;
        this.tipTxt.anchorOffsetY = -30;
        this.tipTxt.x = 0;
        this.tipTxt.y = 0;
        this.tipContainer.addChild(this.tipTxt);
        this.tipSkip = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'tipSkip'));
        this.tipSkip.anchorOffsetX = this.tipSkip.width * .5;
        this.tipSkip.anchorOffsetY = 0;
        this.tipSkip.x = 0;
        this.tipSkip.y = 250;
        this.tipContainer.addChild(this.tipSkip);
        this.tipSkip.touchEnabled = true;
        this.tipSkip.addEventListener(egret.TouchEvent.TOUCH_TAP, onSkipToGame, this);
        function onSkipToGame(evt) {
            ClickEvent('SHCrarus', 'SHCrarus/rarus_Pop_skip_Click', 'Click');
            this.dispatchEvent(new egret.Event('skipToGame', true));
        }
    };
    p.addYellowT = function () {
        this.yellowTContainer = new egret.Sprite();
        this.yellowTContainer.name = 'yellowTCT';
        this.yellowTContainer.scaleX = this.yellowTContainer.scaleY = this._scaleRate;
        this.addChild(this.yellowTContainer);
        this.yellowT = new egret.Bitmap();
        this.yellowT.anchorOffsetX = this.yellowT.width = 408;
        this.yellowT.x = 198;
        this.yellowT.y = 416;
        this.yellowTContainer.addChild(this.yellowT);
    };
    p.addGears = function () {
        this.gearContainer = new egret.Sprite();
        this.gearContainer.name = 'gearCT';
        this.gearContainer.y = this._iH + this._scaleRate * 220;
        this.gearContainer.scaleX = this.gearContainer.scaleY = this._scaleRate;
        this.addChild(this.gearContainer);
        this.gear_1S = new egret.Bitmap(RES.getRes(this._resoucePrefix + "gear_1_Shadow"));
        this.gear_1S.anchorOffsetX = 202;
        this.gear_1S.anchorOffsetY = 220;
        this.gear_1S.x = 52;
        this.gear_1S.y = 8;
        this.gearContainer.addChild(this.gear_1S);
        this.gear_2S = new egret.Bitmap(RES.getRes(this._resoucePrefix + "gear_2_Shadow"));
        this.gear_2S.anchorOffsetX = 136;
        this.gear_2S.anchorOffsetY = 134;
        this.gear_2S.x = 594;
        this.gear_2S.y = -2;
        this.gearContainer.addChild(this.gear_2S);
        this.gear_1 = new egret.Bitmap(RES.getRes(this._resoucePrefix + "gear_1"));
        this.gear_1.anchorOffsetX = 204;
        this.gear_1.anchorOffsetY = 198;
        this.gear_1.x = 56;
        this.gear_1.y = -16;
        this.gearContainer.addChild(this.gear_1);
        this.gear_2 = new egret.Bitmap(RES.getRes(this._resoucePrefix + "gear_2"));
        this.gear_2.anchorOffsetX = 130;
        this.gear_2.anchorOffsetY = 120;
        this.gear_2.x = 588;
        this.gear_2.y = -16;
        this.gearContainer.addChild(this.gear_2);
        egret.Tween.get(this.gear_1S, { loop: true }).to({ rotation: 360 }, 8000);
        egret.Tween.get(this.gear_2S, { loop: true }).to({ rotation: -360 }, 8000);
        egret.Tween.get(this.gear_1, { loop: true }).to({ rotation: 360 }, 8000);
        egret.Tween.get(this.gear_2, { loop: true }).to({ rotation: -360 }, 8000);
    };
    p.introAnim = function () {
        egret.Tween.get(this.mainTitle).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 250, egret.Ease.cubicInOut);
        egret.Tween.get(this.titlePart_1).wait(200).to({ x: 200, y: 134 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.titlePart_2).wait(200).to({ x: 348, y: 106 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.titlePart_3).wait(200).to({ x: 126, y: 350 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.grayT).wait(400).to({ y: 52 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.subTitle).wait(450).to({ x: 42, y: 324 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.redT).wait(700).to({ scaleX: 1, scaleY: 1, x: 512, y: 186, alpha: 1 }, 750, egret.Ease.elasticOut);
        egret.Tween.get(this.gearContainer).wait(900).to({ y: this._iH }, 400, egret.Ease.backOut);
        egret.Tween.get(this.btnStart).wait(1200).to({ y: -206, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnRank).wait(1300).to({ y: -92, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnRule).wait(1400).to({ y: 24, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnBg).wait(1800).to({ alpha: 1 }, 350);
        egret.Tween.get(this.btnLine).wait(1900).to({ alpha: 1 }, 350);
        this.yellowTDelayShow = egret.setTimeout(this.showYellowAnim, this, 1500);
    };
    p.showYellowAnim = function () {
        this.yellowTAnimTimer = new egret.Timer(80, 9);
        this.yellowTAnimTimer.addEventListener(egret.TimerEvent.TIMER, this.goYellowAnim, this);
        this.yellowTAnimTimer.start();
    };
    p.goYellowAnim = function (evt) {
        this.yellowId++;
        this.yellowT.texture = RES.getRes(this._resoucePrefix + "yellowT" + this.yellowId);
    };
    p.pauseAnim = function (evt) {
        if (evt === void 0) { evt = null; }
        egret.Tween.pauseTweens(this.BtnStart_Over);
        egret.Tween.pauseTweens(this.gear_1S);
        egret.Tween.pauseTweens(this.gear_1);
        egret.Tween.pauseTweens(this.gear_2S);
        egret.Tween.pauseTweens(this.gear_2);
    };
    p.resumeAnim = function (evt) {
        if (evt === void 0) { evt = null; }
        egret.Tween.resumeTweens(this.BtnStart_Over);
        egret.Tween.resumeTweens(this.gear_1S);
        egret.Tween.resumeTweens(this.gear_1);
        egret.Tween.resumeTweens(this.gear_2S);
        egret.Tween.resumeTweens(this.gear_2);
    };
    return StartGame;
})(egret.Sprite);
egret.registerClass(StartGame,"StartGame");
