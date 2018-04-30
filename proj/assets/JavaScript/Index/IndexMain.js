// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        /*Lighting:{
            type : cc.Node,
            default : null
        },*/
        BGM : {
            default : null,
            url : cc.AudioClip
        },
        Clickaudio : {
            default : null,
            url : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //关闭FPS面板
        cc.director.setDisplayStats(false);

        //播放洞内灯光
       /* let action = cc.sequence(
            cc.fadeTo(1,0),
            cc.fadeTo(1,255)
        ).repeatForever();

        this.Lighting.runAction(action);*/
        this.rotateSpeed = 0.5;
        this.FishRoll = cc.find('Canvas/FishRoll');
        //监听开始游戏
        let startBtn = cc.find('Canvas/Start');

        /*startBtn.on(cc.Node.EventType.TOUCH_END,this.StartGame.bind(this));*/
        startBtn.on(cc.Node.EventType.TOUCH_END,this.StartGameSellect.bind(this));

        this.BGM_ID = cc.audioEngine.play(this.BGM,true);

        //预加载场景2
        cc.director.preloadScene('Game');
        cc.director.preloadScene('GameSellect');
    },

    /*StartGame(){
        //关闭BGM
        cc.audioEngine.stop(this.BGM_ID);
        //清空关卡数
        cc.sys.localStorage.removeItem('level');
        //跳转场景
        cc.director.loadScene("Game");
    },*/
    StartGameSellect(){
        cc.audioEngine.play(this.Clickaudio,false);
        //关闭BGM
        cc.audioEngine.stop(this.BGM_ID);
        //清空关卡数
        //cc.sys.localStorage.removeItem('level');
        //跳转场景
        cc.director.loadScene("GameSellect");
    },

    // start () {

    // },

    HookRoTate(){
        //限制范围 只能在 70 与 -70 之间
        if(this.FishRoll.rotation >= 35){
            this.rotateSpeed = -this.rotateSpeed;
        }else if(this.FishRoll.rotation <= -35){
            this.rotateSpeed = Math.abs(this.rotateSpeed);
        };

        this.FishRoll.rotation += this.rotateSpeed;
    },

    update (dt) {
        this.HookRoTate();
    },
});
