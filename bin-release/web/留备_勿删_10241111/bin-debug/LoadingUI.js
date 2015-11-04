var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI(w, h, rate) {
        _super.call(this);
        this._iW = w;
        this._iH = h;
        this._scaleRate = rate;
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeFromStage, this);
    }
    var d = __define,c=LoadingUI;p=c.prototype;
    p.onAddToStage = function (event) {
        this.bgMain = new egret.Bitmap();
        this.bgMain.width = this._iW;
        this.bgMain.height = this._scaleRate * 1008;
        this.addChild(this.bgMain);
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
        RES.getResByUrl("resource/assets/loadBg.png", function (texture) {
            if (this.bgMain)
                this.bgMain.texture = texture;
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    p.removeFromStage = function (evt) {
        this.removeChildren();
        this.bgMain = null;
    };
    p.setProgress = function (current, total) {
        this.loadTextField.text = "loading " + Math.round(current / total * 100) + "%";
    };
    return LoadingUI;
})(egret.Sprite);
egret.registerClass(LoadingUI,"LoadingUI");
