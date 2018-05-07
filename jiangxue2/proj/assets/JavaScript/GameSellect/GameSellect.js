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
        Group:{
            type:cc.Node,
            default:[]
        },
        Clickaudio : {
            default : null,
            url : cc.AudioClip
        },
    },

    onLoad () {
        //获取返回菜单按键
        let BackmenuBtn = cc.find('Canvas/BackGround/Button/BackmenuBtn');
        //获取左右按键
        let LeftBtn = cc.find('Canvas/BackGround/Button/LeftBtn');
        let RightBtn = cc.find('Canvas/BackGround/Button/RightBtn');
        //设置状态机
        this.State = 0;
        this.GameSellectState = 0;
        //获取菜单按键、标题
        this.MenuBtn0 = cc.find('Canvas/BackGround/MenuSprite/Group0/MenuBtn0');
        this.MenuBtn1 = cc.find('Canvas/BackGround/MenuSprite/Group1/MenuBtn1');
        this.MenuBtn2 = cc.find('Canvas/BackGround/MenuSprite/Group2/MenuBtn2');
        this.MenuBtn3 = cc.find('Canvas/BackGround/MenuSprite/Group3/MenuBtn3');
        //返回菜单键监听
        BackmenuBtn.on(cc.Node.EventType.TOUCH_END,this.Backmenu.bind(this));
        //左右按键监听
        LeftBtn.on(cc.Node.EventType.TOUCH_END,this.LeftBtnClicked.bind(this));
        RightBtn.on(cc.Node.EventType.TOUCH_END,this.RightBtnClicked.bind(this));

        this.MenuBtn0.on(cc.Node.EventType.TOUCH_END,this.MenuBtn0Clicked.bind(this));
        this.MenuBtn1.on(cc.Node.EventType.TOUCH_END,this.MenuBtn1Clicked.bind(this));
        this.MenuBtn2.on(cc.Node.EventType.TOUCH_END,this.MenuBtn2Clicked.bind(this));
        this.MenuBtn3.on(cc.Node.EventType.TOUCH_END,this.MenuBtn3Clicked.bind(this));
        //页面初始化
        this.LRBtninit();

        cc.director.preloadScene('Game');

    },
   /**
     * @description 按键返回主页菜单
     */
    Backmenu(){
        cc.audioEngine.play(this.Clickaudio,false);
        cc.director.loadScene("Index");
    },
   /**
     * @description 左按键点击事件
     */
    LeftBtnClicked(){
        cc.audioEngine.play(this.Clickaudio,false);
        if (this.State == 0){
            this.State = 3;
            this.Group[0].active = false;
            this.Group[3].active = true;
        }else{
            this.Group[this.State].active = false;
            this.State --; 
            this.Group[this.State].active = true;
        };
    },
   /**
     * @description 右按键点击事件
     */
    RightBtnClicked(){
        cc.audioEngine.play(this.Clickaudio,false);
        if (this.State == 3){
            this.State = 0;
            this.Group[3].active = false;
            this.Group[0].active = true;
        }else{
            this.Group[this.State].active = false;
            this.State ++; 
            this.Group[this.State].active = true;
        };
    },
   /**
     * @description 页面初始化显示
     */
    LRBtninit(){
        this.Group[0].active = true;
        this.Group[1].active = false;
        this.Group[2].active = false;
        this.Group[3].active = false;
    },
    /**
     * @description 菜单按键触发事件，进行参数设置
     */
    MenuBtn0Clicked(){
        this.GameSellectState = 0;
        this.StartGame();
    },
    MenuBtn1Clicked(){
        this.GameSellectState = 1;
        this.StartGame();
    },
    MenuBtn2Clicked(){
        this.GameSellectState = 2;
        this.StartGame();
    },
    MenuBtn3Clicked(){
        this.GameSellectState = 3;
        this.StartGame();
    },

    StartGame(){
        //清空关卡数
        cc.sys.localStorage.removeItem('level');
        //传递参数
        cc.sys.localStorage.setItem('GameSellectState',this.GameSellectState);
        //跳转场景
        cc.director.loadScene("Game");
    },
});
