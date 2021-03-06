class MainBg extends egret.Sprite {
    
    private _iW: number;
    private _iH: number;
    private _scaleRate: number;
    
    private _resoucePrefix: string = 'bg_';
    
    private bgAnim: egret.Bitmap;
    private blackMask: egret.Shape;
    private bgKuang_bottom: egret.Bitmap;
    private bgKuang_top: egret.Bitmap;
    
    private bgAnimTimer: egret.Timer;
    private bgId: number = 1;
    
	public constructor( w: number, h: number, rate: number ) {
        super();
        
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
	}
	
    private onAddToStage( event: egret.Event ) {
        // 动态背景
        this.bgAnim = new egret.Bitmap();
        this.bgAnim.texture = RES.getRes( this._resoucePrefix + "bgAnim1" );
        this.bgAnim.name = 'mainBgAnim';
        this.bgAnim.width = this._iW;
        this.bgAnim.height = this._scaleRate * 1108;
        this.bgAnim.anchorOffsetX = this._iW * .5;
        this.bgAnim.anchorOffsetY = this._iH * .5;
        this.bgAnim.x = this._iW * .5;
        this.bgAnim.y = this._iH * .5;
        
        this.bgAnimTimer = new egret.Timer( 120, 0 );
        this.bgAnimTimer.addEventListener( egret.TimerEvent.TIMER, this.onAnimBg, this );
        this.bgAnimTimer.start();
        
        // 黑色背景，控制明暗
        this.blackMask = new egret.Shape();
        this.blackMask.graphics.beginFill(0x000000);
        this.blackMask.graphics.drawRect(0, 0, this._iW, this._iH);
        this.blackMask.graphics.endFill();
        
        // 背景外部框底层
        this.bgKuang_bottom = new egret.Bitmap( RES.getRes( this._resoucePrefix + "bgKuang_1" ) );
        this.bgKuang_bottom.width = this._iW;
        this.bgKuang_bottom.height = this._scaleRate * 1138;
        this.bgKuang_bottom.anchorOffsetY = this.bgKuang_bottom.height;
        this.bgKuang_bottom.y = this._iH;
        
        // 背景外部框上层
        this.bgKuang_top = new egret.Bitmap( RES.getRes( this._resoucePrefix + "bgKuang_2" ) );
        this.bgKuang_top.width = this._iW;
        this.bgKuang_top.height = this._scaleRate * 958;
        
        // 按顺序加载
        this.addChild( this.bgAnim );
        this.addChild( this.blackMask );
        this.addChild( this.bgKuang_bottom );
        this.addChild( this.bgKuang_top );
        
        this.setBlackAlpha( 0.4 );
    }
    
    // 背景动起来
    private onAnimBg( evt: egret.TimerEvent ): void {
        this.bgId++;
        if( this.bgId > 24 ) this.bgId = 1;
        this.bgAnim.texture = RES.getRes( this._resoucePrefix + "bgAnim" + this.bgId );
    }
    
    // 暂停背景动画
    public pauseAnimBg(): void {
        this.bgAnimTimer.stop();
    }
    
    // 继续背景动画
    public resumeAnimBg(): void {
        this.bgAnimTimer.start();
    }
    
    // 用于外部控制背景明暗，用于游戏中和游戏外
    public setBlackAlpha( op: number ): void {
        egret.Tween.get( this.blackMask )
            .to( { alpha: op }, 250 );
    }
}
