// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html
import ItemAttr from './Config';
cc.Class({
    extends: cc.Component,

    properties: {
        //爆炸音效
        BoombAudio:{
            default : null,
            url : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:
    //这个只是当前挂在了这个组件的节点初始完成执行，start 是所有节点初始完成执行
    // onLoad () {},

    start () {
        //初始化 放到update里执行，必须等待canvas的prefab加载完事后才执行初始化
        this.init();
    },
    /**
     * @description 初始化 所有东西需要在动态资源加载完成后进行初始化
     */
    init(){
        //获取Main 组件 需要先获取节点
        this.Canvas = cc.find('Canvas');
        this.Main = this.Canvas.getComponent('Main');
        this.Prefab = this.Main.Prefab;
        //获取钩子下item节点
        this.Item = cc.find('Canvas/Header/Miner/Hook/item');

        this.Hook = cc.find('Canvas/Header/Miner/Hook');
        this.Boomb = cc.find('Canvas/Header/Miner/Hook/Left/Boomb');
        //监听碰撞
        this.onCollisionEnter = this.onCollisionEnterA;
    },

    /**
     * @description 监听碰撞
     * @param {Object} other 其他与本节点碰撞的节点
     * @param {Object} self 本节点
     */
    onCollisionEnterA(other, self){
        if(this.Main.HookState == 2)return;
        ItemAttr[other.node.name] = ItemAttr[other.node.name] || {};
        this.other = other;
        this.isWall = this.Wall(other);
        cc.log(ItemAttr[other.node.name].name);
        //处理钩子撞墙
        if(this.isWall){
            //拉回钩子
            this.Main.PullBackHook();
            return;
        };

        //根据物品设置拉回钩子速度
        this.Main.SetSpeed(other);
        //播放碰撞音效
        cc.audioEngine.play(this.Main.CollisionAudio);
        //将物品放置钩子上
        this.other.node.y = -(this.Main.Hook.height + 2);
        this.other.node.x = -(this.Main.Hook.width / 2);
        other.node.parent = this.Item;
        other.node.anchorY = 1;
        //判断抓到的是否是鞋子；是 爆炸特效   否 拉回鱼钩
        if(ItemAttr[this.other.node.name].name == "Shoes-1"  || ItemAttr[this.other.node.name].name == "Shoes-0"){
            this.Main.RemoveItem(this.Hook.children[1].children);
            let action1 =  cc.sequence(cc.scaleTo(0.35,1,1),cc.scaleTo(0.35,0,0));
            this.Boomb.runAction(action1);
            //播放爆炸音效
            cc.audioEngine.play(this.BoombAudio,false);
            this.Main.HookState = 3;
        }else{
            this.Main.PullBackHook();
            return;
        };
        if(this.Main.HookState = 3){
            this.Hook.height = this.Hook.height;
            var timeCallback = function () {
                this.Main.PullBackHook();
              }
            this.scheduleOnce(timeCallback, 0.7);
            
        };

    },
    /**
     * @description 删除被勾中的物品再创建被勾中的物品
     */
    MoveItemToHook(){
        if(this.isWall)return;
        this.other.node.y = -(this.Main.Hook.height + 2);
        this.other.node.x = -(this.Main.Hook.width / 2);
    },

    /**
     * @description 返回钩子是否撞墙
     */
    Wall(other){
        return other.node.group == 'Wall';
    },

    update (dt) {
        if(this.other && this.other.node && this.Main.HookState == 2){
            this.MoveItemToHook();

        };
    },
});
