class PerRank extends egret.DisplayObjectContainer {
    private _resoucePrefix: string = 'rank_';
    
    private _id: number;
    private _name: string;
    private _score: number;
    private _isSelf: boolean;
    
    private mBg: egret.Bitmap;
    private listId: egret.TextField;
    private listId2: egret.TextField;
    private textName: egret.TextField;
    private timeIcon: egret.Bitmap;
    private timeScore: egret.TextField;
    
	public constructor( id: number, nm: string, sc: number, sf: boolean ) {
        super();
        
        this._id = id;
        this._name = nm;
        this._score = sc;
        this._isSelf = sf;
        
        this.addEventListener( egret.Event.ADDED_TO_STAGE, this.onAddToStage, this );
	}
	
    private onAddToStage( evt: egret.Event ): void {
        // 背景
        this.mBg = new egret.Bitmap();
        this.mBg.width = 588; this.mBg.height = 64;
        this.addChild( this.mBg );
        if( this._id <= 3 ) {
            this.mBg.texture = RES.getRes( this._resoucePrefix + 'perTop3' );
        } else if ( this._id > 3 && this._id <= 10 ) {
            this.mBg.texture = RES.getRes( this._resoucePrefix + 'perOther10' );
        } else {
            this.mBg.texture = RES.getRes( this._resoucePrefix + 'perOthers' );
        }

        // topList
        if( this._id <= 10 ) {
            this.listId = new egret.TextField();
            this.listId.fontFamily = "Arial";
            this.listId.size = 24;
            this.listId.stroke = 2;
            this.listId.strokeColor = 0x140407;
                        
            this.listId.text = 'TOP' + String( this._id );
            this.listId.textAlign = 'center';
            this.listId.anchorOffsetX = this.listId.width * .5;
            this.listId.anchorOffsetY = this.listId.height * .5;
            this.listId.rotation = -4;
            this.listId.x = 58; this.listId.y = 34;
            if( !this._isSelf ) {
                this.listId.textColor = 0xFFFFFF;
            } else {
                this.listId.textColor = 0xF39800;
            }
            this.addChild( this.listId );
        } else {
            this.listId2 = new egret.TextField();
            this.listId2.fontFamily = "Arial";
            this.listId2.size = 28;
            
            this.listId2.text = String( this._id );
            this.listId2.anchorOffsetX = this.listId2.width;
            this.listId2.anchorOffsetY = this.listId2.height * .5;
            this.listId2.x = 86; this.listId2.y = 34;
            if( !this._isSelf ) {
                this.listId2.textColor = 0xFFFFFF;
            } else {
                this.listId2.textColor = 0xF39800;
            }
            this.addChild( this.listId2 );
        }
        
        // name
        this.textName = new egret.TextField();
        this.textName.fontFamily = "SimHei";
        this.textName.size = 30;
        this.textName.textColor = 0xFFFFFF;
        this.textName.bold = true;
        this.textName.text = this._name;
        this.textName.anchorOffsetY = this.textName.height * .5;
        this.textName.x = 130; this.textName.y = 34;
        this.addChild( this.textName );
        if (this._id <= 3) {
            if( !this._isSelf ) {
                this.textName.textColor = 0x2B91F7;
            } else {
                this.textName.textColor = 0xF39800;
            }
        } else {
            if( !this._isSelf ) {
                this.textName.textColor = 0xFFFFFF;
            } else {
                this.textName.textColor = 0xF39800;
            }
        }
        
        // timeIcon
        if( this._id <= 10 ) {
            this.timeIcon = new egret.Bitmap();
            this.timeIcon.width = 32; this.timeIcon.height = 32;
            this.timeIcon.x = 374; this.timeIcon.y = 18;
            this.addChild( this.timeIcon );
            if( !this._isSelf ) {
                if ( this._id <= 3 ) {
                    this.timeIcon.texture = RES.getRes( this._resoucePrefix + 'circleTop3' );
                } else {
                    this.timeIcon.texture = RES.getRes( this._resoucePrefix + 'circleOther10' );
                }
            } else {
                this.timeIcon.texture = RES.getRes( this._resoucePrefix + 'circleSelf' );
            }
        }
        
        // score
        this.timeScore = new egret.TextField();
        this.timeScore.fontFamily = "Arial";
        this.timeScore.size = 30;
        this.timeScore.textColor = 0xFFFFFF;
        this.timeScore.text = String( this._score );
        this.timeScore.anchorOffsetY = this.timeScore.height * .5;
        this.timeScore.x = 416; this.timeScore.y = 34;
        this.addChild( this.timeScore );
        if (this._id <= 3) {
            if( !this._isSelf ) {
                this.timeScore.textColor = 0x2B91F7;
            } else {
                this.timeScore.textColor = 0xF39800;
            }
        } else {
            if( !this._isSelf ) {
                this.timeScore.textColor = 0xFFFFFF;
            } else {
                this.timeScore.textColor = 0xF39800;
            }
        }
    }
}
