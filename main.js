"use strict"

//import {Game} from './engin'

const DEVELOP_MODE = true;
const DEVELOP_SPEED = 2;
const FPS = 33;                                 // フレームレート
const FONT = "'ＭＳ ゴシック'";                  // 使用フォント
const FONT_SIZE = 10;                           // 使用フォントサイズ
const FONT_STYLE = "rgba(255, 255, 255, 0.8)";  // 文字色
const WINDOW_STYLE = "rgba(0, 0, 0, 0.8)";      // 情報ウィンドウの色
const SCREEN_WIDTH = 128;                       // 仮想画面サイズ 幅（ドット）
const SCREEN_HEIGHT = 120;                      // 仮想画面サイズ 高さ（ドット）
const TILE_SIZE = 8;                            // タイルサイズ（ドット）
const CHAR_WIDTH = 8;                           // キャラの幅（ドット）
const CHAR_HEIGHT = 9;                          // キャラの高さ（ドット）
const ANGLE_DOWN = 0                            // キャラの向きインデックス 下
const ANGLE_LEFT = 1                            // キャラの向きインデックス 左
const ANGLE_RIGHT = 2                           // キャラの向きインデックス 右
const ANGLE_UP = 3                              // キャラの向きインデックス 上

const START_X = 15;                             // プレイヤー開始x座標（タイル）
const START_Y = 17;                             // プレイヤー開始y座標（タイル）
const MAP_COLUMN = 32;                          // マップ幅（タイル）
const MAP_ROW = 32;                             // マップ高さ（タイル）
const MAP_CHIP_COLUMN = 4;                      // マップチップ桁数（タイル）
const MAP_CHIP_ROW = 4;                         // マップチップ行数（タイル）
const FIELD_MAP = {                             // マップ マップチップのタイルインデックスで定義
    "main": [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 3, 3, 7, 7, 7, 7, 7, 7, 7, 7, 7, 6, 6, 3, 6, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 3, 3, 6, 6, 7, 7, 7, 2, 2, 2, 7, 7, 7, 7, 7, 7, 7, 6, 3, 0, 0, 0, 3, 3, 0, 6, 6, 6, 0, 0, 0,
        0, 0, 3, 3, 6, 6, 6, 7, 7, 2, 2, 2, 7, 7, 2, 2, 2, 7, 7, 6, 3, 3, 3, 6, 6, 3, 6,13, 6, 0, 0, 0,
        0, 3, 3,10,11, 3, 3, 6, 7, 7, 2, 2, 2, 2, 2, 2, 1, 1, 7, 6, 6, 6, 6, 6, 3, 0, 6, 6, 6, 0, 0, 0,
        0, 0, 3, 3, 3, 0, 3, 3, 3, 7, 7, 2, 2, 2, 2, 7, 7, 1, 1, 6, 6, 6, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 7, 7, 7, 7, 2, 7, 6, 3, 1, 3, 6, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 7, 2, 7, 6, 3, 1, 3, 3, 6, 6, 3, 0, 0, 0, 3, 3, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 0, 3, 3, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 6, 7, 7, 7, 6, 3, 1, 1, 3, 3, 6, 3, 3, 0, 3,12, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 7, 7, 6, 3, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 6, 6, 6, 6, 3, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 6, 6, 3, 3, 3, 3, 1, 1, 3, 3, 3, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 5, 3, 3, 3, 6, 6, 6, 3, 3, 3, 1, 1, 1, 1, 1, 3, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 8, 9, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 3, 3, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 3, 3, 3, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 3, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 6, 3, 6, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 6, 3, 6, 6, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 6, 3, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,14, 6, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0,
        7,15, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 0, 0, 0, 0, 0,
        7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 7, 7, 7, 7, 7,
  ]
};

let frame = 0;                          // 内部カウンタ

class DragonQuestGame extends Game {
    constructor() {
        super('DQ', SCREEN_WIDTH, SCREEN_HEIGHT, FPS);
        const titleScene = new gameTitle(this.canvas, this.screenCanvas);
        this.changeScene(titleScene);
    }
}

class gameTitle extends Scene {
    constructor(canvas, renderingTarget) {
        super(canvas, renderingTarget);
        this.name = "title"
        this.texts = [
            "スペースキーでスタート"
            , ""
            , "操作方法"
            , "上：Wキー"
            , "左：Aキー"
            , "下：Sキー"
            , "右：Dキー"
            , "話しかける：スペースキー"
        ]
    }

    update(gameInfo, input) {
        if(input.getKeyDown(' ')) {
            const mainScene = new FieldMap(this.canvas, this.renderingTarget);
            this.changeScene(mainScene);
        }
        this._drawAll();
    }

