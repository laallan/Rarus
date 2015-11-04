var PersonRank = (function (_super) {
    __extends(PersonRank, _super);
    function PersonRank(w, h, rate, id) {
        _super.call(this);
        this._resoucePrefix = 'rank_';
        this.uid = '';
        this.listURL = "ajax.php?flg=5";
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this.uid = id;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var d = __define,c=PersonRank;p=c.prototype;
    p.onAddToStage = function (evt) {
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp4" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        this.addMainTitle();
        this.addRanks();
        this.addBtn();
        this.addGreyT();
        this.addRedT();
        this.introAnim();
        this.readList();
        this.addEventListener('changeListData', this.changeList, this);
    };
    p.removeFromStage = function (evt) {
        this.removeEventListener('changeListData', this.changeList, this);
        this.rankPerCT.removeChildren();
        this.rankList.removeChild(this.listScroll);
        this.listScroll = null;
        this.removeChild(this.rankList);
        this.rankList = null;
        this.redTContainer.removeChild(this.redT);
        this.redT = null;
        this.removeChild(this.redTContainer);
        this.redTContainer = null;
        this.grayTContainer.removeChild(this.grayT);
        this.grayT = null;
        this.removeChild(this.grayTContainer);
        this.grayTContainer = null;
        this.btnBackContainer.removeChild(this.btnBack);
        this.btnBack = null;
        this.removeChild(this.btnBackContainer);
        this.btnBackContainer = null;
        this.titleContainer.removeChildren();
        this.removeChild(this.titleContainer);
        this.titleContainer = null;
    };
    p.addMainTitle = function () {
        this.titleContainer = new egret.Sprite();
        this.titleContainer.name = 'titleCT';
        this.titleContainer.scaleX = this.titleContainer.scaleY = this._scaleRate;
        this.addChild(this.titleContainer);
        for (var i = 1; i <= 2; i++) {
            this['titlePart_' + i] = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'titlePart_' + i));
            switch (i) {
                case 1:
                    this['titlePart_' + i].x = -368;
                    this['titlePart_' + i].y = 78;
                    break;
                case 2:
                    this['titlePart_' + i].x = 386;
                    this['titlePart_' + i].y = -42;
                    break;
            }
            this.titleContainer.addChild(this['titlePart_' + i]);
        }
        this.mainTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + "title"));
        this.mainTitle.anchorOffsetX = this.mainTitle.width * .5;
        this.mainTitle.anchorOffsetY = this.mainTitle.height * .5;
        this.mainTitle.x = 320;
        this.mainTitle.y = 112;
        this.mainTitle.scaleX = this.mainTitle.scaleY = 3;
        this.mainTitle.alpha = 0;
        this.titleContainer.addChild(this.mainTitle);
    };
    p.addRanks = function () {
        this.rankList = new egret.Sprite();
        this.rankList.name = 'rankListCT';
        this.rankList.y = this._scaleRate * 214;
        this.rankList.scaleX = this.rankList.scaleY = this._scaleRate;
        this.addChild(this.rankList);
        this.rankPerCT = new egret.DisplayObjectContainer();
        this.listScroll = new egret.ScrollView(this.rankPerCT);
        this.listScroll.width = 640;
        this.listScroll.height = this._iH / this._scaleRate - 214 - 136 + 38;
        this.rankList.addChild(this.listScroll);
    };
    p.addBtn = function () {
        this.btnBackContainer = new egret.Sprite();
        this.btnBackContainer.name = 'btnCT';
        this.btnBackContainer.x = this._iW * .5;
        this.btnBackContainer.y = this._iH;
        this.btnBackContainer.scaleX = this.btnBackContainer.scaleY = this._scaleRate;
        this.addChild(this.btnBackContainer);
        this.btnBack = new egret.Bitmap();
        this.btnBack.texture = RES.getRes(this._resoucePrefix + "btn_Init");
        this.btnBack.x = -186;
        this.btnBack.y = 0;
        this.btnBackContainer.addChild(this.btnBack);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onBtnOver, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_END, onBtnOut, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackToMain, this);
        function onBtnOver(evt) {
            this.btnBack.texture = RES.getRes(this._resoucePrefix + "btn_Over");
        }
        function onBtnOut(evt) {
            this.btnBack.texture = RES.getRes(this._resoucePrefix + "btn_Init");
        }
    };
    p.onBackToMain = function (evt) {
        this.dispatchEvent(new egret.Event('hidePersonRank', true));
    };
    p.addGreyT = function () {
        this.grayTContainer = new egret.Sprite();
        this.grayTContainer.name = 'grayTCT';
        this.grayTContainer.scaleX = this.grayTContainer.scaleY = this._scaleRate;
        this.addChild(this.grayTContainer);
        this.grayT = new egret.Bitmap(RES.getRes(this._resoucePrefix + "blackT"));
        this.grayT.x = -150;
        this.grayT.y = -260;
        this.grayT.scaleX = this.grayT.scaleY = 2;
        this.grayTContainer.addChild(this.grayT);
    };
    p.addRedT = function () {
        this.redTContainer = new egret.Sprite();
        this.redTContainer.name = 'redTCT';
        this.redTContainer.scaleX = this.redTContainer.scaleY = this._scaleRate;
        this.redTContainer.y = this._iH;
        this.addChild(this.redTContainer);
        this.redT = new egret.Bitmap(RES.getRes(this._resoucePrefix + "redT"));
        this.redT.x = 434;
        this.redT.y = -282;
        this.redT.scaleX = this.redT.scaleY = 2;
        this.redT.alpha = 0;
        this.redTContainer.addChild(this.redT);
    };
    p.introAnim = function () {
        egret.Tween.get(this.mainTitle).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 350, egret.Ease.cubicInOut);
        egret.Tween.get(this.titlePart_1).wait(250).to({ x: 0, y: 16 }, 200, egret.Ease.cubicInOut);
        egret.Tween.get(this.titlePart_2).wait(300).to({ x: 0, y: 16 }, 200, egret.Ease.cubicInOut);
        egret.Tween.get(this.grayT).wait(500).to({ scaleX: 1, scaleY: 1, x: -9, y: 6 }, 200, egret.Ease.backOut);
        egret.Tween.get(this.btnBack).wait(700).to({ y: -136 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.redT).wait(800).to({ scaleX: 1, scaleY: 1, x: 509, y: -186, alpha: 1 }, 500, egret.Ease.elasticOut);
    };
    p.readList = function () {
        this.btnBack.touchEnabled = false;
        this.listLoader = new egret.URLLoader();
        this.listLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.listLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.listLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.listRequest = new egret.URLRequest(this.listURL + '&rand=' + Math.round(Math.random() * 1000));
        this.listRequest.method = egret.URLRequestMethod.POST;
        this.listRequest.data = new egret.URLVariables('id=' + this.uid);
        this.listLoader.load(this.listRequest);
    };
    p.onLoadComplete = function (evt) {
        this.listLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.listLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.btnBack.touchEnabled = true;
        // console.log( evt.currentTarget.data );
        var lData = evt.currentTarget.data.split('+|')[1];
        var lDataLength = lData.split('~|').length;
        var lDataId = Number(evt.currentTarget.data.split('+|')[0]);
        for (var i = 0; i < lDataLength; i++) {
            if (lData.split('~|')[i].split(',')[2]) {
                var perRank = new PerRank(i + lDataId, lData.split('~|')[i].split(',')[0], Number(lData.split('~|')[i].split(',')[1]), true);
            }
            else {
                var perRank = new PerRank(i + lDataId, lData.split('~|')[i].split(',')[0], Number(lData.split('~|')[i].split(',')[1]), false);
            }
            perRank.name = 'perRank_' + (i + 1);
            perRank.x = 28;
            perRank.y = 54 * i;
            this.rankPerCT.addChild(perRank);
        }
    };
    p.onLoadError = function (evt) {
        this.btnBack.touchEnabled = true;
        alert('网络连接错误');
    };
    p.changeList = function (evt) {
        this.rankPerCT.removeChildren();
        this.readList();
    };
    return PersonRank;
})(egret.Sprite);
egret.registerClass(PersonRank,"PersonRank");
