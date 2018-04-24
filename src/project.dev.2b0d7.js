require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof require && require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }
      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, l, l.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof require && require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BtnAudio: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a3614yU+vxKs7QAM6gvc3/2", "BtnAudio");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Audio: {
          default: null,
          type: cc.AudioClip
        }
      },
      playMp3: function playMp3() {}
    });
    cc._RF.pop();
  }, {} ],
  Config: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b35e46X56JFDLgpM8QxzYgM", "Config");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = {
      "Fish-0": {
        score: 40,
        speed: 6
      },
      "Fish-1": {
        score: 60,
        speed: 5
      },
      "Fish-2": {
        score: 100,
        speed: 4
      },
      "Fish-3": {
        score: 150,
        speed: 4
      },
      "Fish-4": {
        score: 200,
        speed: 3
      },
      "Fish-5": {
        score: 300,
        speed: 2
      },
      Drill: {
        score: 500,
        speed: 6
      },
      Gem: {
        score: 500,
        speed: 6
      },
      "Stone-0": {
        score: 10,
        speed: 4
      },
      "Stone-1": {
        score: 10,
        speed: 4
      },
      "Stone-2": {
        score: 10,
        speed: 4
      },
      "Stone-3": {
        score: 10,
        speed: 4
      },
      "Shoes-0": {
        score: 15,
        speed: 6
      },
      "Shoes-1": {
        score: 15,
        speed: 6
      },
      "Bone-0": {
        score: 10,
        speed: 5
      },
      "Bone-1": {
        score: 10,
        speed: 5
      },
      "Bone-2": {
        score: 50,
        speed: 3
      },
      "Bone-3": {
        score: 10,
        speed: 5
      }
    };
    module.exports = exports["default"];
    cc._RF.pop();
  }, {} ],
  GameSellect: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3296fCI/1tKv6rw944mt7uV", "GameSellect");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        Group: {
          type: cc.Node,
          default: []
        },
        Clickaudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        var BackmenuBtn = cc.find("Canvas/BackGround/Button/BackmenuBtn");
        var LeftBtn = cc.find("Canvas/BackGround/Button/LeftBtn");
        var RightBtn = cc.find("Canvas/BackGround/Button/RightBtn");
        this.State = 0;
        this.GameSellectState = 0;
        this.MenuBtn0 = cc.find("Canvas/BackGround/MenuSprite/Group0/MenuBtn0");
        this.MenuBtn1 = cc.find("Canvas/BackGround/MenuSprite/Group1/MenuBtn1");
        this.MenuBtn2 = cc.find("Canvas/BackGround/MenuSprite/Group2/MenuBtn2");
        this.MenuBtn3 = cc.find("Canvas/BackGround/MenuSprite/Group3/MenuBtn3");
        BackmenuBtn.on(cc.Node.EventType.TOUCH_END, this.Backmenu.bind(this));
        LeftBtn.on(cc.Node.EventType.TOUCH_END, this.LeftBtnClicked.bind(this));
        RightBtn.on(cc.Node.EventType.TOUCH_END, this.RightBtnClicked.bind(this));
        this.MenuBtn0.on(cc.Node.EventType.TOUCH_END, this.MenuBtn0Clicked.bind(this));
        this.MenuBtn1.on(cc.Node.EventType.TOUCH_END, this.MenuBtn1Clicked.bind(this));
        this.MenuBtn2.on(cc.Node.EventType.TOUCH_END, this.MenuBtn2Clicked.bind(this));
        this.MenuBtn3.on(cc.Node.EventType.TOUCH_END, this.MenuBtn3Clicked.bind(this));
        this.LRBtninit();
        cc.director.preloadScene("Index");
        cc.director.preloadScene("Game");
      },
      Backmenu: function Backmenu() {
        cc.audioEngine.play(this.Clickaudio, false);
        cc.director.loadScene("Index");
      },
      LeftBtnClicked: function LeftBtnClicked() {
        cc.audioEngine.play(this.Clickaudio, false);
        if (0 == this.State) {
          this.State = 3;
          this.Group[0].active = false;
          this.Group[3].active = true;
        } else {
          this.Group[this.State].active = false;
          this.State--;
          this.Group[this.State].active = true;
        }
      },
      RightBtnClicked: function RightBtnClicked() {
        cc.audioEngine.play(this.Clickaudio, false);
        if (3 == this.State) {
          this.State = 0;
          this.Group[3].active = false;
          this.Group[0].active = true;
        } else {
          this.Group[this.State].active = false;
          this.State++;
          this.Group[this.State].active = true;
        }
      },
      LRBtninit: function LRBtninit() {
        this.Group[0].active = true;
        this.Group[1].active = false;
        this.Group[2].active = false;
        this.Group[3].active = false;
      },
      MenuBtn0Clicked: function MenuBtn0Clicked() {
        this.GameSellectState = 0;
        this.StartGame();
      },
      MenuBtn1Clicked: function MenuBtn1Clicked() {
        this.GameSellectState = 1;
        this.StartGame();
      },
      MenuBtn2Clicked: function MenuBtn2Clicked() {
        this.GameSellectState = 2;
        this.StartGame();
      },
      MenuBtn3Clicked: function MenuBtn3Clicked() {
        this.GameSellectState = 3;
        this.StartGame();
      },
      StartGame: function StartGame() {
        cc.sys.localStorage.removeItem("level");
        cc.sys.localStorage.setItem("GameSellectState", this.GameSellectState);
        cc.director.loadScene("Game");
      }
    });
    cc._RF.pop();
  }, {} ],
  Hook: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "896bfTFm6FIO5iNupN74M8c", "Hook");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        this.init();
      },
      init: function init() {
        this.Canvas = cc.find("Canvas");
        this.Main = this.Canvas.getComponent("Main");
        this.Prefab = this.Main.Prefab;
        this.Item = cc.find("Canvas/Header/Miner/Hook/item");
        this.onCollisionEnter = this.onCollisionEnterA;
      },
      onCollisionEnterA: function onCollisionEnterA(other, self) {
        if (2 == this.Main.HookState) return;
        this.other = other;
        this.isWall = this.Wall(other);
        if (this.isWall) {
          this.Main.PullBackHook();
          return;
        }
        this.Main.SetSpeed(other);
        cc.audioEngine.play(this.Main.CollisionAudio);
        this.other.node.y = -(this.Main.Hook.height + 2);
        this.other.node.x = -this.Main.Hook.width / 2;
        other.node.parent = this.Item;
        other.node.anchorY = 1;
        this.Main.PullBackHook();
      },
      MoveItemToHook: function MoveItemToHook() {
        if (this.isWall) return;
        this.other.node.y = -(this.Main.Hook.height + 2);
        this.other.node.x = -this.Main.Hook.width / 2;
      },
      Wall: function Wall(other) {
        return "Wall" == other.node.group;
      },
      update: function update(dt) {
        this.other && this.other.node && 2 == this.Main.HookState && this.MoveItemToHook();
      }
    });
    cc._RF.pop();
  }, {} ],
  IndexMain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "46088f+PFdImIKRq5WDOvy+", "IndexMain");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        BGM: {
          default: null,
          url: cc.AudioClip
        },
        Clickaudio: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        cc.director.setDisplayStats(false);
        this.rotateSpeed = .5;
        this.FishRoll = cc.find("Canvas/FishRoll");
        var startBtn = cc.find("Canvas/Start");
        startBtn.on(cc.Node.EventType.TOUCH_END, this.StartGameSellect.bind(this));
        this.BGM_ID = cc.audioEngine.play(this.BGM, true);
        cc.director.preloadScene("GameSellect");
      },
      StartGameSellect: function StartGameSellect() {
        cc.audioEngine.play(this.Clickaudio, false);
        cc.audioEngine.stop(this.BGM_ID);
        cc.director.loadScene("GameSellect");
      },
      HookRoTate: function HookRoTate() {
        this.FishRoll.rotation >= 35 ? this.rotateSpeed = -this.rotateSpeed : this.FishRoll.rotation <= -35 && (this.rotateSpeed = Math.abs(this.rotateSpeed));
        this.FishRoll.rotation += this.rotateSpeed;
      },
      update: function update(dt) {
        this.HookRoTate();
      }
    });
    cc._RF.pop();
  }, {} ],
  Main: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a7abbtxvtpLoq5yORxKD06b", "Main");
    "use strict";
    var _Config = require("./Config");
    var _Config2 = _interopRequireDefault(_Config);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
        return arr2;
      }
      return Array.from(arr);
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        speed: {
          default: 3,
          displayName: "钩子速度"
        },
        rotateSpeed: {
          default: 1,
          displayName: "钩子旋转速度"
        },
        HookRange: {
          default: 70,
          displayName: "钩子旋转角度范围"
        },
        Prefabs: {
          default: [],
          type: cc.Prefab
        },
        InitTime: {
          default: 10
        },
        CollisionAudio: {
          default: null,
          url: cc.AudioClip
        },
        AddScroeAudio: {
          default: null,
          url: cc.AudioClip
        },
        WinAudio: {
          default: null,
          url: cc.AudioClip
        },
        FailureAudio: {
          default: null,
          url: cc.AudioClip
        },
        BackGround: {
          default: [],
          type: cc.Node
        },
        TimeProgressBar: {
          default: null,
          type: cc.ProgressBar
        },
        BGM0: {
          default: null,
          url: cc.AudioClip
        },
        BGM1: {
          default: null,
          url: cc.AudioClip
        },
        BGM2: {
          default: null,
          url: cc.AudioClip
        },
        BGM3: {
          default: null,
          url: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.init();
        cc.director.preloadScene("Index");
      },
      init: function init() {
        var _this = this;
        this.GameSellectState = cc.sys.localStorage.getItem("GameSellectState");
        this.GameBackgroundInit();
        this.TimeProgressBarInit();
        this.Miner = cc.find("Canvas/Header/Miner");
        this.Hook = cc.find("Canvas/Header/Miner/Hook");
        this.HookHeight = this.Hook.height;
        this.HookState = 0;
        this.Score = cc.find("Canvas/Header/Info/ScoreAndTarget/Score").getComponent(cc.Label);
        this.TargetScore = cc.find("Canvas/Header/Info/ScoreAndTarget/Target").getComponent(cc.Label);
        this.Checkpoint = cc.find("Canvas/Header/Info/CheckpointAndTime/Checkpoint").getComponent(cc.Label);
        this.changelabel = cc.find("Canvas/Mask/background/Pause").getComponent(cc.Label);
        this.MinerAnimation = cc.find("Canvas/Header/Miner").getComponent(cc.Animation);
        this.itemArea = cc.find("Canvas/ItemArea");
        this.manager = cc.director.getCollisionManager();
        this.manager.enabled = true;
        this.Prefab = {};
        this.Prefabs.forEach(function(item) {
          _this.Prefab[item._name] = item;
        });
        var emitHook = cc.find("Canvas/emitHookBtn");
        var ReloadBtn = cc.find("Canvas/Mask/ReloadBtn");
        var MenuBtn = cc.find("Canvas/Mask/MenuBtn");
        var PauseBtn = cc.find("Canvas/Pause");
        this.Mask = cc.find("Canvas/Mask");
        this.GameOverBtn = cc.find("Canvas/Mask/GameOverBtn");
        this.Mask.on(cc.Node.EventType.TOUCH_END, this.CloseMask.bind(this));
        this.GameOverBtn.on(cc.Node.EventType.TOUCH_END, this.Next.bind(this));
        emitHook.on(cc.Node.EventType.TOUCH_END, this.emitHookBtn.bind(this));
        ReloadBtn.on(cc.Node.EventType.TOUCH_END, this.Reload.bind(this));
        MenuBtn.on(cc.Node.EventType.TOUCH_END, this.BackMenu.bind(this));
        PauseBtn.on(cc.Node.EventType.TOUCH_END, this.ShowMask.bind(this));
        this.ResetInfo();
        this.StartTime();
        this.SetLevel();
        this.CreateTargetScor();
        this.CreateItem();
      },
      GameBackgroundInit: function GameBackgroundInit() {
        var newBGMArr = [ this.BGM0, this.BGM1, this.BGM2, this.BGM3 ];
        this.BackGround[this.GameSellectState].active = true;
        this.BGM_ID = cc.audioEngine.play(newBGMArr[this.GameSellectState], true, .5);
      },
      TimeProgressBarInit: function TimeProgressBarInit() {
        this.TimeProgressBar.progress = 1;
      },
      BackMenu: function BackMenu() {
        cc.audioEngine.stopAll();
        cc.game.resume();
        cc.director.loadScene("GameSellect");
      },
      HookRoTate: function HookRoTate() {
        if (this.HookState) return;
        this.Hook.rotation >= 70 ? this.rotateSpeed = -this.rotateSpeed : this.Hook.rotation <= -70 && (this.rotateSpeed = Math.abs(this.rotateSpeed));
        this.Hook.rotation += this.rotateSpeed;
      },
      emitHookBtn: function emitHookBtn() {
        if (this.HookState) return;
        this.HookState = 1;
      },
      emitHook: function emitHook() {
        switch (this.HookState) {
         case 1:
          this.Hook.height += this.speed;
          break;

         case 2:
          if (this.Hook.height <= this.HookHeight) {
            this.Hook.children[1].childrenCount && this.Handle(this.Hook.children[1].children);
            this.StopHookMove();
          } else this.Hook.height -= this.speed;
        }
      },
      PullBackHook: function PullBackHook() {
        this.MinerAnimation.play("PullRope");
        this.HookState = 2;
      },
      SetSpeed: function SetSpeed(other) {
        _Config2.default[other.node.name] = _Config2.default[other.node.name] || {};
        this.speed = _Config2.default[other.node.name].speed || 3;
      },
      ResetInfo: function ResetInfo() {
        this.victory = this.Score.string = this.Checkpoint.string = this.TargetScore.string = 0;
      },
      StartTime: function StartTime() {
        var _this2 = this;
        this.TimeProgressBar.progress = 1;
        this.timer = setInterval(function() {
          if (_this2.PauseState) _this2.TimeProgressBar.progress = _this2.TimeProgressBar.progress; else {
            _this2.TimeProgressBar.progress = _this2.TimeProgressBar.progress - .001;
            if (_this2.TimeProgressBar.progress <= 0) {
              clearInterval(_this2.timer);
              _this2.GameOver();
            }
          }
        }, this.InitTime);
      },
      SetLevel: function SetLevel() {
        var level = cc.sys.localStorage.getItem("level");
        level || cc.sys.localStorage.setItem("level", 1);
        this.Checkpoint.string = "" + cc.sys.localStorage.getItem("level");
      },
      CreateTargetScor: function CreateTargetScor() {
        var level = cc.sys.localStorage.getItem("level") - 1;
        var targetScoreBase = 1e3;
        var inc = 500;
        var targetScore = targetScoreBase + inc * level;
        this.TargetScore.string = targetScore > 5e3 ? 5e3 : targetScore;
      },
      CreateItem: function CreateItem() {
        var _this3 = this;
        var scoreBase = this.TargetScore.string + .2 * this.TargetScore.string;
        var Range = parseInt(20 * Math.random() + 10);
        var itemArr = this.sortItems();
        var newItemArr = this.CreateCalc(itemArr);
        newItemArr.forEach(function(item) {
          var node = cc.instantiate(_this3.Prefab[item._name]);
          var XY = _this3.randomXY();
          node.parent = _this3.itemArea;
          node.setPosition(XY);
        });
      },
      randomXY: function randomXY() {
        var groundY = this.itemArea.y + this.itemArea.height / 2;
        var randX = (this.itemArea.width - 30) / 2 * cc.randomMinus1To1();
        var randY = (this.itemArea.height - 30) / 2 * cc.randomMinus1To1();
        return cc.p(randX, randY);
      },
      sortItems: function sortItems() {
        var newArr = [];
        for (var key in _Config2.default) {
          _Config2.default[key].name = key;
          newArr.push(_Config2.default[key]);
        }
        newArr.sort(function(a, b) {
          return a.score > b.score ? 1 : -1;
        });
        return newArr;
      },
      CreateCalc: function CreateCalc() {
        var _this4 = this;
        var sh = this.createRandm(2, 4);
        var st = this.createRandm(3, 4);
        var g = this.createRandm(2, 4);
        var f = this.createRandm(11, 15);
        var list = [ {
          name: "sh",
          num: sh
        }, {
          name: "st",
          num: st
        }, {
          name: "g",
          num: g
        }, {
          name: "f",
          num: f
        } ];
        var createItemArr = [];
        list.forEach(function(item) {
          switch (item.name) {
           case "sh":
            createItemArr = [].concat(_toConsumableArray(createItemArr), _toConsumableArray(_this4.CreateItemType("Shoes-", 0, 1, 0, 0, sh)));
            break;

           case "st":
            createItemArr = [].concat(_toConsumableArray(createItemArr), _toConsumableArray(_this4.CreateItemType("Stone-", 0, 3, 0, 0, st)));
            break;

           case "g":
            createItemArr = [].concat(_toConsumableArray(createItemArr), _toConsumableArray(_this4.CreateItemType("Gem", 0, 0, 0, 0, g)));
            break;

           case "f":
            createItemArr = [].concat(_toConsumableArray(createItemArr), _toConsumableArray(_this4.CreateItemType("Fish-", 0, 5, 0, 0, f)));
          }
        });
        var level = cc.sys.localStorage.getItem("level") - 1;
        createItemArr = [].concat(_toConsumableArray(createItemArr), _toConsumableArray(this.CreateItemType("Gem", 0, 0, 0, 0, level)));
        return createItemArr;
      },
      CreateItemType: function CreateItemType(name, a1, a2, b1, b2, num) {
        var arr = [];
        for (var i = 0; i < num; i++) {
          var min = this.createRandm(a1, a2);
          var max = this.createRandm(b1, b2);
          var str = "";
          str = "Gem" == name ? name : name + min;
          arr.push(this.Prefab[str]);
        }
        return arr;
      },
      createRandm: function createRandm(n, m) {
        m += 1;
        var a = m - n;
        var num = Math.random() * a + n;
        return parseInt(num);
      },
      StopHookMove: function StopHookMove() {
        this.HookState = 0;
        this.Hook.height = this.HookHeight;
        this.MinerAnimation.stop("PullRope");
        this.speed = 3;
      },
      Handle: function Handle(items) {
        this.AddScore(items);
        this.RemoveItem(items);
      },
      RemoveItem: function RemoveItem(items) {
        items.forEach(function(item) {
          item.destroy();
        });
      },
      AddScore: function AddScore(items) {
        if (!items[0]) return;
        var scoreCon = _Config2.default[items[0].name] || {};
        this.Score.string = parseInt(this.Score.string) + (scoreCon.score || 0);
        cc.audioEngine.play(this.AddScroeAudio);
      },
      _GamePauseAminationCallBack: function _GamePauseAminationCallBack() {
        cc.game.pause();
        this.PauseState = true;
      },
      ShowMask: function ShowMask() {
        var finished = cc.callFunc(this._GamePauseAminationCallBack, this);
        var action = cc.sequence(cc.scaleTo(.3, 1, 1), finished);
        var str = "";
        var stri = "暂停";
        action.easing(cc.easeBounceOut(.3));
        if (1 == this.victory) {
          str = "下一关";
          stri = "胜利";
          cc.audioEngine.play(this.WinAudio, false);
        } else if (2 == this.victory) {
          str = "退出";
          stri = "失败";
          cc.audioEngine.play(this.FailureAudio, false);
        } else {
          str = "继续";
          stri = "暂停";
        }
        this.GameOverBtn.children[0].getComponent(cc.Label).string = str;
        this.changelabel.string = stri;
        this.Mask.runAction(action);
      },
      CloseMask: function CloseMask() {
        if (this.victory) return;
        var action = cc.scaleTo(.2, 0, 0);
        cc.game.resume();
        this.Mask.runAction(action);
        this.PauseState = false;
      },
      Reload: function Reload() {
        cc.audioEngine.stopAll();
        cc.game.resume();
        this.timer && clearInterval(this.timer);
        cc.director.loadScene("Game");
      },
      Next: function Next() {
        switch (this.victory) {
         case 0:
          this.CloseMask();
          break;

         case 1:
          var cur = this.Checkpoint.string.match(/\d+/)[0];
          cc.sys.localStorage.setItem("level", parseInt(cur) + 1);
          this.Reload();
          break;

         case 2:
          this.ExitGame();
        }
      },
      ExitGame: function ExitGame() {
        cc.game.resume();
        cc.director.loadScene("Index");
      },
      GameOver: function GameOver() {
        var s = 0;
        s = this.Score.string >= this.TargetScore.string ? 1 : 2;
        this.victory = s;
        this.ShowMask();
      },
      update: function update(dt) {
        this.emitHook();
        this.HookRoTate();
      }
    });
    cc._RF.pop();
  }, {
    "./Config": "Config"
  } ]
}, {}, [ "BtnAudio", "GameSellect", "Config", "Hook", "Main", "IndexMain" ]);