// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

//引入 得分等配置 太长 所以换个文件写
import ItemAttr from './Config';

cc.Class({
    extends: cc.Component,

    properties: {
        //钩子速度
        speed : {
            default : 3,
            displayName : '钩子速度'
        },
        //钩子旋转速度
        rotateSpeed : {
            default : 1,
            displayName : '钩子旋转速度'
        },
        //钩子范围
        HookRange : {
            default : 70,
            displayName : '钩子旋转角度范围'
        },
        //所有的prefab 这种方式是同步的 代码比较好写 就是难拖
        Prefabs : {
            default : [],
            type : cc.Prefab
        },
        InitTime : {
            default : 10,
        },
        //钩子触碰到物品的声音
        CollisionAudio:{
            default : null,
            url : cc.AudioClip
        },
        //加分的声音
        AddScroeAudio:{
            default : null,
            url : cc.AudioClip
        },
        //胜利音效
        WinAudio:{
            default : null,
            url : cc.AudioClip
        },
        //失败音效
        FailureAudio:{
            default : null,
            url : cc.AudioClip
        },
        //背景图
        BackGround : {
            default : [],
            type : cc.Node
        },
        //时间倒计时进度条
        TimeProgressBar : {
            default : null,
            type : cc.ProgressBar
        },
        BGM0 : {
            default : null,
            url : cc.AudioClip
        },
        BGM1 : {
            default : null,
            url : cc.AudioClip
        },
        BGM2 : {
            default : null,
            url : cc.AudioClip
        },
        BGM3 : {
            default : null,
            url : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        /**
         * 初始化
         */
        this.init();
        //this.BGM_ID = cc.audioEngine.play(this.BGM);
        //加载首页资源
        cc.director.preloadScene('Index');
    },

    /**
     * @description 初始化 各种需要的比变量
     */
    init(){
        //获取GameSellectState的状态值,启动游戏背景初始化
        this.GameSellectState = cc.sys.localStorage.getItem('GameSellectState');
        this.GameBackgroundInit();

        //时间倒计时进度条初始化
        this.TimeProgressBarInit();

        //钩子矿工
        this.Miner = cc.find('Canvas/Header/Miner');

        //获取钩子
        this.Hook = cc.find('Canvas/Header/Miner/Hook');
        //获取钩子初始长度
        this.HookHeight = this.Hook.height;
        //放下钩子开关  0停止  1发射  2拉回
        this.HookState = 0;
        //得分累计
        this.Score = cc.find('Canvas/Header/Info/ScoreAndTarget/Score').getComponent(cc.Label);
        //通关目标分数
        this.TargetScore = cc.find('Canvas/Header/Info/ScoreAndTarget/Target').getComponent(cc.Label);
        //关卡数
        this.Checkpoint = cc.find('Canvas/Header/Info/CheckpointAndTime/Checkpoint').getComponent(cc.Label);
        //暂停、胜利、失败
        this.changelabel = cc.find('Canvas/Mask/background/Pause').getComponent(cc.Label);
        //加分文字
        this.AddScorelabel = cc.find('Canvas/Header/Info/AddScore').getComponent(cc.Label);
        this.AS = cc.find('Canvas/Header/Info/AddScore');
        //钓鱼动画
        this.MinerAnimation = cc.find('Canvas/Header/Miner').getComponent(cc.Animation);
        //物品区域
        this.itemArea = cc.find('Canvas/ItemArea');
        //开启碰撞
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        // this.manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;

        //重组prefab数组 方便查询
        this.Prefab = {};
        this.Prefabs.forEach(item => {
            this.Prefab[item._name] = item;
        });

        //发射钩子按钮
        let emitHook = cc.find('Canvas/emitHookBtn');
        //重玩本关按钮
        let ReloadBtn = cc.find('Canvas/Mask/ReloadBtn');
        //返回菜单按钮
        let MenuBtn = cc.find('Canvas/Mask/MenuBtn');
        //暂停按钮
        let PauseBtn = cc.find('Canvas/Pause');
        //弹出框
        this.Mask = cc.find('Canvas/Mask');
        //游戏结束按钮 包括过关/结束游戏
        this.GameOverBtn = cc.find('Canvas/Mask/GameOverBtn');

        this.Mask.on(cc.Node.EventType.TOUCH_END,this.CloseMask.bind(this));

        this.GameOverBtn.on(cc.Node.EventType.TOUCH_END,this.Next.bind(this));

        emitHook.on(cc.Node.EventType.TOUCH_END,this.emitHookBtn.bind(this));

        ReloadBtn.on(cc.Node.EventType.TOUCH_END,this.Reload.bind(this));

        MenuBtn.on(cc.Node.EventType.TOUCH_END,this.BackMenu.bind(this));

        PauseBtn.on(cc.Node.EventType.TOUCH_END,this.ShowMask.bind(this));

        this.ResetInfo();
        this.StartTime();
        this.SetLevel();
        this.CreateTargetScor();
        this.CreateItem();
    },
        /**
     * @description 游戏背景初始化
     */
    GameBackgroundInit(){
        let newBGMArr = [this.BGM0,this.BGM1,this.BGM2,this.BGM3];
        this.BackGround[this.GameSellectState].active = true;
        this.BGM_ID = cc.audioEngine.play(newBGMArr[this.GameSellectState],true,0.5)
    },
        /**
     * @description 时间倒计时初始化
     */
    TimeProgressBarInit(){
        this.TimeProgressBar.progress = 1;
        //进度条初始状态
        this.ProgressBarState = true;
        this.TimeProgressBar.node.opacity = 255;
    },
        /**
     * @description 返回菜单选择
     */
    BackMenu(){
        cc.audioEngine.stopAll();
        cc.game.resume();
        cc.director.loadScene('GameSellect');
        
    },
    /**
     * @description 钩子旋转
     */
    HookRoTate(){
        if(this.HookState)return;

        //限制范围 只能在 70 与 -70 之间
        if(this.Hook.rotation >= 70){
            this.rotateSpeed = -this.rotateSpeed;
        }else if(this.Hook.rotation <= -70){
            this.rotateSpeed = Math.abs(this.rotateSpeed);
        };

        this.Hook.rotation += this.rotateSpeed;
    },

    /**
     * @description 发射钩子按钮事件
     */
    emitHookBtn(){
        //TODO 停止钩子旋转
        //打开/关闭 钩子开关 没有拉回之前 当前position ！= 初始位置时 不允许操作
        if(this.HookState)return;

        this.HookState = 1;
    },

    /**
     * @description 发射钩子     0停止  1发射  2拉回
     */
    emitHook(){
        switch(this.HookState){
            case 1:
                this.Hook.height += this.speed;
                break;
            case 2:
                if(this.Hook.height <= this.HookHeight){

                    //检测是否拉回物品
                    if(this.Hook.children[1].childrenCount){
                        this.Handle(this.Hook.children[1].children);
                    };

                    this.StopHookMove();
                }else{
                    this.Hook.height -= this.speed;
                };
                break;
        };
    },

    /**
     * @description 拉回钩子
     */
    PullBackHook(){

        //播放拉回钩子动画
        this.MinerAnimation.play('PullRope');
        this.HookState = 2;
    },

    /**
     * 设置钩子拉回的速度
     */
    SetSpeed(other){
        ItemAttr[other.node.name] = ItemAttr[other.node.name] || {};
        this.speed = ItemAttr[other.node.name].speed || 3;
    },

    /**
     * 重置所有分数信息
     */
    ResetInfo(){
        //this.victory 游戏胜利失败状态 0 = 游戏中 1 = 成功 2 = 失败
        this.victory = 
        this.Score.string = 
        this.Checkpoint.string = 
        this.TargetScore.string = 0;
    },

    /**
     * 启动倒计时
     */
    StartTime(){
        this.TimeProgressBar.progress = 1;
        this.timer = setInterval(() => {
            if (this.PauseState){
                this.TimeProgressBar.progress = this.TimeProgressBar.progress;
            }else{
                this.TimeProgressBar.progress = this.TimeProgressBar.progress - 0.001;
                /*if(this.TimeProgressBar.progress <=0.9){
                    var action1 = cc.fadeTo(0.1,100);
                    var action2 = cc.fadeTo(0.1,255);
                    cc.log(this.TimeProgressBar.progress.toFixed(1));
                    if(this.TimeProgressBar.progress <= 0.4){
                        this.TimeProgressBar.node.runAction(action1);
                    };
                    if(this.TimeProgressBar.progress <= 0.3){
                        this.TimeProgressBar.node.runAction(action2);
                    };
                    if(this.TimeProgressBar.progress <= 0.2){
                        this.TimeProgressBar.node.runAction(action1);
                    };
                    if(this.TimeProgressBar.progress <= 0.1){
                        this.TimeProgressBar.node.runAction(action1);
                    };
                };*/
                if(this.TimeProgressBar.progress <= 0){
                    clearInterval(this.timer);
                    this.GameOver();
                };
            };
        }, this.InitTime);
    }, 
    /**
     * 设置关卡数
     */
    SetLevel(){
        let level = cc.sys.localStorage.getItem('level');
        if(!level){
            cc.sys.localStorage.setItem('level',1);
        };

        this.Checkpoint.string = `${cc.sys.localStorage.getItem('level')}`;
    },

    /**
     * 确定过关目标分数
     * 目标分数根据关卡关数确定 难度累加率为
     *  基数 1000
     *  每关递增500分
     * 
     * 
     */
    CreateTargetScor(){
        let level = cc.sys.localStorage.getItem('level') - 1;
        let targetScoreBase = 1000;
        let inc = 500;
        let targetScore = targetScoreBase + inc * level;
        //this.TargetScore.string = targetScore > 5000?5000:targetScore;
        this.TargetScore.string = targetScore;
    },

    /**
     * 生成物品 需要根据目标分来生成 生成的所有物品总分必须比目标过关分数高20%
     * 生成的物品数量在 10-30
     */
    CreateItem(){
        let scoreBase = this.TargetScore.string + this.TargetScore.string * 0.2;
        let Range = parseInt(Math.random() * 20 + 10);
        //先从分数小的 加起来
        // 如果数量 超过范围限制的数量则删除1个添加一个大分数更大一点的 如果还超出范围 删除两个小的..

        //排序，将物品按分数排序
        let itemArr = this.sortItems();
        
        let newItemArr = this.CreateCalc(itemArr);
        //生成相应的Prfab
        newItemArr.forEach(item => {
            let node = cc.instantiate(this.Prefab[item._name]);
            let XY = this.randomXY();
            node.parent = this.itemArea;
            node.setPosition(XY);
        });
    },

    /**
     * 随机坐标
     */
    randomXY(){
        //x = 屏幕宽度 / 2 * 随机数
        //y = 地平面位置 + 随机数cc.random0To1() +高度范围（可以说是Y的最小点）
        //地平面位置 = 地面y + 地面 高度 / 2
        // - 30是因为物品锚点在中间位置 设置坐标到范围定点的时候 会有部分超出
        let groundY = this.itemArea.y + this.itemArea.height / 2;
        let randX = (this.itemArea.width - 30) / 2 * cc.randomMinus1To1();
        let randY = (this.itemArea.height- 30) / 2 * cc.randomMinus1To1();
        return cc.p(randX,randY);
    },

    /**
     * 排序物品
     */
    sortItems(){
        
        let newArr = [];

        for(let key in ItemAttr){
            ItemAttr[key].name = key;
            newArr.push(ItemAttr[key]);
        };

        newArr.sort(function(a,b){
            return a.score > b.score?1:-1;
        });

        return newArr;
    },
    
    /**
     * 生成所需的物品清单 每关递增一个钻石 保证最小分数下够分过关
     */
    CreateCalc(){
        //鞋子1-3个
        let sh = this.createRandm(2,4);
        //石头3-4个
        let st = this.createRandm(3,4);
        //宝石1-3个
        let g = this.createRandm(2,4);
        //鱼8-16个
        let f0 = this.createRandm(1,2);
        let f1 = this.createRandm(1,2);
        let f2 = this.createRandm(3,4);
        let f3 = this.createRandm(1,2);
        let f4 = this.createRandm(3,4);
        let f5 = this.createRandm(2,3);

        let list = [
            {name : 'sh',num : sh},
            {name : 'st',num : st},
            {name : 'g',num : g},
            {name : 'f0',num : f0},
            {name : 'f1',num : f1},
            {name : 'f2',num : f2},
            {name : 'f3',num : f3},
            {name : 'f4',num : f4},
            {name : 'f5',num : f5},

        ];

        let createItemArr = [];

        list.forEach(item => {

            switch(item.name){
                case 'sh':
                    createItemArr = [...createItemArr,...this.CreateItemType('Shoes-',0,1,0,0,sh)];
                    break;
                case 'st':
                    createItemArr = [...createItemArr,...this.CreateItemType('Stone-',0,3,0,0,st)];
                    break;
                case 'g':
                    createItemArr = [...createItemArr,...this.CreateItemType('Gem',0,0,0,0,g)];
                    break;
                case 'f0':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',0,0,0,0,f0)];
                    break;
                case 'f1':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',1,1,0,0,f1)];
                    break;
                case 'f2':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',2,2,0,0,f2)];
                    break; 
                case 'f3':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',3,3,0,0,f3)];
                    break; 
                case 'f4':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',4,4,0,0,f4)];
                    break;  
                case 'f5':
                    createItemArr = [...createItemArr,...this.CreateItemType('Fish-',5,5,0,0,f5)];
                    break;   
            };
        });
        //每关累加1个钻石
        var level = cc.sys.localStorage.getItem('level') - 1;
        if (level == 9){
        createItemArr = [...createItemArr,...this.CreateItemType('Gem',0,0,0,0,level-5)];
        };
        return createItemArr;
    },
    /**
     * 分类创建物品
     */
    CreateItemType(name,a1,a2,b1,b2,num){
        let arr = [];
        for(let i=0;i<num;i++){
            //拼接name
            let min = this.createRandm(a1,a2);
            let max = this.createRandm(b1,b2);
            let str = '';
            if(name == 'Gem'){
                str = name;
            }else{
                str = name + min;
            };
            arr.push(this.Prefab[str]);
        };
        return arr;
    },

    /**
     * 生成n-m随机数
     */
    createRandm(n,m){
        m += 1;
        let a = m - n;
        let num = Math.random()*a + n;
        return parseInt(num);
    },

    /**
     * @description 关闭绳子状态
     */
    StopHookMove(){
        this.HookState = 0;
        this.Hook.height = this.HookHeight;
        //停止播放拉回动画
        this.MinerAnimation.stop('PullRope');
        //重置发射钩子速度
        this.speed = 3;
    },

    /**
     * @description 处理拉回的物品，删除物品以及添加得分
     */
    Handle(items){
        this.AddScore(items);
        this.RemoveItem(items);
    },

    /**
     * @description 删除物品
     */
    RemoveItem(items){
        items.forEach(item => {
            item.destroy();
        });
    },
    /**
     * @description 添加得分
     */
    AddScore(items){
        if(!items[0])return;
        let scoreCon = ItemAttr[items[0].name] || {};
        this.Score.string = parseInt(this.Score.string) + (scoreCon.score || 0);
        //加分提示
        this.AddScorelabel.string = '+' + scoreCon.score;
        let action =  cc.sequence(cc.scaleTo(0.35,1,1),cc.scaleTo(0.55,0,0));
        this.AS.runAction(action);
        //播放得分音效
        cc.audioEngine.play(this.AddScroeAudio);
    },

    /**
     * 暂停游戏
     */
    _GamePauseAminationCallBack(){
        cc.game.pause();
        this.PauseState = true;
    },

    /**
     * 显示Mask
     */
    ShowMask(){
        //显示弹出框
        let finished = cc.callFunc(this._GamePauseAminationCallBack,this);
        let action =  cc.sequence(cc.scaleTo(0.55,1,1),finished);
        let str = '';
        let stri = '暂停';
        action.easing(cc.easeBounceOut(0.3));
        //修改显示的文字
        if(this.victory == 1){
            str = '下一关';
            stri = '胜利';
            cc.audioEngine.play(this.WinAudio,false);
        }else if(this.victory == 2){
            str = '退出';
            stri = '失败';
            cc.audioEngine.play(this.FailureAudio,false);
        }else{
            str = '继续';
            stri = '暂停';
        };
        this.GameOverBtn.children[0].getComponent(cc.Label).string = str;
        this.changelabel.string = stri;
        this.Mask.runAction(action);
    },

    /**
     * 恢复游戏，关闭弹出框
     * 如果是游戏通关原因而打开的弹出框不予理睬
     */
    CloseMask(){
        if(this.victory)return;
        let action = cc.scaleTo(0.2,0,0);
        cc.game.resume();
        this.Mask.runAction(action);
        this.PauseState = false;
    },

    /**
     * 重玩本关
     */
    Reload(){
        cc.audioEngine.stopAll();
        cc.game.resume();
        //停止倒计时
        this.timer&&clearInterval(this.timer);
        //重载场景
        cc.director.loadScene('Game');
    },

    /**
     * 继续下一关
     */
    Next(){
        
        switch(this.victory){
            case 0:
                //继续游戏
                this.CloseMask();
                break;
            case 1:
                //胜利
                let cur = this.Checkpoint.string.match(/\d+/)[0];
                cc.sys.localStorage.setItem('level',parseInt(cur)+1);
                this.Reload();
                break;
            case 2:
                //退出游戏
                this.ExitGame();
            break;
        };
    },

    /**
     * 退出游戏 返回上一个场景
     */
    ExitGame(){
        cc.game.resume();
        cc.director.loadScene('Index');
    },

    /**
     * 游戏结束
     * 胜利或失败都视为游戏结束
     */
    GameOver(){
        //判断用户得分是否超过目标分
        let s = 0;

        if(this.Score.string >= this.TargetScore.string){
            s = 1;
        }else{
            //游戏失败
            s = 2;
        };
        this.victory = s;
        this.ShowMask();
    },

    // start () {

    // },
    ProgressBarCtrl(){
        if (this.TimeProgressBar.progress <= 0.15){
            if(this.ProgressBarState){
                this.TimeProgressBar.node.opacity = this.TimeProgressBar.node.opacity - 8;
                if (this.TimeProgressBar.node.opacity <= 50){
                    this.ProgressBarState = false;
                };
            }else{
                this.TimeProgressBar.node.opacity = this.TimeProgressBar.node.opacity + 8;
                if (this.TimeProgressBar.node.opacity >= 253){
                    this.ProgressBarState = true;
                };
            };

        };
    },
    update (dt) {
        this.emitHook();
        this.HookRoTate();
        this.ProgressBarCtrl();
    },
});