    /**
     * 全ての要素を一括描画
     */
    _drawAll() {
        const lineHeight = 1.1618;
        const fontSize = 20

        this.canvasContext.fillStyle = "black";                   // メッセージウィンドウ
        this.canvasContext.fillRect(0, 0, this.targetWidth, this.targetHeight)
        this.canvasContext.font = fontSize + "px" + FONT;
        this.canvasContext.fillStyle =  FONT_STYLE;
        for(let i = 0; i < this.texts.length; i++)
        this.canvasContext.fillText(
            this.texts[i]
            , (this.targetWidth - this.texts[i].length * fontSize) / 2
            , this.targetHeight / 2 + lineHeight * fontSize * i
        );

        this.canvasContext.drawImage(
            this.renderingTarget
            , 0
            , 0
            , this.renderingTarget.width
            , this.renderingTarget.height
            , 0
            , 0
            , this.targetWidth
            , this.targetHeight
        );
    }
}

/**
 * フィールドマップシーンクラス
 */
class FieldMap extends Scene {
    /**
     * コンストラクタ
     * @param {Object} canvas   マップの種類
     * @param {Object} renderingTarget 描画対象
     */
    constructor(canvas, renderingTarget) {
        super(canvas, renderingTarget);
        this.img = new Image();
        this.img.src = "img/map.png";                               // マップチップファイル
        this.name = "field map"
        this.middlePointPos = new Vector2(                          // 画面の中心点のドット座標
            SCREEN_WIDTH / 2                                            // 仮想画面サイズの1/2
            , SCREEN_HEIGHT / 2                                         // 仮想画面サイズの1/2
        );
        this.drawRange = new Vector2(                               // 描画範囲
            Math.ceil(this.middlePointPos.x / TILE_SIZE)                // 画面の中心点のドット座標をタイル座標に変換　ドット単位で描画するので小数切り上げで余裕を持って描画する
            , Math.ceil(this.middlePointPos.y / TILE_SIZE)              // 画面の中心点のドット座標をタイル座標に変換　ドット単位で描画するので小数切り上げで余裕を持って描画する   
        );
        
        this.player = new Player();                                 // プレイヤーの定義
        this.character = new Character(["character", "draw"], 23, 20);      // キャラクターの定義　一覧をconfigファイルとかで定義しておいて、一括で実施したい
        this.door1 = new Door(["door"], 18, 27);
        this.building1 = new Building(["building"], 27, 5, ["key1"])
        this.addObject(this.player);
        this.addObject(this.character);
        this.addObject(this.door1);
        this.addObject(this.building1);

        this.camera = new Camera(this.player.position.x, this.player.position.y);
        this._accessDenyTiles = [                                   // 侵入不可タイル
            0, 1, 2, 4, 5, 8, 9, 10, 11, 12, 13, 15
        ];
    }
    /**
     * シーンの更新
     * @param {GameInformation} gameInfo
     */
    update(gameInfo, input) {
        this._updateAll(input);
        this._collisionDetection();//当たり判定を処理する
        this._playerActionDecision();
        this._setCamera();
        this._disposeDestroyedObjects();
        this._clearScreen(gameInfo);
        this._drawAll();
    }

