class Gameing extends egret.Sprite {
    private _iW: number;
    private _iH: number;
    private _scaleRate: number;
    
    private _resoucePrefix: string = 'game_';
    
    private mainGameScreen: MainGameingScreen;
    
    private timeBar: egret.Sprite;
        private timeBarPart: egret.Bitmap;
        private scoreBar: egret.Sprite;
            private scoreText: egret.TextField;
            private scoreBarBg: egret.Bitmap;
        private timeBarBg: egret.Bitmap;
        private timeBarHaveTime: egret.Bitmap;
        private timeBarHaveTimeMask: egret.Shape;
        
    private btnBar: egret.Sprite;
        private blackBg: egret.Shape;
        private restartBtn: egret.Bitmap;
            private restartBtnMask: egret.Shape;
        private ruleBtn: egret.Bitmap;
            private ruleBtnMask: egret.Shape;
        private cancelBtn: egret.Bitmap;
        
    private allTimers: number = 60;
    public allScores: number = 0;
    
    private checkTimer: egret.Timer;

    public constructor( w: number, h: number, rate: number ) {
        super();
                
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
                        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    private onAddToStage( evt: egret.Event ) {
        
        /*
        if (DEBUG) {
            var _tempBg: egret.Bitmap = new egret.Bitmap( RES.getRes( "_temp2" ) );
            _tempBg.width = this._scaleRate * 640;
            _tempBg.height = this._scaleRate * 958;
            this.addChild( _tempBg );
        }
        */
        
        this.addMainGameSrceen();

        this.addTimeBar();

        this.addBtns();
        
        this.introTimeBar();

        this.checkTimer = new egret.Timer( 1000, 0 );
        this.checkTimer.addEventListener( egret.TimerEvent.TIMER, this.minusTimer, this );
        
        // 监听屏蔽按钮，主要用在倒计时的时候不让点击 | MainGamingScreen |
        this.addEventListener( 'disableBtns', this.disableBtns, this );
        // 监听解放按钮 | MainGamingScreen |
        this.addEventListener( 'enableBtns', this.enableBtns, this );
        
        // 监听倒计时完成后，才开始减少时间 | MainGamingScreen |
        this.addEventListener( 'doMinusTime', this.startCheckTime, this );
        // 监听重新开始游戏时，重新计时 | MainGamingScreen |
        this.addEventListener( 'reDoMinusTime', this.reStartCheckTime, this );
        
        // 监听游戏中减少10秒触发 | MainGamingScreen |
        this.addEventListener( 'doMinus10Time', this.minus10Timer, this );
        // 监听游戏中增加5秒触发 | MainGamingScreen |
        this.addEventListener( 'doAdd5Time', this.add5Timer, this );
        // 监听游戏中增加200分触发 | MainGamingScreen |
        this.addEventListener( 'add200Score', this.addScore200, this );
        // 监听游戏中增加400分触发 | MainGamingScreen |
        this.addEventListener( 'add400Score', this.addScore400, this );
        
        // 监听从暂停中恢复 | Main |
        this.addEventListener( 'gamePauseResume', this.pauseResume, this );
    }
    
    // 设定每次减少一格的时间段
    private getTimerMaskW(): number {
        if ( this.allTimers > 56 ) return 503;
        if ( this.allTimers <= 56 && this.allTimers > 53 ) return 481;
        if ( this.allTimers <= 53 && this.allTimers > 50 ) return 454;
        if ( this.allTimers <= 50 && this.allTimers > 47 ) return 427;
        if ( this.allTimers <= 47 && this.allTimers > 44 ) return 400;
        if ( this.allTimers <= 44 && this.allTimers > 41 ) return 373;
        if ( this.allTimers <= 41 && this.allTimers > 38 ) return 346;
        if ( this.allTimers <= 38 && this.allTimers > 35 ) return 319;
        if ( this.allTimers <= 35 && this.allTimers > 32 ) return 292;
        if ( this.allTimers <= 32 && this.allTimers > 29 ) return 265;
        if ( this.allTimers <= 29 && this.allTimers > 26 ) return 238;
        if ( this.allTimers <= 26 && this.allTimers > 23 ) return 211;
        if ( this.allTimers <= 23 && this.allTimers > 20 ) return 184;
        if ( this.allTimers <= 20 && this.allTimers > 17 ) return 157;
        if ( this.allTimers <= 17 && this.allTimers > 14 ) return 130;
        if ( this.allTimers <= 14 && this.allTimers > 11 ) return 103;
        if ( this.allTimers <= 11 && this.allTimers > 8 ) return 76;
        if ( this.allTimers <= 8 && this.allTimers > 5 ) return 49;
        if ( this.allTimers <= 5 && this.allTimers > 0 ) return 22;
        if ( this.allTimers == 0 ) return 0;
    }
    
    // 时间少于20秒时闪烁
    private warningTime(): void {
        egret.Tween.get( this.timeBarHaveTime, { loop: true } )
        .to( { alpha: 0.5 }, 150 )
        .to( { alpha: 1 }, 150 );
    }
    
    // 加载主游戏容器
    private addMainGameSrceen(): void {
        this.mainGameScreen = new MainGameingScreen( this._iW, this._iH, this._scaleRate );
        this.addChild( this.mainGameScreen );
    }
        
    // 加载时间条
    private addTimeBar(): void {
        // 时间条集
        this.timeBar = new egret.Sprite();
        this.timeBar.name = 'timeBar';
        this.timeBar.scaleX = this.timeBar.scaleY = this._scaleRate;        
        this.addChild( this.timeBar );
        // scoreBar
        this.scoreBar = new egret.Sprite();
        this.scoreBar.name = 'scoreBar';
        this.scoreBarBg = new egret.Bitmap( RES.getRes( this._resoucePrefix + "scoreBar" ) );
        this.scoreBar.addChild( this.scoreBarBg );
        this.scoreBar.anchorOffsetY = this.scoreBar.height;
        this.scoreBar.x = 100;
        this.scoreBar.y = 112 + this.scoreBar.height;
                    
        this.scoreText = new egret.TextField();
        this.scoreText.fontFamily = "Arial";
        this.scoreText.bold = true;
        this.scoreText.textColor = 0xFFFFFF;
        this.scoreText.size = 54;
        this.scoreText.stroke = 3;
        this.scoreText.strokeColor = 0x001D3A;
        this.scoreText.x = 150;
        this.scoreText.y = 28;
        this.scoreText.text = '000,000,00';
        this.scoreBar.addChild( this.scoreText );
                    
        this.scoreBar.rotation = 60;
        this.scoreBar.alpha = 0;
        this.timeBar.addChild( this.scoreBar );
        
        // timeBar下的弯钩
        this.timeBarPart = new egret.Bitmap( RES.getRes( this._resoucePrefix + "timeBarPart" ) );
        this.timeBarPart.x = 74;
        this.timeBarPart.y = 110;
                    
        this.timeBarPart.rotation = 180;
        this.timeBarPart.alpha = 0;
        this.timeBar.addChild( this.timeBarPart );
                    
        // timeBar下的time显示背景景
        this.timeBarBg = new egret.Bitmap( RES.getRes( this._resoucePrefix + "timeBarBg" ) );
        this.timeBarBg.x = 54;
        this.timeBarBg.y = 6 + 20;
        this.timeBarBg.alpha = 0;
        this.timeBar.addChild( this.timeBarBg );
                    
        // timeBar下的time显示
        this.timeBarHaveTime = new egret.Bitmap( RES.getRes( this._resoucePrefix + "timeBarTime" ) );
        this.timeBarHaveTime.x = 54;
        this.timeBarHaveTime.y = 6;
        this.timeBar.addChild( this.timeBarHaveTime );
                    
        // timerBar下time mask
        this.timeBarHaveTimeMask = new egret.Shape();
        this.timeBarHaveTimeMask.graphics.beginFill( 0xFF0000 );
        this.timeBarHaveTimeMask.graphics.drawRect( this.timeBarHaveTime.x + 14, this.timeBarHaveTime.y, this.timeBarHaveTime.width - 28, this.timeBarHaveTime.height );
        this.timeBarHaveTimeMask.graphics.endFill();
        this.timeBarHaveTimeMask.anchorOffsetX = this.timeBarHaveTime.x + 14;
        this.timeBarHaveTimeMask.x = this.timeBarHaveTime.x + 14;
        this.timeBarHaveTimeMask.scaleX = 0;
        this.timeBar.addChild( this.timeBarHaveTimeMask );
                    
        this.timeBarHaveTime.mask = this.timeBarHaveTimeMask;
    }
        
    // 加载按钮集
    private addBtns(): void {
        this.btnBar = new egret.Sprite();
        this.btnBar.name = 'btnBar';
        this.btnBar.anchorOffsetY = 58;
        this.btnBar.scaleX = this.btnBar.scaleY = this._scaleRate;
        this.btnBar.y = this._iH;
        this.addChild( this.btnBar );
        this.blackBg = new egret.Shape();
        this.blackBg.graphics.beginFill( 0x000000 );
        this.blackBg.graphics.drawRect(0, 0, 640, 58);
        this.blackBg.graphics.endFill();
        this.blackBg.y = this._scaleRate * 262;
        this.btnBar.addChild( this.blackBg );
                    
        this.restartBtn = new egret.Bitmap();
        this.restartBtn.texture = RES.getRes( this._resoucePrefix + "btnRestart_Init" );
        this.restartBtn.x = -34;
        this.restartBtn.y = -84;
        this.btnBar.addChild( this.restartBtn );
                                
        this.ruleBtn = new egret.Bitmap();
        this.ruleBtn.texture = RES.getRes( this._resoucePrefix + "btnRule_Init" );
        this.ruleBtn.x = 246;
        this.ruleBtn.y = -84;
        this.btnBar.addChild( this.ruleBtn );
                                
        this.cancelBtn = new egret.Bitmap();
        this.cancelBtn.texture = RES.getRes( this._resoucePrefix + "btnCancel_Init" );
        this.cancelBtn.x = 190;
        this.cancelBtn.y = -110 + this._scaleRate * 262;
        this.btnBar.addChild( this.cancelBtn );
                    
        this.restartBtnMask = new egret.Shape();
        this.restartBtnMask.graphics.beginFill( 0xFF0000 );
        this.restartBtnMask.graphics.drawRect( this.restartBtn.x, this.restartBtn.y, this.cancelBtn.x + this.cancelBtn.width * .5 - this.restartBtn.x, this.restartBtn.height );
            this.restartBtnMask.graphics.endFill();
            this.btnBar.addChild( this.restartBtnMask );
            this.restartBtn.mask = this.restartBtnMask;
            this.restartBtn.x += this.restartBtn.width;
                        
            this.ruleBtnMask = new egret.Shape();
            this.ruleBtnMask.graphics.beginFill( 0xFF0000 );
            this.ruleBtnMask.graphics.drawRect( this.cancelBtn.x + this.cancelBtn.width * .5, this.ruleBtn.y, this.ruleBtn.x + this.ruleBtn.width, this.ruleBtn.height );
                this.ruleBtnMask.graphics.endFill();
                this.btnBar.addChild( this.ruleBtnMask );
                this.ruleBtn.mask = this.ruleBtnMask;
                this.ruleBtn.x -= this.ruleBtn.width;
                        
                this.ruleBtn.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.overRuleBtn, this );
                this.ruleBtn.addEventListener( egret.TouchEvent.TOUCH_END, this.outRuleBtn, this );
                this.ruleBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.pauseGame, this );
                        
