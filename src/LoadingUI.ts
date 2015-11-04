class LoadingUI extends egret.Sprite {
    private _iW: number;
    private _iH: number;
    private _scaleRate: number;
    
    private bgMain: egret.Bitmap;
    
    private loadTextField: egret.TextField;
    
    public constructor( w: number, h: number, rate: number ) {
        super();
        
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }

    private onAddToStage( event: egret.Event ) {
        this.bgMain = new egret.Bitmap();
        this.bgMain.width = this._iW;
        this.bgMain.height = this._scaleRate * 1008;
        this.addChild( this.bgMain );
        
        this.loadTextField = new egret.TextField();
        this.loadTextField.fontFamily = "Arial";
        this.loadTextField.bold = true;
        this.loadTextField.textColor = 0xEB9300;
        this.loadTextField.size = this._scaleRate * 40;
        this.loadTextField.text = 'loading   0%';
        this.loadTextField.textAlign = 'center';
        this.loadTextField.anchorOffsetX = this.loadTextField.width * .5;
        this.loadTextField.anchorOffsetY = this.loadTextField.height * .5;
        this.loadTextField.x = this._iW * .5;
        this.loadTextField.y = this._iH * .85;
        this.addChild(this.loadTextField);
        
        RES.getResByUrl("resource/assets/loadBg.png", function (texture: egret.Texture) {
            if ( this.bgMain )
                this.bgMain.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    }
    
    private removeFromStage( evt: egret.Event ): void {
        this.removeChildren();
        this.bgMain = null;
    }

    public setProgress(current, total):void {
        this.loadTextField.text = "loading " + Math.round( current / total * 100 ) + "%";
    }
}