    /**
     * プレイヤーの座標を基準にマップの描画を行う
     * @param {string} type   マップの種類
     * @param {Object} target 描画対象
     * @param {Player} player プレイヤー座標
     */
    mapDraw(type, target) {
        const context = target.getContext("2d");

        let mx;                                                         // 描画するマップタイルのタイル座標 x値
        let my;                                                         // 描画するマップタイルのタイル座標 y値
        let dx;                                                         // 描画イメージ矩形のタイル座標 x値
        let dy;                                                         // 描画イメージ矩形のタイル座標 y値
        let index;                                                      // マップタイルのインデックス
        let drawCorrection = new Vector2(                               // 描画イメージ矩形の補正値　プレイヤーがタイル中央に描画されるように補正する
            this.camera.position.x % TILE_SIZE - this.middlePointPos.x % TILE_SIZE      // プレーヤーのタイル座標 小数部 x値 - 画面中心点のタイル座標 小数部 x値
            , this.camera.position.y % TILE_SIZE - this.middlePointPos.y % TILE_SIZE    // プレーヤーのタイル座標 小数部 y値 - 画面中心点のタイル座標 小数部 y値
        );
        
        for (let y = -this.drawRange.y; y <= this.drawRange.y; y++) {
            my = y + Math.floor(this.camera.position.y / TILE_SIZE);                    // 使用するマップタイルの座標 y値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
            dy = y + Math.floor(this.middlePointPos.y / TILE_SIZE);                     // 描画イメージ矩形の座標 y値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
            for (let x = -this.drawRange.x; x <= this.drawRange.x; x++) {
                mx = x + Math.floor(this.camera.position.x / TILE_SIZE);                     // 使用するマップタイルの座標 x値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
                dx = x + Math.floor(this.middlePointPos.x / TILE_SIZE);                 // 描画イメージ矩形の座標 x値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
                index = getMapIndex(                                                    // 描画するタイルのインデックスを取得
                    type                                                                    // 使用するマップの種類を指定
                    , mx                                                                    // 使用するマップタイルの座標 x値
                    , my                                                                    // 使用するマップタイルの座標 y値
                );

                context.drawImage(
                    this.img                                                            // 描画するイメージ
                    , (index % MAP_CHIP_COLUMN) * TILE_SIZE                             // 元イメージ使用範囲の矩形のx座標
                    , Math.floor(index / MAP_CHIP_ROW) * TILE_SIZE                      // 元イメージ使用範囲の矩形のy座標
                    , TILE_SIZE                                                         // 元イメージ使用範囲の矩形の幅
                    , TILE_SIZE                                                         // 元イメージ使用範囲の矩形の高さ
                    , dx * TILE_SIZE - drawCorrection.x                                 // 描画イメージ矩形のx座標　タイル座標をドット座標に変換
                    , dy * TILE_SIZE - drawCorrection.y                                 // 描画イメージ矩形のy座標　タイル座標をドット座標に変換
                    , TILE_SIZE                                                         // イメージを描画する幅
                    , TILE_SIZE                                                         // イメージを描画する高さ
                );
            }
        }
    }

    /**
     * 全ての要素を一括描画
     */
    _drawAll() {
        this.mapDraw("main", this.renderingTarget);                                 // マップ情報を描画
        this.objects.forEach((obj) => {if(obj.tags.includes("draw")) obj.draw(this.renderingTarget, this.camera)});     // オブジェクト情報を描画
        if(this.isGameEvent) {
            this.gameEvent.draw(this.renderingTarget);
        }

        this.canvasContext.drawImage(                                                   // 仮想画面を実画面に描画
            this.renderingTarget
            , 0
            , 0
            , this.renderingTarget.width
            , this.renderingTarget.height
            , 0
            , 0
            , this.targetWidth
            , this.targetHeight
        );
    }

    /**
     * カメラの位置を更新
     * プレイヤーを中心にマップが動くので、プレイヤー座標をそのままカメラに入れ込んでいる　もうちょっとうまくやりたいような
     */
    _setCamera() {
        const index = this.objects.findIndex((element) => element instanceof Player);

        this.camera.update(this.objects[index].position);
    }
}

/**
 * 扉クラス
 */
