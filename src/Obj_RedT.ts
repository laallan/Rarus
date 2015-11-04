class Obj_RedT extends egret.Sprite {
    private _scaleRate: number;
    
    private _resoucePrefix: string = 'game_';
    
    private topAnim: egret.Bitmap;
    private backNoAnim: egret.Bitmap;
    
    private initState_TW: egret.Tween;
    private hideState_TW: egret.Tween;
    
	public constructor( rate: number ) {
        super();
        
        this._scaleRate = rate;
        
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
        this.addEventListener( egret.Event.REMOVED_FROM_STAGE, this.onRemovedFromStage, this );
	}
    private onAddToStage( evt: egret.Event ) {
        this.backNoAnim = new egret.Bitmap( RES.getRes( this._resoucePrefix + "objRedT" ) );
        this.addChild( this.backNoAnim );
        
        this.topAnim = new egret.Bitmap( RES.getRes( this._resoucePrefix + "objRedT2" ) );
        this.addChild( this.topAnim );
        
        this.backNoAnim.scaleX = this.backNoAnim.scaleY = this.topAnim.scaleX = this.topAnim.scaleY = this._scaleRate;
        
        this.initState();
        
        this.addEventListener( 'doRemoveTopAnim', this.stopState, this );
        this.addEventListener( 'doPauseTopAnim', this.pauseState, this );
        this.addEventListener( 'doResumeTopAnim', this.resumeState, this );
    }
    
    private onRemovedFromStage( evt: egret.Event ) {
        egret.Tween.removeTweens(this.topAnim);
        
        this.backNoAnim.texture = null;
        this.removeChild( this.backNoAnim );
        this.backNoAnim = null;
        
        this.topAnim.texture = null;
        this.removeChild( this.topAnim );
        this.topAnim = null;
        
        this.removeEventListener( 'doRemoveTopAnim', this.stopState, this );
        this.removeEventListener( 'doPauseTopAnim', this.pauseState, this );
        this.removeEventListener( 'doResumeTopAnim', this.resumeState, this );
    }
    
    private initState(): void
    {
        egret.Tween.get( this.topAnim, { loop:true } )
            .to( { alpha: 0 }, 500 )
            .to( { alpha: 1 }, 500 );
    }
    
    public hideState(): void {
        egret.Tween.removeTweens(this.topAnim);
        
        this.backNoAnim.alpha = 0;
        
        egret.Tween.get( this.topAnim )
            .to( { alpha: 0 }, 250 )
            .call( removeObj, this );
        
        function removeObj() {
            egret.Tween.removeTweens(this.topAnim);
            
            this.parent.removeChild( this );
        }
    }
    
    public pauseState( evt: egret.Event = null ): void {
        egret.Tween.pauseTweens(this.topAnim);
    }
    
    public resumeState( evt: egret.Event = null ): void {
        egret.Tween.resumeTweens(this.topAnim);
    }
    
    public stopState( evt: egret.Event = null ): void {
        egret.Tween.removeTweens(this.topAnim);
    }
}
