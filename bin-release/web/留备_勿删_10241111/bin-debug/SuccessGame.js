var SuccessGame = (function (_super) {
    __extends(SuccessGame, _super);
    function SuccessGame(w, h, rate, sc) {
        _super.call(this);
        this._resoucePrefix = 'success_';
        this.listURL = "ajax.php?flg=4";
        this.upScoreURL = "ajax.php?flg=2";
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this._uScore = sc;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=SuccessGame;p=c.prototype;
    p.onAddToStage = function (evt) {
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp3" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        this.addGrayT();
        this.addMainTitle();
        this.addRedT();
        this.addBtns();
        this.addRank();
        this.introAnim();
        this.getTop3();
        this.addEventListener('changeScore', this.changeScore, this);
    };
    p.addGrayT = function () {
        this.grayTContainer = new egret.Sprite();
        this.grayTContainer.name = 'grayTCT';
        this.grayTContainer.scaleX = this.grayTContainer.scaleY = this._scaleRate;
        this.addChild(this.grayTContainer);
        this.grayT = new egret.Bitmap(RES.getRes(this._resoucePrefix + "grayT"));
        this.grayT.x = 8;
        this.grayT.y = -110;
        this.grayTContainer.addChild(this.grayT);
    };
    p.addMainTitle = function () {
        this.titleContainer = new egret.Sprite();
        this.titleContainer.name = 'titleCT';
        this.titleContainer.scaleX = this.titleContainer.scaleY = this._scaleRate;
        this.addChild(this.titleContainer);
        this.scoreBar = new egret.DisplayObjectContainer();
        this.scoreBar.x = 50;
        this.scoreBar.y = 70;
        this.scoreBar.alpha = 0;
        this.titleContainer.addChild(this.scoreBar);
        this.scoreBarBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + "scoreBg"));
        this.scoreBar.addChild(this.scoreBarBg);
        this.scoreText = new egret.DisplayObjectContainer();
        this.scoreText.x = 38;
        this.scoreText.y = 20;
        switch (this._uScore.length) {
            case 1:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 3:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 4:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 5:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 6:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 7:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 2) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(4, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 8:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 1) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 2) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(4, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(5, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
        }
        this.scoreBar.addChild(this.scoreText);
        for (var i = 1; i <= 3; i++) {
            this['titlePart_' + i] = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'titlePart_' + i));
            this.titleContainer.addChild(this['titlePart_' + i]);
            switch (i) {
                case 1:
                    this['titlePart_' + i].anchorOffsetX = this['titlePart_' + i].width;
                    this['titlePart_' + i].anchorOffsetY = this['titlePart_' + i].height - 16;
                    this['titlePart_' + i].x = 174;
                    this['titlePart_' + i].y = 114;
                    break;
                case 2:
                    this['titlePart_' + i].anchorOffsetY = this['titlePart_' + i].height;
                    this['titlePart_' + i].x = 366;
                    this['titlePart_' + i].y = 146;
                    break;
                case 3:
                    this['titlePart_' + i].anchorOffsetX = this['titlePart_' + i].width;
                    this['titlePart_' + i].x = 398;
                    this['titlePart_' + i].y = 74;
                    break;
            }
        }
        this.mainTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + "mainTitle"));
        this.mainTitle.anchorOffsetX = this.mainTitle.width * .5;
        this.mainTitle.anchorOffsetY = this.mainTitle.height * .5;
        this.mainTitle.x = 320;
        this.mainTitle.y = 102;
        this.mainTitle.scaleX = this.mainTitle.scaleY = 2;
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
        this.redT.x = 430;
        this.redT.y = 254;
        this.redT.alpha = 0;
        this.redTContainer.addChild(this.redT);
    };
    p.addBtns = function () {
        this.btnContainer = new egret.Sprite();
        this.btnContainer.name = 'btnCT';
        this.btnContainer.x = this._iW * .5;
        this.btnContainer.y = this._iH * (422 / 958);
        this.btnContainer.scaleX = this.btnContainer.scaleY = this._scaleRate;
        this.addChild(this.btnContainer);
        this.btnReset = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnResetInit"));
        this.btnReset.x = -158;
        this.btnReset.y = -108;
        this.btnReset.alpha = 0;
        this.btnContainer.addChild(this.btnReset);
        this.btnReset.touchEnabled = true;
        this.btnReset.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onResetOver, this);
        this.btnReset.addEventListener(egret.TouchEvent.TOUCH_END, onResetOut, this);
        this.btnReset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetGame, this);
        this.btnPro = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnProInit"));
        this.btnPro.x = -182;
        this.btnPro.y = 50;
        this.btnPro.alpha = 0;
        this.btnContainer.addChild(this.btnPro);
        this.btnPro.touchEnabled = true;
        this.btnPro.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onProOver, this);
        this.btnPro.addEventListener(egret.TouchEvent.TOUCH_END, onProOut, this);
        this.btnPro.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onProTAP, this);
        this.btnSignUp = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnSignUpInit"));
        this.btnSignUp.x = -162;
        this.btnSignUp.y = -24;
        this.btnSignUp.alpha = 0;
        this.btnContainer.addChild(this.btnSignUp);
        this.btnSignUp.touchEnabled = true;
        this.btnSignUp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onSignOver, this);
        this.btnSignUp.addEventListener(egret.TouchEvent.TOUCH_END, onSignOut, this);
        this.btnSignUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignTap, this);
        this.btnUploadScore = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnUploadInit"));
        this.btnUploadScore.x = -162;
        this.btnUploadScore.y = -58;
        this.btnUploadScore.visible = false;
        this.btnContainer.addChild(this.btnUploadScore);
        this.btnUploadScore.touchEnabled = true;
        this.btnUploadScore.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onUpScOver, this);
        this.btnUploadScore.addEventListener(egret.TouchEvent.TOUCH_END, onUpScOut, this);
        this.btnUploadScore.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUpScTap, this);
        function onResetOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnResetOver");
        }
        function onResetOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnResetInit");
        }
        function onProOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnProOver");
        }
        function onProOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnProInit");
        }
        function onSignOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnSignUpOver");
        }
        function onSignOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnSignUpInit");
        }
        function onUpScOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnUploadOver");
        }
        function onUpScOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnUploadInit");
        }
    };
    // 重开游戏
    p.onResetGame = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_End_play_again_Click', 'Click');
        this.dispatchEvent(new egret.Event('successRestart', true));
    };
    // 注册点击
    p.onSignTap = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_End_register_prize_Click', 'Click');
        this.dispatchEvent(new egret.Event('successSignup', true));
    };
    // 外链
    p.onProTAP = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_End_understand_products_Click', 'Click');
        window.location.href = '6-Mobil SHC Rarus Series sell sheet(210x285mm).compressed.pdf';
    };
    // 上传分数
    p.onUpScTap = function (evt) {
        // console.log( this._uName, this._uPhone, this._uScore );
        this.upScoreLoader = new egret.URLLoader();
        this.upScoreLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.upScoreLoader.addEventListener(egret.Event.COMPLETE, this.checkHandle, this);
        this.upScoreLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.checkHandle, this);
        this.upScoreRequest = new egret.URLRequest(this.upScoreURL + '&rand=' + Math.round(Math.random() * 1000));
        this.upScoreRequest.method = egret.URLRequestMethod.POST;
        // console.log( 'userName=' + this.userName + '&companyName=' + this.compName + '&companyNature=' + this.compType + '&industry=' + this.compArea + '&email=' + this.userEmail + '&phone=' + this.userPhone + '&allowEmail=' + this.allowEmail + '&score=' + this.userScore );
        this.upScoreVariables = new egret.URLVariables('userName=' + this._uName + '&phone=' + this._uPhone + '&score=' + this._uScore);
        this.upScoreRequest.data = this.upScoreVariables;
        this.upScoreLoader.load(this.upScoreRequest);
    };
    p.checkHandle = function (evt) {
        this.upScoreLoader.removeEventListener(egret.Event.COMPLETE, this.checkHandle, this);
        this.upScoreLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.checkHandle, this);
        switch (evt.type) {
            case egret.Event.COMPLETE:
                if (evt.currentTarget.data > 0) {
                    alert('分数更新成功');
                }
                else {
                    alert('更新失败');
                }
                break;
            case egret.IOErrorEvent.IO_ERROR:
                alert('网络连接错误');
                break;
        }
    };
    p.addRank = function () {
        this.rankContainer = new egret.Sprite();
        this.rankContainer.name = 'rankCT';
        this.rankContainer.x = this._iW * .5;
        this.rankContainer.y = this._iH;
        this.rankContainer.scaleX = this.rankContainer.scaleY = this._scaleRate;
        this.addChild(this.rankContainer);
        this.rankTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + "rankTitle"));
        this.rankTitle.x = -144;
        this.rankTitle.y = -350;
        this.rankTitle.alpha = 0;
        this.rankContainer.addChild(this.rankTitle);
        this.ranks = new egret.Sprite();
        this.ranks.x = 400;
        this.ranks.y = -280;
        this.rankContainer.addChild(this.ranks);
        this.rankBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + "rankBg"));
        this.ranks.addChild(this.rankBg);
        this.rankName_1 = new egret.TextField();
        this.rankName_2 = new egret.TextField();
        this.rankName_3 = new egret.TextField();
        this.rankName_1.fontFamily = this.rankName_2.fontFamily = this.rankName_3.fontFamily = "SimHei";
        this.rankName_1.size = this.rankName_2.size = this.rankName_3.size = 30;
        this.rankName_1.textColor = this.rankName_2.textColor = this.rankName_3.textColor = 0x2B91F7;
        this.rankName_1.bold = this.rankName_2.bold = this.rankName_3.bold = true;
        this.rankName_1.anchorOffsetY = this.rankName_1.height * .5;
        this.rankName_2.anchorOffsetY = this.rankName_2.height * .5;
        this.rankName_3.anchorOffsetY = this.rankName_3.height * .5;
        this.rankName_1.x = this.rankName_2.x = this.rankName_3.x = 132;
        this.rankName_1.y = 18;
        this.rankName_2.y = 72;
        this.rankName_3.y = 126;
        this.ranks.addChild(this.rankName_1);
        this.ranks.addChild(this.rankName_2);
        this.ranks.addChild(this.rankName_3);
        this.rankScore_1 = new egret.TextField();
        this.rankScore_2 = new egret.TextField();
        this.rankScore_3 = new egret.TextField();
        this.rankScore_1.fontFamily = this.rankScore_2.fontFamily = this.rankScore_3.fontFamily = "Arial";
        this.rankScore_1.size = this.rankScore_2.size = this.rankScore_3.size = 30;
        this.rankScore_1.textColor = this.rankScore_2.textColor = this.rankScore_3.textColor = 0x2B91F7;
        this.rankScore_1.anchorOffsetY = this.rankScore_1.height * .5;
        this.rankScore_2.anchorOffsetY = this.rankScore_2.height * .5;
        this.rankScore_3.anchorOffsetY = this.rankScore_3.height * .5;
        this.rankScore_1.x = this.rankScore_2.x = this.rankScore_3.x = 416;
        this.rankScore_1.y = 18;
        this.rankScore_2.y = 72;
        this.rankScore_3.y = 126;
        this.ranks.addChild(this.rankScore_1);
        this.ranks.addChild(this.rankScore_2);
        this.ranks.addChild(this.rankScore_3);
        this.btnRank = new egret.Bitmap(RES.getRes(this._resoucePrefix + "btnRankInit"));
        this.btnRank.x = -186;
        this.btnRank.y = 0;
        this.rankContainer.addChild(this.btnRank);
        this.btnRank.touchEnabled = true;
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onRankOver, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_END, onRankOut, this);
        this.btnRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowRank, this);
        function onRankOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRankOver");
        }
        function onRankOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + "btnRankInit");
        }
    };
    // 成功页的排行榜分两种情况，未注册，这时用户名为空，已注册则会有用户名
    p.onShowRank = function (evt) {
        ClickEvent('SHCrarus', 'SHCrarus/rarus_End_all_list_Click', 'Click');
        if (this._uName == null || this._uName == '' || this._uPhone == null) {
            this.dispatchEvent(new egret.Event('showRankFromSuccess', true));
        }
        else {
            this.dispatchEvent(new egret.Event('showRankFromSigned', true));
        }
    };
    // 进场动画
    p.introAnim = function () {
        egret.Tween.get(this.mainTitle).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 250, egret.Ease.cubicInOut);
        egret.Tween.get(this.titlePart_1).wait(200).to({ x: 156, y: 62 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.titlePart_2).wait(200).to({ x: 372, y: 72 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.titlePart_3).wait(200).to({ x: 360, y: 124 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.grayT).wait(400).to({ y: -4 }, 250, egret.Ease.backOut);
        egret.Tween.get(this.scoreBar).wait(500).to({ y: 169, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.redT).wait(500).to({ scaleX: 1, scaleY: 1, x: 500, y: 345, alpha: 1 }, 750, egret.Ease.elasticOut);
        egret.Tween.get(this.rankTitle).wait(600).to({ y: -384, alpha: 1 }, 350, egret.Ease.cubicInOut);
        egret.Tween.get(this.ranks).wait(600).to({ x: -292 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnRank).wait(750).to({ y: -144 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnReset).wait(1000).to({ y: -148, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnSignUp).wait(1100).to({ y: -64, alpha: 1 }, 350, egret.Ease.backOut);
        egret.Tween.get(this.btnPro).wait(1200).to({ y: 9, alpha: 1 }, 350, egret.Ease.backOut);
    };
    p.getTop3 = function () {
        this.listLoader = new egret.URLLoader();
        this.listLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.listLoader.addEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.listLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        this.listRequest = new egret.URLRequest(this.listURL + '&rand=' + Math.round(Math.random() * 1000));
        this.listLoader.load(this.listRequest);
    };
    p.onLoadComplete = function (evt) {
        this.listLoader.removeEventListener(egret.Event.COMPLETE, this.onLoadComplete, this);
        this.listLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadError, this);
        var lData = evt.currentTarget.data;
        var lDataLength = lData.split('~|').length;
        for (var i = 0; i < 3; i++) {
            this['rankName_' + (i + 1)].text = lData.split('~|')[i].split(',')[0];
            this['rankScore_' + (i + 1)].text = lData.split('~|')[i].split(',')[1];
        }
    };
    p.onLoadError = function (evt) {
        alert('网络连接错误');
    };
    // 二次打开成功页时直接更新分数显示
    p.changeScore = function (evt) {
        this.scoreText.removeChildren();
        this.getTop3();
        switch (this._uScore.length) {
            case 1:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 3:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 4:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 5:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 6:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 7:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 2) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(4, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
            case 8:
                for (var i = 1; i <= 10; i++) {
                    var _textF = new egret.TextField();
                    _textF.name = 'tF_' + i;
                    _textF.fontFamily = "Arial";
                    _textF.bold = true;
                    _textF.textColor = 0xFFFFFF;
                    _textF.size = 90;
                    _textF.stroke = 4;
                    _textF.strokeColor = 0x001D3A;
                    if (i <= 4) {
                        _textF.x = 45 * (i - 1);
                    }
                    if (i > 4 && i <= 8) {
                        _textF.x = 45 * (i - 1) - 24;
                    }
                    if (i > 8) {
                        _textF.x = 45 * (i - 1) - 48;
                    }
                    _textF.text = '0';
                    if (i == 4 || i == 8) {
                        _textF.text = ',';
                    }
                    if (i == 1) {
                        _textF.text = this._uScore.substr(0, 1);
                    }
                    if (i == 2) {
                        _textF.text = this._uScore.substr(1, 1);
                    }
                    if (i == 3) {
                        _textF.text = this._uScore.substr(2, 1);
                    }
                    if (i == 5) {
                        _textF.text = this._uScore.substr(3, 1);
                    }
                    if (i == 6) {
                        _textF.text = this._uScore.substr(4, 1);
                    }
                    if (i == 7) {
                        _textF.text = this._uScore.substr(5, 1);
                    }
                    this.scoreText.addChild(_textF);
                }
                break;
        }
    };
    // 从未注册切换到已注册时，把注册按钮换掉
    p.hideSignBtn = function () {
        this.btnSignUp.visible = false;
        this.btnUploadScore.visible = true;
    };
    return SuccessGame;
})(egret.Sprite);
egret.registerClass(SuccessGame,"SuccessGame");