class Door extends GameObject {
    /**
     * @param {Array} tags タグ
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags, x, y) {
        super(tags, x, y);
        this.index = getMapIndex(                                   // 描画するタイルのインデックスを取得
            "main"                                                                  // 使用するマップの種類を指定
            , x                                                                     // 使用するマップタイルの座標 x値
            , y                                                                     // 使用するマップタイルの座標 y値
        );
        this.messages = [
            ["カギが必要だ"]
            , ["カギが開いた！"]
        ];
        this.lockFlg = true;
        this.addEventListener("message", (e) => {
            if(e.target.move.mag === 0 && this.lockFlg) {
                let messageEvent;
                if(! e.target.belongings.includes("key1")){
                    messageEvent = new MessageEvent(3, 93, 122, 24, this.messages[0]);
                } else {
                    messageEvent = new MessageEvent(3, 93, 122, 24, this.messages[1]);
                    this.lockFlg = false;
                }
                this.dispatchEvent("startGameEvent", new GameEvent(messageEvent));
                messageEvent.addEventListener("stopGameEvent", (e) => {
                    this.dispatchEvent("stopGameEvent", new GameEvent(e.target))
                });
            }
        });
    }
    update(input) {
    }
}

/**
 * 建物クラス
 */
class Building extends GameObject {
    /**
     * @param {Array} tags タグ
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags, x, y, item) {
        super(tags, x, y);
        this.index = getMapIndex(                                   // 描画するタイルのインデックスを取得
            "main"                                                                  // 使用するマップの種類を指定
            , x                                                                     // 使用するマップタイルの座標 x値
            , y                                                                     // 使用するマップタイルの座標 y値
        );
        this.messages = [
            ["カギを入手した！"]
            , ["もう何もないようだ"]
        ];
        this.item = item;
        this.addEventListener("message", (e) => {
            if(e.target.move.mag === 0) {
                const messageEvent = new MessageEvent(3, 93, 122, 24, this.messages[0]);
                if(this.item.length > 0) {
                    e.target.belongings.push(this.item.shift());
                }
                if(this.messages.length > 1) {
                    this.messages.shift();
                }
                this.dispatchEvent("startGameEvent", new GameEvent(messageEvent));
                messageEvent.addEventListener("stopGameEvent", (e) => {
                    this.dispatchEvent("stopGameEvent", new GameEvent(e.target))
                });
            }
        });
    }
    update(input) {
    }
}

/**
 * キャラクタークラス
 */
class Character extends GameObject {
    /**
     * @param {Array} tags タグ
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags = [], x, y) {
        super(tags, x, y);
        this.img = new Image();
        this.img.src = "img/player.png";                    // キャラチップファイル
        this.angle = 0;                                     // 向き
        this.act = 0;                                       // 動き
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
        this.speed = DEVELOP_MODE ? DEVELOP_SPEED : 1       // 移動スピード
        this.messages = [
            "マオウをたおして！"
            , "ほくとうにむらが にしの\nハテにはまちがあります"
        ];
        this.addEventListener("message", (e) => {
            if(e.target.move.mag === 0 && this.move.mag === 0) {
                const messageEvent = new MessageEvent(3, 93, 122, 24, this.messages);
                const relativeVect = e.target.position.sub(this.position);

                if(relativeVect.x < 0) {
                    this.angle = ANGLE_LEFT;
                } else if (relativeVect.x > 0) {
                    this.angle = ANGLE_RIGHT;
                } else if (relativeVect.y < 0) {
                    this.angle = ANGLE_UP;
                } else if (relativeVect.y > 0) {
                    this.angle = ANGLE_DOWN;
                }
                this.dispatchEvent("startGameEvent", new GameEvent(messageEvent));
                messageEvent.addEventListener("stopGameEvent", (e) => {
                    this.dispatchEvent("stopGameEvent", new GameEvent(e.target))
                });
            }
        });
        this.decisionInterval = 60; // 60フレームごとに判断（1秒間隔）
        this.lastDecisionFrame = 0;
    }
    /**
     * キャラクターの動作の更新
     */
    update(input) {
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0 && frame - this.lastDecisionFrame >= this.decisionInterval) {
            this.lastDecisionFrame = frame;

            const dir = Math.floor(Math.random() * 4);
            switch (dir) {
                case 0:
                    this.move.y = -TILE_SIZE;
                    this.angle = ANGLE_UP;
                    break;
                case 1:
                    this.move.y = TILE_SIZE;
                    this.angle = ANGLE_DOWN;
                    break;
                case 2:
                    this.move.x = -TILE_SIZE;
                    this.angle = ANGLE_LEFT;
                    break;
                case 3:
                    this.move.x = TILE_SIZE;
                    this.angle = ANGLE_RIGHT;
                    break;
            }

            this.destination = this.position.add(this.move);
        }
        this.destination = this.position.add(this.move);
        this.destination = mapLoop(this.destination);

