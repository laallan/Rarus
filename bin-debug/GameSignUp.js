var GameSignUp = (function (_super) {
    __extends(GameSignUp, _super);
    function GameSignUp(w, h, rate, sc) {
        _super.call(this);
        this._resoucePrefix = 'signup_';
        this.companyTypeArray = ['设备制造商', '设备用户', '贸易商', '设备维护/服务公司', '其他'];
        this.companyTypeAreaArray = ['风电行业', '电力行业', '矿山行业', '油气勘探开发', '机加工行业', '工程机械行业', '钢铁行业', '水泥行业', '造纸行业', '塑料行业', '食品行业', '其他'];
        // 发送的信息
        this.userId = '';
        this.userName = '';
        this.compName = '';
        this.compType = '';
        this.compArea = '';
        this.userEmail = '';
        this.userPhone = '';
        this.allowEmail = '1';
        this.userScore = '';
        this.sendScoreUrl = 'ajax.php?flg=1';
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this.userScore = sc;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var d = __define,c=GameSignUp;p=c.prototype;
    p.onAddToStage = function (evt) {
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp6" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        this.addBlackBg();
        this.addTitle();
        this.addBtns();
        this.addFormObjects();
    };
    p.removeFromStage = function (evt) {
        this.removeChild(this.alphaBlack);
        this.alphaBlack = null;
        this.topTitleContainer.removeChild(this.topTitle);
        this.topTitle = null;
        this.removeChild(this.topTitleContainer);
        this.topTitleContainer = null;
        this.formContainer.removeChildren();
        this.removeChild(this.formContainer);
        this.formContainer = null;
        this.btnContainer.removeChildren();
        this.removeChild(this.btnContainer);
        this.btnContainer = null;
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
    p.addTitle = function () {
        this.topTitleContainer = new egret.DisplayObjectContainer();
        this.topTitleContainer.scaleX = this.topTitleContainer.scaleY = this._scaleRate;
        this.addChild(this.topTitleContainer);
        this.topTitle = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'top'));
        this.topTitle.y = 6;
        this.topTitleContainer.addChild(this.topTitle);
    };
    p.addBtns = function () {
        this.btnContainer = new egret.Sprite();
        this.btnContainer.scaleX = this.btnContainer.scaleY = this._scaleRate;
        this.btnContainer.y = this._iH;
        this.addChild(this.btnContainer);
        this.backBtn = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'back_Init'));
        this.backBtn.x = 12;
        this.backBtn.y = -190;
        this.btnContainer.addChild(this.backBtn);
        this.backBtn.touchEnabled = true;
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onBackOver, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_END, onBackOut, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBackTap, this);
        function onBackOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + 'back_Over');
        }
        function onBackOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + 'back_Init');
        }
        this.signBtn = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'Init'));
        this.signBtn.x = 302;
        this.signBtn.y = -168;
        this.btnContainer.addChild(this.signBtn);
        this.signBtn.touchEnabled = true;
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onSignOver, this);
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_END, onSignOut, this);
        this.signBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSignTap, this);
        function onSignOver(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + 'Over');
        }
        function onSignOut(evt) {
            evt.currentTarget.texture = RES.getRes(this._resoucePrefix + 'Init');
        }
        this.signInfo = new egret.TextField();
        this.signInfo.fontFamily = 'SimHei';
        this.signInfo.textColor = 0x7D7D7D;
        this.signInfo.size = 21;
        this.signInfo.lineSpacing = 9;
        this.signInfo.text = '*埃克森美孚工业润滑油市场部保留最终解释权\n*奖品以实物为准';
        this.signInfo.x = 90;
        this.signInfo.y = -62;
        this.btnContainer.addChild(this.signInfo);
    };
    p.onBackTap = function (evt) {
        this.dispatchEvent(new egret.Event('backToSuccess', true));
    };
    p.onSignTap = function (evt) {
        if (this.nameText.text == '') {
            alert('请输入你的姓名');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        if (this.companyNameText.text == '') {
            alert('请输入你的公司名称');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        if (this.companyTypeText.text == '请选择') {
            alert('请选择你的公司性质');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        if (this.companyTypeAreaText.text == '请选择') {
            alert('请选择你的所属行业');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        if (this.emailText.text == '') {
            alert('请输入你的邮箱地址');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        else {
            var regEx = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (regEx.test(this.emailText.text) == false) {
                alert('请输入正确的邮箱地址');
                this.signBtn.touchEnabled = false;
                egret.setTimeout(function () {
                    this.signBtn.touchEnabled = true;
                }, this, 1000);
                return;
            }
        }
        if (this.phoneText.text == '') {
            alert('请输入你的电话号码');
            this.signBtn.touchEnabled = false;
            egret.setTimeout(function () {
                this.signBtn.touchEnabled = true;
            }, this, 1000);
            return;
        }
        this.userName = this.nameText.text;
        this.compName = this.companyNameText.text;
        this.compType = this.companyTypeText.text;
        this.compArea = this.companyTypeAreaText.text;
        this.userEmail = this.emailText.text;
        this.userPhone = this.phoneText.text;
        this.sendInfo();
    };
    p.addFormObjects = function () {
        this.formContainer = new egret.DisplayObjectContainer();
        this.formContainer.scaleX = this.formContainer.scaleY = this._scaleRate;
        this.addChild(this.formContainer);
        this.formBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'bg'));
        this.formBg.y = 20;
        this.formContainer.addChild(this.formBg);
        this.formContainer.anchorOffsetY = this.formContainer.height * .5;
        this.formContainer.y = this._iH * .5;
        this.allowInfoText = new egret.TextField();
        this.allowInfoText.fontFamily = 'SimHei';
        this.allowInfoText.size = 21;
        this.allowInfoText.stroke = 3;
        this.allowInfoText.strokeColor = 0x140407;
        this.allowInfoText.lineSpacing = 13;
        this.allowInfoText.text = '我愿意收到来自埃克森美孚的产品,服务.促销或者活动信息。\n不谢谢';
        this.allowInfoText.x = 62;
        this.allowInfoText.y = 580;
        this.formContainer.addChild(this.allowInfoText);
        // 名字
        this.nameText = new egret.TextField();
        this.nameText.type = 'input';
        this.nameText.fontFamily = 'SimHei';
        this.nameText.size = 28;
        this.nameText.verticalAlign = 'middle';
        this.nameText.width = 270;
        this.nameText.height = 48;
        this.nameText.x = 250;
        this.nameText.y = 46;
        this.formContainer.addChild(this.nameText);
        // 公司名
        this.companyNameText = new egret.TextField();
        this.companyNameText.type = 'input';
        this.companyNameText.fontFamily = 'SimHei';
        this.companyNameText.size = 28;
        this.companyNameText.verticalAlign = 'middle';
        this.companyNameText.width = 270;
        this.companyNameText.height = 48;
        this.companyNameText.x = 250;
        this.companyNameText.y = 128;
        this.formContainer.addChild(this.companyNameText);
        // 公司性质
        this.companyTypeText = new egret.TextField();
        this.companyTypeText.fontFamily = 'SimHei';
        this.companyTypeText.size = 28;
        this.companyTypeText.text = '请选择';
        this.companyTypeText.verticalAlign = 'middle';
        this.companyTypeText.height = 48;
        this.companyTypeText.x = 250;
        this.companyTypeText.y = 210;
        this.formContainer.addChild(this.companyTypeText);
        this.companyTypeBtn = new egret.Shape();
        this.companyTypeBtn.graphics.beginFill(0xFF0000);
        this.companyTypeBtn.graphics.drawRect(94, 210, 454, 48);
        this.companyTypeBtn.graphics.endFill();
        this.companyTypeBtn.alpha = 0;
        this.formContainer.addChild(this.companyTypeBtn);
        this.companyTypeBtn.touchEnabled = true;
        this.companyTypeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCompTypeTap, this);
        // 所属行业
        this.companyTypeAreaText = new egret.TextField();
        this.companyTypeAreaText.fontFamily = 'SimHei';
        this.companyTypeAreaText.size = 28;
        this.companyTypeAreaText.text = '请选择';
        this.companyTypeAreaText.verticalAlign = 'middle';
        this.companyTypeAreaText.height = 48;
        this.companyTypeAreaText.x = 250;
        this.companyTypeAreaText.y = 292;
        this.formContainer.addChild(this.companyTypeAreaText);
        this.companyTypeAreaBtn = new egret.Shape();
        this.companyTypeAreaBtn.graphics.beginFill(0xFF0000);
        this.companyTypeAreaBtn.graphics.drawRect(94, 292, 454, 48);
        this.companyTypeAreaBtn.graphics.endFill();
        this.companyTypeAreaBtn.alpha = 0;
        this.formContainer.addChild(this.companyTypeAreaBtn);
        this.companyTypeAreaBtn.touchEnabled = true;
        this.companyTypeAreaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectCompTypeAreaTap, this);
        // 邮箱
        this.emailText = new egret.TextField();
        this.emailText.type = 'input';
        this.emailText.fontFamily = 'Arial';
        this.emailText.size = 28;
        this.emailText.verticalAlign = 'middle';
        this.emailText.width = 270;
        this.emailText.height = 48;
        this.emailText.x = 250;
        this.emailText.y = 374;
        this.formContainer.addChild(this.emailText);
        // 手机
        this.phoneText = new egret.TextField();
        this.phoneText.type = 'input';
        this.phoneText.fontFamily = 'Arial';
        this.phoneText.size = 28;
        this.phoneText.restrict = "0-9";
        this.phoneText.verticalAlign = 'middle';
        this.phoneText.width = 270;
        this.phoneText.height = 48;
        this.phoneText.x = 250;
        this.phoneText.y = 456;
        this.formContainer.addChild(this.phoneText);
        this.allowPoint = new egret.Bitmap(RES.getRes(this._resoucePrefix + 'point'));
        this.allowPoint.x = 34;
        this.allowPoint.y = 582;
        this.formContainer.addChild(this.allowPoint);
        // point select
        this.allowPointBtn_1 = new egret.Shape();
        this.allowPointBtn_1.name = 'allowTrue';
        this.allowPointBtn_1.graphics.beginFill(0xFF0000);
        this.allowPointBtn_1.graphics.drawRect(0, 576, 640, 32);
        this.allowPointBtn_1.graphics.endFill();
        this.allowPointBtn_1.alpha = 0;
        this.formContainer.addChild(this.allowPointBtn_1);
        this.allowPointBtn_1.touchEnabled = true;
        this.allowPointBtn_2 = new egret.Shape();
        this.allowPointBtn_2.name = 'allowFalse';
        this.allowPointBtn_2.graphics.beginFill(0xFF0000);
        this.allowPointBtn_2.graphics.drawRect(0, 607, 640, 32);
        this.allowPointBtn_2.graphics.endFill();
        this.allowPointBtn_2.alpha = 0;
        this.formContainer.addChild(this.allowPointBtn_2);
        this.allowPointBtn_2.touchEnabled = true;
        this.allowPointBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeAllow, this);
        this.allowPointBtn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeAllow, this);
        // 公司性质选择列表
        this.companyTypeSelectCT = new egret.DisplayObjectContainer();
        this.companyTypeSelectCT.x = 0;
        this.companyTypeSelectCT.visible = false;
        this.formContainer.addChild(this.companyTypeSelectCT);
        this.companyTypeSelectBg = new egret.Shape();
        this.companyTypeSelectBg.graphics.beginFill(0x000000);
        this.companyTypeSelectBg.graphics.drawRect(0, -500, 640, 1500);
        this.companyTypeSelectBg.graphics.endFill();
        this.companyTypeSelectCT.addChild(this.companyTypeSelectBg);
        this.companyTypeSelectBg.touchEnabled = true;
        for (var i = 1; i <= 5; i++) {
            var companyType_perBg = new egret.Shape();
            companyType_perBg.name = 'compType_' + i;
            companyType_perBg.graphics.beginFill(0x0A0A0A);
            companyType_perBg.graphics.drawRect(0, 0, 640, 70);
            companyType_perBg.graphics.endFill();
            companyType_perBg.y = 70 * (i - 1) + 116;
            this.companyTypeSelectCT.addChild(companyType_perBg);
            companyType_perBg.touchEnabled = true;
            companyType_perBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTypeBtnOver, this);
            companyType_perBg.addEventListener(egret.TouchEvent.TOUCH_END, onTypeBtnOut, this);
            companyType_perBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTypeTap, this);
            var companyType_perText = new egret.TextField();
            companyType_perText.name = 'companyType_' + i + 'Text';
            companyType_perText.fontFamily = "SimHei";
            companyType_perText.size = 32;
            companyType_perText.text = this.companyTypeArray[i - 1];
            companyType_perText.height = 70;
            companyType_perText.x = 30;
            companyType_perText.y = 70 * (i - 1) + 116;
            companyType_perText.verticalAlign = 'middle';
            this.companyTypeSelectCT.addChild(companyType_perText);
        }
        function onTypeBtnOver(evt) {
            evt.currentTarget.graphics.beginFill(0x333333);
            evt.currentTarget.graphics.drawRect(0, 0, 640, 70);
            evt.currentTarget.graphics.endFill();
        }
        function onTypeBtnOut(evt) {
            evt.currentTarget.graphics.beginFill(0x0A0A0A);
            evt.currentTarget.graphics.drawRect(0, 0, 640, 70);
            evt.currentTarget.graphics.endFill();
        }
        // 所属行业选择列表
        this.companyTypeAreaCT = new egret.DisplayObjectContainer();
        this.companyTypeAreaCT.x = 0;
        this.companyTypeAreaCT.visible = false;
        this.formContainer.addChild(this.companyTypeAreaCT);
        this.companyTypeAreaBg = new egret.Shape();
        this.companyTypeAreaBg.graphics.beginFill(0x000000);
        this.companyTypeAreaBg.graphics.drawRect(0, -500, 640, 1500);
        this.companyTypeAreaBg.graphics.endFill();
        this.companyTypeAreaCT.addChild(this.companyTypeAreaBg);
        this.companyTypeAreaBg.touchEnabled = true;
        for (var i = 1; i <= 12; i++) {
            var companyArea_perBg = new egret.Shape();
            companyArea_perBg.name = 'compArea_' + i;
            companyArea_perBg.graphics.beginFill(0x0A0A0A);
            companyArea_perBg.graphics.drawRect(0, 0, 640, 70);
            companyArea_perBg.graphics.endFill();
            companyArea_perBg.y = 70 * (i - 1) - 130;
            this.companyTypeAreaCT.addChild(companyArea_perBg);
            companyArea_perBg.touchEnabled = true;
            companyArea_perBg.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onAreaBtnOver, this);
            companyArea_perBg.addEventListener(egret.TouchEvent.TOUCH_END, onAreaBtnOut, this);
            companyArea_perBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAreaTap, this);
            var companyArea_perText = new egret.TextField();
            companyArea_perText.name = 'companyArea_' + i + 'Text';
            companyArea_perText.fontFamily = "SimHei";
            companyArea_perText.size = 32;
            companyArea_perText.text = this.companyTypeAreaArray[i - 1];
            companyArea_perText.height = 70;
            companyArea_perText.x = 30;
            companyArea_perText.y = 70 * (i - 1) - 130;
            companyArea_perText.verticalAlign = 'middle';
            this.companyTypeAreaCT.addChild(companyArea_perText);
        }
        function onAreaBtnOver(evt) {
            evt.currentTarget.graphics.beginFill(0x333333);
            evt.currentTarget.graphics.drawRect(0, 0, 640, 70);
            evt.currentTarget.graphics.endFill();
        }
        function onAreaBtnOut(evt) {
            evt.currentTarget.graphics.beginFill(0x0A0A0A);
            evt.currentTarget.graphics.drawRect(0, 0, 640, 70);
            evt.currentTarget.graphics.endFill();
        }
    };
    // 所有按钮事件
    p.selectCompTypeTap = function (evt) {
        this.companyTypeSelectCT.visible = true;
    };
    p.selectCompTypeAreaTap = function (evt) {
        this.companyTypeAreaCT.visible = true;
    };
    p.changeAllow = function (evt) {
        if (evt.currentTarget.name == 'allowTrue') {
            if (this.allowEmail == '0')
                this.allowEmail = '1';
            this.allowPoint.y = 582;
        }
        else {
            if (this.allowEmail == '1')
                this.allowEmail = '0';
            this.allowPoint.y = 616;
        }
    };
    p.onTypeTap = function (evt) {
        var nid = Number(evt.currentTarget.name.substr(9, evt.currentTarget.name.length - 9)) - 1;
        this.companyTypeText.text = this.companyTypeArray[nid];
        this.companyTypeSelectCT.visible = false;
    };
    p.onAreaTap = function (evt) {
        var nid = Number(evt.currentTarget.name.substr(9, evt.currentTarget.name.length - 9)) - 1;
        this.companyTypeAreaText.text = this.companyTypeAreaArray[nid];
        this.companyTypeAreaCT.visible = false;
    };
    // 发送注册信息
    p.sendInfo = function () {
        this.backBtn.touchEnabled = false;
        this.signBtn.touchEnabled = false;
        this.sendInfoLoader = new egret.URLLoader();
        this.sendInfoLoader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        this.sendInfoLoader.addEventListener(egret.Event.COMPLETE, this.checkHandle, this);
        this.sendInfoLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.checkHandle, this);
        this.sendInfoRequest = new egret.URLRequest(this.sendScoreUrl + '&rand=' + Math.round(Math.random() * 1000));
        this.sendInfoRequest.method = egret.URLRequestMethod.POST;
        // console.log( 'userName=' + this.userName + '&companyName=' + this.compName + '&companyNature=' + this.compType + '&industry=' + this.compArea + '&email=' + this.userEmail + '&phone=' + this.userPhone + '&allowEmail=' + this.allowEmail + '&score=' + this.userScore );
        this.sendInfoVariables = new egret.URLVariables('userName=' + this.userName + '&companyName=' + this.compName + '&companyNature=' + this.compType + '&industry=' + this.compArea + '&email=' + this.userEmail + '&phone=' + this.userPhone + '&allowEmail=' + this.allowEmail + '&score=' + this.userScore);
        this.sendInfoRequest.data = this.sendInfoVariables;
        this.sendInfoLoader.load(this.sendInfoRequest);
    };
    p.checkHandle = function (evt) {
        this.sendInfoLoader.removeEventListener(egret.Event.COMPLETE, this.checkHandle, this);
        this.sendInfoLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.checkHandle, this);
        this.backBtn.touchEnabled = true;
        this.signBtn.touchEnabled = true;
        switch (evt.type) {
            case egret.Event.COMPLETE:
                if (evt.currentTarget.data > 0) {
                    this.userId = evt.currentTarget.data;
                    this.dispatchEvent(new egret.Event('signSuccess', true));
                }
                else {
                    alert('注册失败');
                    this.signBtn.touchEnabled = false;
                    egret.setTimeout(function () {
                        this.signBtn.touchEnabled = true;
                    }, this, 1000);
                }
                break;
            case egret.IOErrorEvent.IO_ERROR:
                alert('网络连接错误');
                break;
        }
    };
    return GameSignUp;
})(egret.DisplayObjectContainer);
egret.registerClass(GameSignUp,"GameSignUp");
