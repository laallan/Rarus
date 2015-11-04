var MainGameingScreen = (function (_super) {
    __extends(MainGameingScreen, _super);
    function MainGameingScreen(w, h, rate) {
        _super.call(this);
        this._resoucePrefix = 'game_';
        this._minPosY = -70;
        this._maxPosY = 70;
        // private _t: egret.TextField;
        // 当前新增id, 取名用
        this.objId = 1;
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this._maxW = this._iW - this._scaleRate * 46 - this._scaleRate * 42;
        this._maxH = this._iH - this._scaleRate * 44;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=MainGameingScreen;p=c.prototype;
    p.onAddToStage = function (evt) {
        this.objContainer = new egret.Sprite();
        this.objContainer.x = this._scaleRate * 46;
        this.objContainer.y = this._scaleRate * 44;
        this.addChild(this.objContainer);
        this.banContainer = new egret.Sprite();
        this.banContainer.x = this._scaleRate * 46;
        this.banContainer.y = this._iH - this._scaleRate * 170;
        this.banContainer.scaleX = this.banContainer.scaleY = this._scaleRate;
        this.addChild(this.banContainer);
        this.banBg = new egret.Bitmap(RES.getRes(this._resoucePrefix + "banBg"));
        this.banContainer.addChild(this.banBg);
        this.banCTW = this.banBg.width * this._scaleRate;
        this.banCTH = this.banBg.height * this._scaleRate;
        this._minBanX = this._scaleRate * 46;
        this._maxBanX = this._iW - this._scaleRate * 42 - this.banBg.width * this._scaleRate;
        /*
        this._t = new egret.TextField();
        this._t.fontFamily = "Arial";
        this._t.textColor = 0xFFFFFF;
        this._t.size = 30;
        this._t.text = '0';
        this.addChild( this._t );
        */
        this.iOrientation = new egret.DeviceOrientation();
        this.iOrientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        // this.iOrientation.start();
    };
    // ban X 移动公式
    p.xRate = function (_posY) {
        return _posY * ((this._maxBanX - this._minBanX) / (this._maxPosY - this._minPosY)) + (this._maxBanX - this._minBanX) * .5 + this._minBanX;
    };
    // 判断手机倾斜
    p.onOrientation = function (evt) {
        if (evt.gamma < this._minPosY) {
            // this._t.text = String( this.xRate( this._minPosY ) );
            this.banContainer.x = this.xRate(this._minPosY);
        }
        else if (evt.gamma > this._maxPosY) {
            // this._t.text = String( this.xRate( this._maxPosY ) );
            this.banContainer.x = this.xRate(this._maxPosY);
        }
        else {
            // this._t.text = String( this.xRate( evt.gamma ) );
            this.banContainer.x = this.xRate(evt.gamma);
        }
    };
    // 生成物体
    p.createPerObj = function (evt) {
        // 设置一个随机数来限制金桶的出现
        var randType = Math.ceil(Math.random() * 20);
        // 再设置个随机数限制怪物的出现
        var randMonster = Math.ceil(Math.random() * 15);
        // 设置随机速度
        var randSpeed = (Math.round(Math.random() * 3) + 2) * 1000;
        var perObj;
        // 生成一个范围为2的随机数，来确定到底加载黑桶还是红桶
        function getRandType2() {
            var _rand = Math.ceil(Math.random() * 2);
            return _rand;
        }
        if (randType == 4) {
            perObj = new Obj_GoldT(this._scaleRate);
            perObj.tId = "G";
            perObj.offsets = this._scaleRate * 42;
        }
        else {
            if (randMonster == 1 || randMonster == 5 || randMonster == 10 || randMonster == 15) {
                perObj = new Obj_BadT(this._scaleRate);
                perObj.tId = "A";
                perObj.offsets = this._scaleRate * 14;
            }
            else {
                switch (getRandType2()) {
                    case 1:
                        perObj = new Obj_BlackT(this._scaleRate);
                        perObj.tId = "B";
                        // 用于判断碰撞的位置，用当前的y + - 这个值，因为有个外发光的原因，所以要判断这个值
                        perObj.offsets = this._scaleRate * 18;
                        break;
                    case 2:
                        perObj = new Obj_RedT(this._scaleRate);
                        perObj.tId = "R";
                        perObj.offsets = this._scaleRate * 24;
                        break;
                }
            }
        }
        perObj.name = 'perObj' + this.objId;
        this.objContainer.addChild(perObj);
        perObj.x = Math.round(Math.random() * (this._maxW - perObj.width));
        // 到底部的时候destory自己
        egret.Tween.get(perObj, { onChange: checkHit, onChangeObj: this }).to({ y: this._maxH }, randSpeed).call(destoryIt, this, [perObj]);
        function destoryIt(obj) {
            egret.Tween.removeTweens(obj);
            this.objContainer.removeChild(obj);
            obj = null;
        }
        // 判断碰撞
        function checkHit() {
            if (this.objContainer.y + perObj.y >= this.banContainer.y - (perObj.height - perObj.offsets) && this.objContainer.y + perObj.y <= this.banContainer.y + this.banCTH * .75 - perObj.offsets) {
                if (this.objContainer.x + perObj.x >= this.banContainer.x - (perObj.width - perObj.offsets) && this.objContainer.x + perObj.x <= this.banContainer.x + this.banCTW - perObj.offsets) {
                    egret.Tween.removeTweens(perObj);
                    perObj.hideState();
                    switch (perObj.tId) {
                        case 'G':
                            this.addTipS('tip1');
                            this.dispatchEvent(new egret.Event('doAdd5Time', true));
                            break;
                        case 'B':
                            this.addTipS('tip5');
                            this.dispatchEvent(new egret.Event('add200Score', true));
                            break;
                        case 'R':
                            this.addTipS('tip4');
                            this.dispatchEvent(new egret.Event('add400Score', true));
                            break;
                        case 'A':
                            this.addTipS('tip2');
                            this.dispatchEvent(new egret.Event('doMinus10Time', true));
                            break;
                    }
                }
            }
        }
        this.objId++;
    };
    // 显示碰撞后的奖励或惩罚
    p.addTipS = function (_t) {
        var tips = new egret.Bitmap(RES.getRes(this._resoucePrefix + _t));
        tips.alpha = 0;
        tips.y = -80;
        this.banContainer.addChild(tips);
        egret.Tween.get(tips).to({ alpha: 1, y: -100 }, 250).wait(150).to({ alpha: 0, y: -120 }, 250).call(removeTip, this, [tips]);
        function removeTip(obj) {
            egret.Tween.removeTweens(obj);
            this.banContainer.removeChild(obj);
            obj = null;
        }
    };
    // 倒计时3个数开始, 共4秒
    p.useCountdown = function () {
        var _count = 3;
        var _tCount = new egret.Bitmap();
        _tCount.texture = RES.getRes(this._resoucePrefix + 'num1');
        _tCount.anchorOffsetX = _tCount.width * .5;
        _tCount.anchorOffsetY = _tCount.height * .5;
        _tCount.scaleX = _tCount.scaleY = this._scaleRate;
        _tCount.x = this._iW * .5;
        _tCount.y = this._iH * .5;
        var _goCount = new egret.Bitmap();
        _goCount.texture = RES.getRes(this._resoucePrefix + 'num4');
        _goCount.anchorOffsetX = _goCount.width * .5;
        _goCount.anchorOffsetY = _goCount.height * .5;
        _goCount.scaleX = _goCount.scaleY = this._scaleRate;
        _goCount.x = this._iW * .5;
        _goCount.y = this._iH * .5;
        this.addChild(_tCount);
        egret.setTimeout(changeCount, this, 1000);
        function changeCount() {
            _count--;
            if (_count > 1) {
                _tCount.texture = RES.getRes(this._resoucePrefix + 'num2');
                egret.setTimeout(changeCount, this, 1000);
            }
            else {
                _tCount.texture = RES.getRes(this._resoucePrefix + 'num3');
                egret.setTimeout(changeCount2, this, 1000);
            }
        }
        function changeCount2() {
            this.removeChild(_tCount);
            _tCount = null;
            this.addChild(_goCount);
            egret.setTimeout(removeCount2, this, 1000);
        }
        function removeCount2() {
            this.removeChild(_goCount);
            _goCount = null;
        }
    };
    // 第一次进入时开启游戏
    p.newGame = function () {
        this.gameState = 'playing';
        this.dispatchEvent(new egret.Event('disableBtns', true));
        this.useCountdown();
        // 延时4秒执行一个每1秒触发的timer，实际开始时间给了5秒，比倒计时多给了1秒
        egret.setTimeout(function () {
            this.createObjTimer = new egret.Timer(300, 0);
            this.createObjTimer.addEventListener(egret.TimerEvent.TIMER, this.createPerObj, this);
            this.createObjTimer.start();
            this.dispatchEvent(new egret.Event('doMinusTime', true));
            this.dispatchEvent(new egret.Event('enableBtns', true));
            this.iOrientation.start();
        }, this, 4000);
    };
    // 重新开始
    p.restartGame = function () {
        this.gameState = 'playing';
        this.dispatchEvent(new egret.Event('disableBtns', true));
        this.useCountdown();
        this.objId = 1;
        // 延时4秒执行一个每1秒触发的timer
        egret.setTimeout(function () {
            this.createObjTimer.reset();
            this.createObjTimer.start();
            this.dispatchEvent(new egret.Event('reDoMinusTime', true));
            this.dispatchEvent(new egret.Event('enableBtns', true));
            this.iOrientation.start();
        }, this, 4000);
    };
    // 结束游戏
    p.stopGame = function () {
        this.gameState = 'stopping';
        this.iOrientation.stop();
        this.createObjTimer.stop();
        for (var i = this.objId; i >= this.objId - 10; i--) {
            var _obj = this.objContainer.getChildByName('perObj' + i);
            if (_obj) {
                _obj.dispatchEvent(new egret.Event('doRemoveTopAnim', true));
                egret.Tween.removeTweens(_obj);
                this.objContainer.removeChild(_obj);
                _obj = null;
            }
        }
    };
    // 暂停
    p.pauseGame = function () {
        this.gameState = 'pausing';
        this.iOrientation.stop();
        this.createObjTimer.stop();
        for (var i = this.objId; i >= this.objId - 10; i--) {
            var _obj = this.objContainer.getChildByName('perObj' + i);
            if (_obj) {
                _obj.dispatchEvent(new egret.Event('doPauseTopAnim', true));
                egret.Tween.pauseTweens(_obj);
            }
        }
    };
    // 暂停后开启
    p.resumeGame = function () {
        this.gameState = 'playing';
        this.dispatchEvent(new egret.Event('disableBtns', true));
        this.useCountdown();
        // 此处只给了4秒延时执行和倒计时完毕同步
        egret.setTimeout(function () {
            this.createObjTimer.start();
            for (var i = this.objId; i >= this.objId - 10; i--) {
                var _obj = this.objContainer.getChildByName('perObj' + i);
                if (_obj) {
                    _obj.dispatchEvent(new egret.Event('doResumeTopAnim', true));
                    egret.Tween.resumeTweens(_obj);
                }
            }
            this.dispatchEvent(new egret.Event('enableBtns', true));
            this.iOrientation.start();
        }, this, 4000);
    };
    return MainGameingScreen;
})(egret.Sprite);
egret.registerClass(MainGameingScreen,"MainGameingScreen");