        if (this.move.mag != 0) {                           // 移動距離が0でない場合、座標の更新を行う
            this.position.x += sign(this.move.x) * this.speed;  // 座標の更新　x値
            this.position.y += sign(this.move.y) * this.speed;  // 座標の更新　y値
            this.move.x -= sign(this.move.x) * this.speed;      // 移動距離のx座標が0になるまで減算
            this.move.y -= sign(this.move.y) * this.speed;      // 移動距離のy座標が0になるまで減算

            this.position = mapLoop(this.position);
        }
        this.destinationArea.set(this.destination.x, this.destination.y);
        this.collisionArea.set(this.position.x, this.position.y);
    }
}

/**
 * プレイヤークラス
 */
class Player extends GameObject {
    /**
     * @param {Array} tags タグ
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags = ["character", "player", "draw"], x = START_X, y = START_Y) {
        super(tags, x, y);
        this.img = new Image();
        this.img.src = "img/player.png";                // プレイヤーチップファイル
        this.angle = 0;                                     // 向き
        this.act = 0;                                       // 動き
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
        this.speed = DEVELOP_MODE ? DEVELOP_SPEED : 1       // 移動スピード
        this.actionArea = new Rectangle(0, 0, 0, 0);
        this.belongings = [];
        this.addEventListener("dispatchGameEvent", (e) => {
            this.actionArea.reset();
        });
    }
    /**
     * プレイヤーの描画を行う
     */
    draw(target, camera) {
        const context = target.getContext("2d");

        context.drawImage(
            this.img                                        // 描画するイメージ
            , this.act * CHAR_WIDTH                         // 元イメージ使用範囲の矩形のx座標
            , this.angle * CHAR_HEIGHT                      // 元イメージ使用範囲の矩形のy座標
            , CHAR_WIDTH                                    // 元イメージ使用範囲の矩形の幅
            , CHAR_HEIGHT                                   // 元イメージ使用範囲の矩形の高さ
            , SCREEN_WIDTH / 2 - this.drawCorrection.x      // 描画イメージ矩形のx座標
            , SCREEN_HEIGHT / 2 - this.drawCorrection.y     // 描画イメージ矩形のy座標
            , CHAR_WIDTH                                    // イメージを描画する幅
            , CHAR_HEIGHT                                   // イメージを描画する高さ
        );
    }
    /**
     * キャラクターの動作の更新
     */
    update(input) {
        this.actionArea.reset();
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0) {                          // 歩行動作の定義
            if (input.getKey("a")) {                               // 左に動く
                this.move.x = -TILE_SIZE;
                this.angle = ANGLE_LEFT;
            } else if (input.getKey("w")) {                        // 上に動く
                this.move.y = -TILE_SIZE;
                this.angle = ANGLE_UP;
            } else if (input.getKey("d")) {                        // 右に動く
                this.move.x = TILE_SIZE;
                this.angle = ANGLE_RIGHT;
            } else if (input.getKey("s")) {                        // 下に動く
                this.move.y = TILE_SIZE;
                this.angle = ANGLE_DOWN;
            }
        }
        this.destination = this.position.add(this.move);
        this.destination = mapLoop(this.destination);

        if (this.move.mag != 0) {                         // 移動距離が0でない場合、座標の更新を行う
            this.position.x += sign(this.move.x) * this.speed;  // 座標の更新　x値
            this.position.y += sign(this.move.y) * this.speed;  // 座標の更新　y値
            this.move.x = dampToZero(this.move.x, this.speed);  // 移動距離のx座標が0になるまで減算
            this.move.y = dampToZero(this.move.y, this.speed);  // 移動距離のy座標が0になるまで減算

            this.position = mapLoop(this.position);
        }
        this.destinationArea.set(this.destination.x, this.destination.y);
        this.collisionArea.set(this.position.x, this.position.y);

        if(input.getKeyDown(" ")) {
            let actionX = this.position.x;
            let actionY = this.position.y;

            if(this.angle === ANGLE_RIGHT) actionX += TILE_SIZE;
            if(this.angle === ANGLE_DOWN) actionY += TILE_SIZE;
            if(this.angle === ANGLE_LEFT) actionX -= TILE_SIZE;
            if(this.angle === ANGLE_UP) actionY -= TILE_SIZE;

            this.actionArea = new Rectangle(
                actionX
                , actionY
                , TILE_SIZE
                , TILE_SIZE
            );
        }
    }
}

/**
 * 処理開始
 */
window.onload = function() {
    const game = new DragonQuestGame();
    game.start();
}

/**
 * マップタイルのインデックス取得
 * @param {string} type
 * @param {number} x
 * @param {number} y
 */
function getMapIndex(type, x, y) {
    let mx = (Math.floor(x) + MAP_COLUMN) % MAP_COLUMN;
    let my = (Math.floor(y) + MAP_ROW) % MAP_ROW;

    return FIELD_MAP[type][mx + my * MAP_COLUMN];
}

/**
 * マップループのための座標修正
 * @param {Vector2} vector
 */
function mapLoop(vector) {
    if (vector.x < 0) {                          // マップのループに対応するためにx座標を更新
        vector.x += MAP_COLUMN * TILE_SIZE;
    } else if (vector.x >= MAP_COLUMN * TILE_SIZE) {
        vector.x %= MAP_COLUMN * TILE_SIZE;
    }
    if (vector.y < 0) {                          // マップのループに対応するためにy座標を更新
        vector.y += MAP_ROW * TILE_SIZE;
    } else if (vector.y >= MAP_ROW * TILE_SIZE) {
        vector.y %= MAP_ROW * TILE_SIZE;
    }

    return vector;
}

/**
 * 引数として渡された数値の符号が正か負かを返す
 * @param {number} num
 */
function sign(num) {
    let result;

    if (num > 0) {
        result = 1;
    } else if (num < 0) {
        result = -1
    } else {
        result = 0;
    }

    return result;
}

function dampToZero(value, amount) {
    return Math.abs(value) <= amount ? 0 : value - sign(value) * amount;
}
