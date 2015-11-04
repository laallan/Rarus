class Main extends egret.DisplayObjectContainer {
    /*
    * 主要参数
    */
    private _iW: number; // 屏幕宽
    private _iH: number; // 屏幕高
    private _scaleRate: number; // 缩放比例
    private _offsetY: number; // 主场景偏移量也是顶部logo高度
    
    // 顶部logo
    private logo: egret.Bitmap;
    
    // 主容器，放置所有的东西
    private mainContainer: egret.Sprite;
    
    // 游戏规则，主页和游戏页都会用到
    private gameRule: GameRule;
    
    // 主动态背景
    private mainGameBg: MainBg;
    
    // 首页
    private startScreen: StartGame;
    // 游戏页
    private gameScreen: Gameing;
    // 成功页
    private successScreen: SuccessGame;
    
    // 总排行榜页，主页和成功页未注册时用
    private homeRankScreen: HomeRank;
    // 个人排行榜页
    private personRankScreen: PersonRank;
    
    // 注册页
    private gameSignup: GameSignUp;
    
    // 判断是从哪进入的总排行榜, 如果为1表示从首页进入，如果为2表示从成功页进入
    private homeRankBackToType: number;
    
    private uId: string = '';
    private uName: string = '';
    private uPhone: string = '';
    private uScore: string = '0';
    
    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
       
    }

    private onAddToStage( evt: egret.Event ) {
        this._iW = this.stage.stageWidth;
        this._iH = this.stage.stageHeight;
        this._scaleRate = this._iW / 640;
        this._offsetY = this._scaleRate * 50;
        
        // 设置加载进度界面
        this.loadingView = new LoadingUI( this._iW, this._iH, this._scaleRate );
        this.stage.addChild( this.loadingView );

        // 初始化Resource资源加载库
        RES.addEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        RES.loadConfig( "resource/default.res.json", "resource/" );
    }
    // 配置文件加载完成,开始预加载preload资源组。
    private onConfigComplete( event: RES.ResourceEvent ):void {
        RES.removeEventListener( RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this );
        
        RES.addEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
        RES.addEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
        RES.loadGroup( "preload" );
    }
    // preload资源组加载完成
    private onResourceLoadComplete( event: RES.ResourceEvent ):void {
        if ( event.groupName == "preload" ) {
            this.stage.removeChild( this.loadingView );
            this.loadingView = null;
            
            RES.removeEventListener( RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this );
            RES.removeEventListener( RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this );
                      
            // 创建主容器
            this.createMainContainer();
            
            // 创建logo
            this.createLogo();
        }
    }
    // 资源组加载出错
    private onResourceLoadError( event: RES.ResourceEvent ):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete( event );
    }
    // preload资源组加载进度
    private onResourceProgress( event: RES.ResourceEvent ):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    // 创建主容器
    private createMainContainer(): void {
        this.mainContainer = new egret.Sprite();
        this.mainContainer.y = this._offsetY;
        this.stage.addChild( this.mainContainer );
        
        this.createGameBg();
        this.createStartScene();
        
        // 监听来自于首页点击的排行榜 | StartGame |
        this.mainContainer.addEventListener( 'showRank', this.createRank, this );
        // 监听来自于成功页未注册时点击的排行榜 | SuccessGame |
        this.mainContainer.addEventListener( 'showRankFromSuccess', this.createRankFromSuccess, this );
        // 监听来自于成功页已注册时点击的排行榜 | SuccessGame |
        this.mainContainer.addEventListener( 'showRankFromSigned', this.createRankFromSigned, this );
        // 监听排行榜返回按钮 | HomeRank |
        this.mainContainer.addEventListener( 'hideRank', this.removeRank, this );
        // 监听排行榜返回按钮 | PersonRank |
        this.mainContainer.addEventListener( 'hidePersonRank', this.removePersonRank, this );
        
        // 监听首页和游戏页的规则点击 | StartGame | Gameing |
        this.mainContainer.addEventListener( 'showRule', this.createRule, this );
        // 监听规则页关闭 | GameRule |
        this.mainContainer.addEventListener( 'hideRule', this.removeRule, this );
        
        // 监听开始游戏出现的Tip | StartGame |
        this.mainContainer.addEventListener( 'skipToGame', this.skipToGame, this );
        
        // 监听游戏结束显示成功页 | Gameing |
        this.mainContainer.addEventListener( 'showSuccess', this.createSuccessGame, this );

        // 监听成功页的重新游戏点击 | SuccessGame |
        this.mainContainer.addEventListener( 'successRestart', this.successRestartGame, this );
        // 监听成功页的注册点击 | SuccessGame |
        this.mainContainer.addEventListener( 'successSignup', this.successSign, this );

        // 监听注册页返回成功页点击 | GameSignUp |
        this.mainContainer.addEventListener( 'backToSuccess', this.signBackToSuccess, this );
        // 监听注册页成功注册后跳转 | GameSignUp |
        this.mainContainer.addEventListener('signSuccess', this.removeSign, this);
    }
    
    // 创建顶部logo
    private createLogo(): void {
        this.logo = new egret.Bitmap( RES.getRes( 'logo' ) );
        this.logo.width = this._iW;
        this.logo.height = this._offsetY;
        this.stage.addChild( this.logo );
    }
    
    // 创建背景
    private createGameBg(): void {
        this.mainGameBg = new MainBg( this._iW, this._iH - this._offsetY, this._scaleRate );
        this.mainContainer.addChild( this.mainGameBg );
    }
    
    // 创建首页
    private createStartScene(): void {
        this.startScreen = new StartGame( this._iW, this._iH - this._offsetY, this._scaleRate );
        this.startScreen.anchorOffsetX = this.startScreen.x = this._iW * .5;
        this.startScreen.anchorOffsetY = this.startScreen.y = ( this._iH - this._offsetY ) * .5;
        this.mainContainer.addChild( this.startScreen );
    }
    
    // 创建总排行榜
    private createHomeRankScene(): void {
        this.homeRankScreen = new HomeRank( this._iW, this._iH - this._offsetY, this._scaleRate );
        this.homeRankScreen.anchorOffsetX = this.homeRankScreen.x = this._iW * .5;
        this.homeRankScreen.anchorOffsetY = this.homeRankScreen.y = ( this._iH - this._offsetY ) * .5;
        this.mainContainer.addChild( this.homeRankScreen );
    }

    // 创建个人排行榜
    private createPersonRankScene(): void {
        this.personRankScreen = new PersonRank( this._iW, this._iH - this._offsetY, this._scaleRate, this.uId );
        this.personRankScreen.anchorOffsetX = this.personRankScreen.x = this._iW * .5;
        this.personRankScreen.anchorOffsetY = this.personRankScreen.y = ( this._iH - this._offsetY ) * .5;
        this.mainContainer.addChild( this.personRankScreen );
    }

    // 首页排行榜
    private createRank( evt: egret.Event ): void {
        this.homeRankBackToType = 1;
        
        if ( this.startScreen )
            this.startScreen.dispatchEvent( new egret.Event( 'pauseStartAnim', true ) );
            
        egret.Tween.get( this.startScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( checkHaveRank, this );
        function checkHaveRank(): void {
            this.startScreen.visible = false;
            
            if ( !this.homeRankScreen ) {
                this.createHomeRankScene();
            } else {
                this.homeRankScreen.dispatchEvent( new egret.Event( 'changeListData', true ) );
                
                this.homeRankScreen.visible = true;
                egret.Tween.get( this.homeRankScreen )
                    .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
            }
        }
    }

    // 成功页的排行榜，未注册时
    private createRankFromSuccess( evt: egret.Event ): void {
        this.homeRankBackToType = 2;
        
        egret.Tween.get( this.successScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( checkHaveRank, this );
        function checkHaveRank(): void {
            this.successScreen.visible = false;
            
            if ( !this.homeRankScreen ) {
                this.createHomeRankScene();
            } else {
                this.homeRankScreen.dispatchEvent( new egret.Event( 'changeListData', true ) );
                
                this.homeRankScreen.visible = true;
                egret.Tween.get( this.homeRankScreen )
                    .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
            }
        }
    }

    // 这个时候的个人排行榜是肯定存在的
    private createRankFromSigned( evt: egret.Event ): void {
        egret.Tween.get( this.successScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( checkHaveRank, this );
        function checkHaveRank(): void {
            this.successScreen.visible = false;

            this.personRankScreen.dispatchEvent( new egret.Event( 'changeListData', true ) );

            this.personRankScreen.visible = true;
            egret.Tween.get( this.personRankScreen )
                .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
        }
    }

    // 首页状态隐藏排行榜及成功页状态隐藏排行榜
    private removeRank( evt: egret.Event ): void {
        if ( this.startScreen )
            this.startScreen.dispatchEvent( new egret.Event( 'resumeStartAnim', true ) );
            
        if( this.homeRankBackToType == 1 ) {
            egret.Tween.get( this.homeRankScreen )
                .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
                .call( backToHome, this );
            function backToHome(): void {
                this.homeRankScreen.visible = false;

                this.startScreen.visible = true;
                egret.Tween.get( this.startScreen )
                    .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
            }
        } else if ( this.homeRankBackToType == 2 ) {
            egret.Tween.get( this.homeRankScreen )
                .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
                .call( backToSuccess, this );
            function backToSuccess(): void {
                this.homeRankScreen.visible = false;
                
                this.successScreen.visible = true;
                egret.Tween.get( this.successScreen )
                    .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
            }
        }
    }

	// 隐藏个人排行榜
    private removePersonRank( evt: egret.Event ): void {
        if ( this.startScreen )
            this.startScreen.dispatchEvent( new egret.Event( 'resumeStartAnim', true ) );
            
        egret.Tween.get( this.personRankScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( backToSuccess, this );
        function backToSuccess(): void {
            this.personRankScreen.visible = false;
                            
            this.successScreen.visible = true;
            egret.Tween.get( this.successScreen )
                .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
        }
    }

    // 游戏规则
    private createRule( evt: egret.Event ): void {
        this.mainGameBg.pauseAnimBg();
        if ( this.startScreen )
            this.startScreen.dispatchEvent( new egret.Event( 'pauseStartAnim', true ) );
            
        this.gameRule = new GameRule( this._iW, this._iH - this._offsetY, this._scaleRate );
        this.mainContainer.addChild( this.gameRule );
    }
    private removeRule( evt: egret.Event ): void {
        if( this.startScreen ) {
            this.mainGameBg.resumeAnimBg();
            this.startScreen.dispatchEvent( new egret.Event( 'resumeStartAnim', true ) );
        }
            
        if (this.gameScreen)
            this.gameScreen.dispatchEvent( new egret.Event( 'gamePauseResume', true ) );
            
        this.mainContainer.removeChild( this.gameRule );
        this.gameRule = null; 
    }
    
    // 点开始游戏后出现的tip，点skip后
    private skipToGame( evt: egret.Event ): void {
        if ( this.homeRankScreen ) {
            this.mainContainer.removeChild( this.homeRankScreen );
            this.homeRankScreen = null;
        }
        this.mainContainer.removeChild( this.startScreen );
        this.startScreen = null;
        
        this.mainGameBg.setBlackAlpha( 0.8 );
        this.mainGameBg.pauseAnimBg();
        this.gameScreen = new Gameing( this._iW, this._iH - this._offsetY, this._scaleRate );
        this.mainContainer.addChild( this.gameScreen );
    }
    
    // 游戏分数页
    private createSuccessGame( evt: egret.Event ): void {
        this.uScore = String( this.gameScreen.allScores );
        
        this.mainGameBg.setBlackAlpha( 0.4 );
        this.mainGameBg.resumeAnimBg();
        
        this.gameScreen.visible = false;

        if( !this.successScreen ) {
            this.successScreen = new SuccessGame( this._iW, this._iH - this._offsetY, this._scaleRate, this.uScore );
            this.successScreen.anchorOffsetX = this.successScreen.x = this._iW * .5;
            this.successScreen.anchorOffsetY = this.successScreen.y = ( this._iH - this._offsetY ) * .5;
            this.mainContainer.addChild( this.successScreen );
        } else {
            this.successScreen._uScore = this.uScore;
            this.successScreen.dispatchEvent( new egret.Event( 'changeScore', true ) );
            this.successScreen.visible = true;
            egret.Tween.get( this.successScreen )
                .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
        }
    }
    
    // 从成功页重新开始游戏
    private successRestartGame( evt: egret.Event ): void {
        this.mainGameBg.setBlackAlpha( 0.8 );
        this.mainGameBg.pauseAnimBg();
        egret.Tween.get( this.successScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( backToGaming, this );
        function backToGaming(): void {
            this.successScreen.visible = false;
            
            this.gameScreen.visible = true;
            this.gameScreen.restartGame();
        }
    }
    
    // 从成功页进入注册页 
    private successSign( evt: egret.Event ): void {
        this.mainGameBg.pauseAnimBg();
        
        if( !this.gameSignup ) {
            this.gameSignup = new GameSignUp( this._iW, this._iH - this._offsetY, this._scaleRate, this.uScore );
            this.gameSignup.anchorOffsetX = this.gameSignup.x = this._iW * .5;
            this.gameSignup.anchorOffsetY = this.gameSignup.y = ( this._iH - this._offsetY ) * .5;
            this.mainContainer.addChild( this.gameSignup );
        } else {
            this.gameSignup.userScore = this.uScore;

            this.gameSignup.visible = true;
            egret.Tween.get( this.gameSignup )
                .to( { alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.cubicInOut );
        }
    }
    
    // 从注册页直接点返回，而非注册
    private signBackToSuccess( evt: egret.Event ): void {
        this.mainGameBg.resumeAnimBg();
        
        egret.Tween.get( this.gameSignup )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( backToSuccess, this );
        function backToSuccess(): void {
            this.gameSignup.visible = false;
        }
    }
    
    // 注册完后清除注册页, 如果一开始生成过总排行榜，也清除
    private removeSign( evt: egret.Event ): void {
        if ( this.homeRankScreen ) {
            this.mainContainer.removeChild( this.homeRankScreen );
            this.homeRankScreen = null;
        }
        
        this.mainGameBg.resumeAnimBg();
        
        this.successScreen.hideSignBtn();
        
        this.uId = this.gameSignup.userId;
        this.uName = this.successScreen._uName = this.gameSignup.userName;
        this.uPhone = this.successScreen._uPhone = this.gameSignup.userPhone;
        
        egret.Tween.get( this.gameSignup )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( removeThisSign, this );
        function removeThisSign(): void {
            this.mainContainer.removeChild( this.gameSignup );
            this.gameSignup = null;
        }
        
        egret.Tween.get( this.successScreen )
            .to( { alpha: 0, scaleX: 0.95, scaleY: 0.95 }, 350, egret.Ease.cubicInOut )
            .call( checkHaveRank, this );
        function checkHaveRank(): void {
            this.successScreen.visible = false;
                        
            this.createPersonRankScene();
        }
    }
}