                this.restartBtn.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.overRestartBtn, this );
                this.restartBtn.addEventListener( egret.TouchEvent.TOUCH_END, this.outRestartBtn, this );
                this.restartBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.restartGame, this );
                        
                this.cancelBtn.addEventListener( egret.TouchEvent.TOUCH_BEGIN, this.overCancelBtn, this );
                this.cancelBtn.addEventListener( egret.TouchEvent.TOUCH_END, this.outCancelBtn, this );
                this.cancelBtn.addEventListener( egret.TouchEvent.TOUCH_TAP, this.finishGame, this );
    }
                
    // 按钮集动作
    private overRestartBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnRestart_Over" );
    }
    private outRestartBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnRestart_Init" );
    }
    private overRuleBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnRule_Over" );
    }
    private outRuleBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnRule_Init" );
    }
    private overCancelBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnCancel_Over" );
    }
    private outCancelBtn( evt: egret.TouchEvent ): void {
        evt.currentTarget.texture = RES.getRes( this._resoucePrefix + "btnCancel_Init" );
    }
    
    // 动画timebar
    private introTimeBar(): void {
        egret.Tween.get( this.timeBarBg )
            .to( { y: 6, alpha: 1 }, 500, egret.Ease.cubicInOut )
            .call( timeBarHaveTimeAnim, this );
            function timeBarHaveTimeAnim(): void {
                egret.Tween.get( this.timeBarHaveTime.mask )
                    .to( { scaleX: 1 }, 750, egret.Ease.bounceOut );
    
                egret.Tween.get( this.timeBarPart )
                    .wait( 200 )
                    .to( { rotation: 0, alpha: 1 }, 350, egret.Ease.backOut )
                    .call( scoreBarAnim, this );
                    function scoreBarAnim(): void {
                        egret.Tween.get( this.scoreBar )
                            .to( { rotation: 0, alpha: 1 }, 250, egret.Ease.backOut )
                            .call( this.introBtnsBar, this );
                    }
            }
    }
            
    // 动画btnbar
    private introBtnsBar(): void {
        egret.Tween.get( this.blackBg )
            .to( { y: 0 }, 500, egret.Ease.cubicInOut );

        egret.Tween.get( this.cancelBtn )
            .to( { y: -110 }, 500, egret.Ease.cubicInOut )
            .call( restartBtnAnim, this );
            function restartBtnAnim(): void {
                egret.Tween.get( this.restartBtn )
                    .to( { x: -34 }, 750, egret.Ease.bounceOut )
                    .call( removeRestartMask, this );
                    function removeRestartMask(): void {
                        this.restartBtn.mask = null;
                        this.btnBar.removeChild( this.restartBtnMask );
                        this.restartBtnMask = null;
                    }
    
                egret.Tween.get( this.ruleBtn )
                    .wait( 200 )
                    .to( { x: 246 }, 750, egret.Ease.bounceOut )
                    .call( removeRuleMask, this );
                    function removeRuleMask(): void {
                        this.ruleBtn.mask = null;
                        this.btnBar.removeChild( this.ruleBtnMask );
                        this.ruleBtnMask = null;
        
                        this.mainGameScreen.newGame();
                    }
            }
    }
    
    // 游戏中持续减少时间，每次减一秒
    private minusTimer( evt: egret.TimerEvent ): void {
        this.allTimers -= 1;
        if( this.allTimers < 0 ) this.allTimers = 0;
        
        egret.Tween.removeTweens( this.timeBarHaveTime );
        if (this.allTimers <= 20) this.warningTime();
        
        if (this.allTimers == 0) this.finishGame();
        
        this.timeBarHaveTimeMask.scaleX = this.getTimerMaskW() / 503;
    }
    
    private disableBtns( evt: egret.Event = null ): void {
        this.cancelBtn.touchEnabled = false;
        this.restartBtn.touchEnabled = false;
        this.ruleBtn.touchEnabled = false;
    }
    private enableBtns( evt: egret.Event = null ): void {
        this.cancelBtn.touchEnabled = true;
        this.restartBtn.touchEnabled = true;
        this.ruleBtn.touchEnabled = true;
    }
        
    private startCheckTime( evt: egret.Event = null ): void {
        this.checkTimer.start();
    }
    private reStartCheckTime( evt: egret.Event = null ): void {
        this.checkTimer.reset();
        this.checkTimer.start();
    }
    
    private minus10Timer( evt: egret.Event = null ): void {
        this.allTimers -= 10;
        if( this.allTimers < 0 ) this.allTimers = 0;
        
        egret.Tween.removeTweens( this.timeBarHaveTime );
        if (this.allTimers <= 20) this.warningTime();
        
        if (this.allTimers == 0) this.finishGame();
        
        this.timeBarHaveTimeMask.scaleX = this.getTimerMaskW() / 503;
    }
    
    private add5Timer( evt: egret.Event = null ): void {
        this.allTimers += 5;
        if( this.allTimers > 60 ) this.allTimers = 60;
        
        egret.Tween.removeTweens( this.timeBarHaveTime );
        if (this.allTimers <= 20) this.warningTime();
        
        if (this.allTimers == 0) this.finishGame();
        
        this.timeBarHaveTimeMask.scaleX = this.getTimerMaskW() / 503;
    }
    
    // 游戏中加分
    private addScore200( evt: egret.Event = null ): void {
        this.allScores += 200;
        switch( String( this.allScores ).length ){
            case 3:
                this.scoreText.text = '000,00' + String( this.allScores ).substring( 0, 1 ) + ',00';
                break;
            case 4:
                this.scoreText.text = '000,0' + String( this.allScores ).substring( 0, 2 ) + ',00';
                break;
            case 5:
                this.scoreText.text = '000,' + String( this.allScores ).substring( 0, 3 ) + ',00';
                break;
            case 6:
                this.scoreText.text = '00' + String( this.allScores ).substring( 0, 1 ) + ',' + String( this.allScores ).substring( 1, 3 ) + ',00';
                break;
            case 7:
                this.scoreText.text = '0' + String( this.allScores ).substring( 0, 2 ) + ',' + String( this.allScores ).substring( 2, 3 ) + ',00';
                break;
            case 8:
                this.scoreText.text = String( this.allScores ).substring( 0, 3 ) + ',' + String( this.allScores ).substring( 3, 3 ) + ',00';
                break;
        }
    }
    private addScore400( evt: egret.Event = null ): void {
        this.allScores += 400;
        switch( String( this.allScores ).length ){
            case 3:
            this.scoreText.text = '000,00' + String( this.allScores ).substring( 0, 1 ) + ',00';
            break;
            case 4:
            this.scoreText.text = '000,0' + String( this.allScores ).substring( 0, 2 ) + ',00';
            break;
            case 5:
            this.scoreText.text = '000,' + String( this.allScores ).substring( 0, 3 ) + ',00';
            break;
            case 6:
            this.scoreText.text = '00' + String( this.allScores ).substring( 0, 1 ) + ',' + String( this.allScores ).substring( 1, 3 ) + ',00';
            break;
            case 7:
            this.scoreText.text = '0' + String( this.allScores ).substring( 0, 2 ) + ',' + String( this.allScores ).substring( 2, 3 ) + ',00';
            break;
            case 8:
            this.scoreText.text = String( this.allScores ).substring( 0, 3 ) + ',' + String( this.allScores ).substring( 3, 3 ) + ',00';
            break;
        }
    }
    
    // 重新开始
    public restartGame( evt: egret.TouchEvent = null ): void {
        egret.Tween.removeTweens( this.timeBarHaveTime );
        this.timeBarHaveTime.alpha = 1;
        
        this.checkTimer.stop();
        this.mainGameScreen.stopGame();
        
        this.allTimers = 60;
        this.allScores = 0;
        this.scoreText.text = '000,000,00';
        
        egret.Tween.get( this.timeBarHaveTime.mask )
            .to( { scaleX: 1 }, 750, egret.Ease.bounceOut )
            .call( checkGameStop, this );
        function checkGameStop(): void {
            this.mainGameScreen.restartGame();
        }
    }
    
    // 点击游戏规则后暂停游戏
    private pauseGame( evt: egret.TouchEvent = null ): void {
        this.checkTimer.stop();
        
        this.mainGameScreen.pauseGame();
                    
        this.dispatchEvent( new egret.Event( 'showRule', true ) );
    }
    private pauseResume( evt: egret.Event ): void {
        egret.setTimeout( function() {
            this.checkTimer.start();
        }, this, 4000 );
        this.mainGameScreen.resumeGame();
    }
    
    // 结束游戏，注意这时应该是跳转到结束画面了
    private finishGame( evt: egret.TouchEvent = null ): void {
        this.checkTimer.stop();
        
        this.mainGameScreen.stopGame();
        
        this.dispatchEvent( new egret.Event( 'showSuccess', true ) );
    }
}
