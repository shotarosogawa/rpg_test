"use strict"

const DEVELOP_MODE = false;
const DEVELOP_SPEED = 4;
const FPS = 33;                                 // フレームレート
const FONT = "'ＭＳ ゴシック'";             // 使用フォント
const FONT_SIZE = 10;             // 使用フォント
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

let canvas;                             // キャンバス
let canvasCon;                          // キャンバスの2D描画コンテキスト
let fieldHeight;                        // 実画面サイズ 高さ
let fieldWidth;                         // 実画面サイズ 幅
let screen;                             // 仮想画面
let screenCon;                          // 仮想画面の2D描画コンテキスト
let map;                                // マップ
let scene;
let player;                             // プレイヤー
let character;                          // キャラクター
let frame = 0;                          // 内部カウンタ
let keyBuffer = new Uint8Array(0x100);	// キーバッファ
let opacity = 0.8;                      // 操作キー説明の不透明度
let accessDenyTiles = [                 // 侵入不可タイル
    0, 1, 2, 4, 5, 8, 9, 10, 11
];
let eventTarget = {
    castle: {
        tiles: [4, 5, 8, 9]
        , text: "マオウをたおして！"
    }
    , village: {
        tiles: [10, 11]
        , text: "にしのハテにも\nむらがあります"
    }
}

/**
 * 独自イベント管理クラス
 */
class EventDispatcher {
    constructor() {
        this._eventListeners = {};
    }

    addEventListener(type, callback) {
        if(this._eventListeners[type] == undefined) {
            this._eventListeners[type] = [];
        }

        this._eventListeners[type].push(callback);
    }

    dispatchEvent(type, event) {
        const listeners = this._eventListeners[type];
        if(listeners != undefined) listeners.forEach((callback) => callback(event));
    }
}

class GameInformation {
    constructor(title, screenRectangle, maxFps, currentFps) {
        this.title = title;
        this.screenRectangle = screenRectangle;
        this.maxFps = maxFps;
        this.currentFps = currentFps;
    }
}

class Game {
    constructor(title, width, height, maxFps) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.maxFps = maxFps;
        this.currentFps = 0;

        this.screenCanvas = document.createElement('canvas');
        this.screenCanvas.height = height;
        this.screenCanvas.width = width;

        this._inputReceiver = new InputReceiver();
        this._prevTimestamp = 0;

        console.log(`${title}が初期化されました。`);
    }

    changeScene(scene) {
        this.currentScene = scene;
        this.currentScene.addEventListener('changescene', (e) => this.changeScene(e.target));
        console.log(`シーンが${scene.name}に切り替わりました。`);
    }

    start() {
        requestAnimationFrame(this._loop.bind(this));
    }

    _loop(timestamp) {
        const elapsedSec = (timestamp - this._prevTimestamp) / 1000;
        const accuracy = 0.9; // あまり厳密にするとフレームが飛ばされることがあるので
        const frameTime = 1 / this.maxFps * accuracy; // 精度を落とす
        if(elapsedSec <= frameTime) {
            requestAnimationFrame(this._loop.bind(this));
            return;
        }

        this._prevTimestamp = timestamp;
        this.currentFps = 1 / elapsedSec;

        const screenRectangle = new Rectangle(0, 0, this.width, this.height);
        const info = new GameInformation(this.title, screenRectangle,
                                         this.maxFps, this.currentFps);
        const input = this._inputReceiver.getInput();
        this.currentScene.update(info);

        requestAnimationFrame(this._loop.bind(this));
    }
}

class DanamkuStgGame extends Game {
    constructor() {
        super('DQ', 300, 400, FPS);
        const titleScene = new DanmakuStgTitleScene(this.screenCanvas);
        this.changeScene(titleScene);
    }
}

/*
ブラウザ上でキーを押すと、keydownイベント、keyupイベントが発生するのでそれを受け取って記録します。
getInputメソッドが呼び出されると、前回の入力と現在の入力を使って、Inputオブジェクトを作ります。
*/

class Scene extends EventDispatcher {//Actorをまとめあげる舞台の役割、シーンの定義
    constructor(renderingTarget) {
        super();
        this.objects = [];
        this.renderingTarget = renderingTarget;
        //this.accessDenyTiles = info.accessDenyTiles;

        this._destroyedObjects = [];
    }

    add(object) {
        this.objects.push(object);
        object.addEventListener('spawnactor', (e) => this.add(e.target));
        object.addEventListener('destroy', (e) => this._addDestroyedActor(e.target));
    }

    remove(object) {
        const index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
    }

    update() {//updateメソッドではシーンに登録されているActor全てを更新し、当たり判定を行い、描画します。描画の前に一度画面全体をクリアするのを忘れないで下さい。
        this._updateAll();
        this._collisionDetection();//当たり判定を処理する
        this._accessDenyDetection();//侵入不可判定を処理する
        this._disposeDestroyedObjects();
        //this._clearScreen(gameInfo);
        this._drawAll();
    }

    _updateAll() {
        this.objects.forEach((object) => object.update());
    }

    _collisionDetection() {//当たり判定を処理する
        const length = this.objects.length;

        let obj1;
        let obj2;
        let collision;

        for(let i=0; i < length; i++) {
            for(let j=0; j < length; j++) {
                if (i === j) continue;
                obj1 = this.objects[i];
                obj2 = this.objects[j];
                if (obj1.destination.sub(obj1.position).mag >= obj2.destination.sub(obj2.position).mag) {
                    collision = obj1.destinationArea.collisionDetection(obj2.collisionArea);
                    if(collision) {
                        obj1.dispatchEvent('collision', new GameEvent(obj2));
                    }
                }
            }
        }
    }

    _accessDenyDetection() {//侵入不可判定を処理する
        const length = this.objects.length;

        let obj;
        let index;

        for(let i=0; i < length; i++) {
            obj = this.objects[i];
            index = getMapIndex(                                // 移動後のタイルのインデックスを取得
                "main"                                              // 使用するマップの種類を指定
                , obj.destination.x / TILE_SIZE                     // 使用するマップタイルの座標 x値　移動後のドット座標をタイル座標に変換
                , obj.destination.y / TILE_SIZE                     // 使用するマップタイルの座標 y値　移動後のドット座標をタイル座標に変換
            );
            //if(this.accessDenyTiles.includes(index)) {
            if(accessDenyTiles.includes(index)) {
                obj.dispatchEvent('collision', new GameEvent(obj));
            }
        }
    }

    _clearScreen(gameInfo) {
        const context = this.renderingTarget.getContext('2d');
        const width = gameInfo.screenRectangle.width;
        const height = gameInfo.screenRectangle.height;
        context.fillStyle = this.backgroundColor;
        context.fillRect(0, 0, width, height);
    }

    _drawAll() {
        this.objects.forEach((obj) => obj.draw(this.renderingTarget));
    }

    _addDestroyedObject(object) {
        this._destroyedObjects.push(object);
    }

    _disposeDestroyedObjects() {
        this._destroyedObjects.forEach((object) => this.remove(object));
        this._destroyedObjects = [];
    }
}

/**
 * マップクラス
 */
class FieldMap extends Scene {
    constructor(renderingTarget) {
        super(renderingTarget);
        this.img = new Image();
        this.img.src = "img/map.png";                                   // マップチップファイル
        this.con = screenCon;                                           // 2D描画コンテキスト
        this.middlePointPos = new Vector2(                              // 画面の中心点のドット座標
            SCREEN_WIDTH / 2                                                // 仮想画面サイズの1/2
            , SCREEN_HEIGHT / 2                                             // 仮想画面サイズの1/2
        );
        this.drawRange = new Vector2(                                   // 描画範囲
            Math.ceil(this.middlePointPos.x / TILE_SIZE)                    // 画面の中心点のドット座標をタイル座標に変換　ドット単位で描画するので小数切り上げで余裕を持って描画する
            , Math.ceil(this.middlePointPos.y / TILE_SIZE)                  // 画面の中心点のドット座標をタイル座標に変換　ドット単位で描画するので小数切り上げで余裕を持って描画する   
        );
    }
    
    /**
     * プレイヤーの座標を基準にマップの描画を行う
     * @param {string}  type   マップの種類
     * @param {Vector2} playerPos プレイヤー座標
     */
    mapDraw(type, target) {
        const context = target.getContext("2d");
        const player = this._getPlayerInfo();

        let mx;                                                         // 描画するマップタイルのタイル座標 x値
        let my;                                                         // 描画するマップタイルのタイル座標 y値
        let dx;                                                         // 描画イメージ矩形のタイル座標 x値
        let dy;                                                         // 描画イメージ矩形のタイル座標 y値
        let index;                                                      // マップタイルのインデックス
        let drawCorrection = new Vector2(                               // 描画イメージ矩形の補正値　プレイヤーがタイル中央に描画されるように補正する
            player.position.x % TILE_SIZE - this.middlePointPos.x % TILE_SIZE     // プレーヤーのタイル座標 小数部 x値 - 画面中心点のタイル座標 小数部 x値
            , player.position.y % TILE_SIZE - this.middlePointPos.y % TILE_SIZE   // プレーヤーのタイル座標 小数部 y値 - 画面中心点のタイル座標 小数部 y値
        );
        
        for (let y = -this.drawRange.y; y <= this.drawRange.y; y++) {
            my = y + Math.floor(player.position.y / TILE_SIZE);                   // 使用するマップタイルの座標 y値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
            dy = y + Math.floor(this.middlePointPos.y / TILE_SIZE);         // 描画イメージ矩形の座標 y値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
            for (let x = -this.drawRange.x; x <= this.drawRange.x; x++) {
                mx = x + Math.floor(player.position.x / TILE_SIZE);                   // 使用するマップタイルの座標 x値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
                dx = x + Math.floor(this.middlePointPos.x / TILE_SIZE);         // 描画イメージ矩形の座標 x値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
                index = getMapIndex(                                            // 描画するタイルのインデックスを取得
                    type                                                            // 使用するマップの種類を指定
                    , mx                                                            // 使用するマップタイルの座標 x値
                    , my                                                            // 使用するマップタイルの座標 y値
                );

                context.drawImage(
                    this.img                                                        // 描画するイメージ
                    , (index % MAP_CHIP_COLUMN) * TILE_SIZE                         // 元イメージ使用範囲の矩形のx座標
                    , Math.floor(index / MAP_CHIP_ROW) * TILE_SIZE                  // 元イメージ使用範囲の矩形のy座標
                    , TILE_SIZE                                                     // 元イメージ使用範囲の矩形の幅
                    , TILE_SIZE                                                     // 元イメージ使用範囲の矩形の高さ
                    , dx * TILE_SIZE - drawCorrection.x                             // 描画イメージ矩形のx座標　タイル座標をドット座標に変換
                    , dy * TILE_SIZE - drawCorrection.y                             // 描画イメージ矩形のy座標　タイル座標をドット座標に変換
                    , TILE_SIZE                                                     // イメージを描画する幅
                    , TILE_SIZE                                                     // イメージを描画する高さ
                );
            }
        }
    }

    _drawAll() {
        this.mapDraw("main", this.renderingTarget);
        this.objects.forEach((obj) => obj.draw(this.renderingTarget));
    }

    _getPlayerInfo() {
        //const index = this.objects.indexOf("player");
        const player = this.objects[0];

        return player;
    }
}

/**
 * ゲームオブジェクトクラス
 */
class GameObject extends EventDispatcher {
    /**
     * @param {Array} tags タグ
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags = [], x, y) {
        super();
        this.img = new Image();
        this.img.src = "img/player.png";                    // キャラチップファイル
        this.con = screenCon;                               // 2D描画コンテキストを取得
        this.position = new Vector2(                        // 座標
            x * TILE_SIZE + TILE_SIZE / 2                       // 開始位置のタイル座標をドット座標に変換
            , y * TILE_SIZE + TILE_SIZE / 2                     // 開始位置のタイル座標をドット座標に変換
        );
        this.destination = this.position.copy;              // 移動先のタイル座標をドット座標に変換
        this.move = new Vector2(0, 0);                      // 移動量
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
        this.speed = DEVELOP_MODE ? DEVELOP_SPEED : 1       // 移動スピード
        this.tags = tags;
        this.collisionArea = new Rectangle(
            this.position.x
            , this.position.y
            , TILE_SIZE
            , TILE_SIZE
        );
        this.destinationArea = new Rectangle(
            this.destination.x
            , this.destination.y
            , TILE_SIZE
            , TILE_SIZE
        );
        this.addEventListener("collision", (e) => {
            if(this.angle === ANGLE_RIGHT) this.position.x -= this.speed;
            if(this.angle === ANGLE_DOWN) this.position.y -= this.speed;
            if(this.angle === ANGLE_LEFT) this.position.x += this.speed;
            if(this.angle === ANGLE_UP) this.position.y += this.speed;

            this.move.reset;
            this.collisionArea.set(this.position.x, this.position.y);
            this.destination.set(this.position.x, this.position.y);
            this.destinationArea.set(this.destination.x, this.destination.y);
        });
    }
    hasTag(tagName) {
        return this.tags.includes(tagName);
    }
    /**
     * オブジェクトの描画を行う
     */
    draw() {
        this.con.drawImage(
            this.img                                        // 描画するイメージ
            , this.act * CHAR_WIDTH                         // 元イメージ使用範囲の矩形のx座標
            , this.angle * CHAR_HEIGHT                      // 元イメージ使用範囲の矩形のy座標
            , CHAR_WIDTH                                    // 元イメージ使用範囲の矩形の幅
            , CHAR_HEIGHT                                   // 元イメージ使用範囲の矩形の高さ
            , SCREEN_WIDTH / 2 - this.drawCorrection.x + this.position.x - player.position.x      // 描画イメージ矩形のx座標
            , SCREEN_HEIGHT / 2 - this.drawCorrection.y + this.position.y - player.position.y     // 描画イメージ矩形のy座標
            , CHAR_WIDTH                                    // イメージを描画する幅
            , CHAR_HEIGHT                                   // イメージを描画する高さ
        );
    }
    /**
     * オブジェクトの動作の更新
     */
    update() {
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0) {                        // 歩行動作の定義
            //this.move.x = -TILE_SIZE;
            //this.angle = ANGLE_LEFT;
            //this.destination = this.position.add(this.move);
        }
        this.destination = this.position.add(this.move);

        if (this.move.mag != 0) {                           // 移動距離が0でない場合、座標の更新を行う
            this.position.x += sign(this.move.x) * this.speed;  // 座標の更新　x値
            this.position.y += sign(this.move.y) * this.speed;  // 座標の更新　y値
            this.move.x -= sign(this.move.x) * this.speed;      // 移動距離のx座標が0になるまで減算
            this.move.y -= sign(this.move.y) * this.speed;      // 移動距離のy座標が0になるまで減算

            if (this.position.x < 0) {                          // マップのループに対応するためにx座標を更新
                this.position.x += MAP_COLUMN * TILE_SIZE;
            } else if (this.position.x >= MAP_COLUMN * TILE_SIZE) {
                this.position.x %= MAP_COLUMN * TILE_SIZE;
            }
            if (this.position.y < 0) {                          // マップのループに対応するためにy座標を更新
                this.position.y += MAP_ROW * TILE_SIZE;
            } else if(this.position.y >= MAP_ROW * TILE_SIZE) {
                this.position.y %= MAP_ROW * TILE_SIZE;
            }
            this.destinationArea.set(
                this.destination.x
                , this.destination.y
                , TILE_SIZE
                , TILE_SIZE
            );
        } else {
            this.destination.reset;
        }
        this.collisionArea.set(this.position.x, this.position.y);
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
        this.con = screenCon;                               // 2D描画コンテキストを取得
        this.angle = 0;                                     // 向き
        this.act = 0;                                       // 動き
        this.move = new Vector2(0, 0);                      // 移動量
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
        this.speed = DEVELOP_MODE ? DEVELOP_SPEED : 1       // 移動スピード
        this.tags = tags;
    }
    /**
     * キャラクターの動作の更新
     */
    update() {
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0) {                        // 歩行動作の定義
            //this.move.x = -TILE_SIZE;
            //this.angle = ANGLE_LEFT;
            //this.destination = this.position.add(this.move);
        }
        this.destination = this.position.add(this.move);

        if (this.move.mag != 0) {                           // 移動距離が0でない場合、座標の更新を行う
            this.position.x += sign(this.move.x) * this.speed;  // 座標の更新　x値
            this.position.y += sign(this.move.y) * this.speed;  // 座標の更新　y値
            this.move.x -= sign(this.move.x) * this.speed;      // 移動距離のx座標が0になるまで減算
            this.move.y -= sign(this.move.y) * this.speed;      // 移動距離のy座標が0になるまで減算

            if (this.position.x < 0) {                          // マップのループに対応するためにx座標を更新
                this.position.x += MAP_COLUMN * TILE_SIZE;
            } else if (this.position.x >= MAP_COLUMN * TILE_SIZE) {
                this.position.x %= MAP_COLUMN * TILE_SIZE;
            }
            if (this.position.y < 0) {                          // マップのループに対応するためにy座標を更新
                this.position.y += MAP_ROW * TILE_SIZE;
            } else if(this.position.y >= MAP_ROW * TILE_SIZE) {
                this.position.y %= MAP_ROW * TILE_SIZE;
            }
            this.destinationArea.set(
                this.destination.x
                , this.destination.y
                , TILE_SIZE
                , TILE_SIZE
            );
        } else {
            this.destinationArea.reset;
        }
        this.collisionArea.set(this.position.x, this.position.y);
    }
}

/**
 * プレイヤークラス
 */
class Player extends Character {
    constructor(tags = ["character", "player"], x = START_X, y = START_Y) {
        super(tags, x, y);
        this.img = new Image();
        this.img.src = "img/player.png";                // プレイヤーチップファイル

    }
    /**
     * プレイヤーの描画を行う
     */
    draw() {
        this.con.drawImage(
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
    update() {
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0) {                        // 歩行動作の定義
            if (keyBuffer["a"]) {                               // 左に動く
                this.move.x = -TILE_SIZE;
                this.angle = ANGLE_LEFT;
            } else if (keyBuffer["w"]) {                        // 上に動く
                this.move.y = -TILE_SIZE;
                this.angle = ANGLE_UP;
            } else if (keyBuffer["d"]) {                        // 右に動く
                this.move.x = TILE_SIZE;
                this.angle = ANGLE_RIGHT;
            } else if (keyBuffer["s"]) {                        // 下に動く
                this.move.y = TILE_SIZE;
                this.angle = ANGLE_DOWN;
            }
        }
        this.destination = this.position.add(this.move);

        if (this.move.mag != 0) {                         // 移動距離が0でない場合、座標の更新を行う
            this.position.x += sign(this.move.x) * this.speed;  // 座標の更新　x値
            this.position.y += sign(this.move.y) * this.speed;  // 座標の更新　y値
            this.move.x -= sign(this.move.x) * this.speed;      // 移動距離のx座標が0になるまで減算
            this.move.y -= sign(this.move.y) * this.speed;      // 移動距離のy座標が0になるまで減算

            if (this.position.x < 0) {                          // マップのループに対応するためにx座標を更新
                this.position.x += MAP_COLUMN * TILE_SIZE;
            } else if (this.position.x >= MAP_COLUMN * TILE_SIZE) {
                this.position.x %= MAP_COLUMN * TILE_SIZE;
            }
            if (this.position.y < 0) {                          // マップのループに対応するためにy座標を更新
                this.position.y += MAP_ROW * TILE_SIZE;
            } else if (this.position.y >= MAP_ROW * TILE_SIZE) {
                this.position.y %= MAP_ROW * TILE_SIZE;
            }
            this.destinationArea.set(
                this.destination.x
                , this.destination.y
                , TILE_SIZE
                , TILE_SIZE
            );
        } else {
            this.destinationArea.reset;
        }
        this.collisionArea.set(this.position.x, this.position.y);
    }
}

class GameEvent {
    constructor(target) {
        this.target = target;
    }
}

/**
 * 矩形クラス
 */
class Rectangle {
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     * @param {number} width 矩形の幅
     * @param {number} height 矩形の高さ
     */
    constructor(x, y, width, height) {
        this.vector = new Vector2(x, y);
        this.width = width;
        this.height = height;
    }
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     * @param {number} width 矩形の幅
     * @param {number} height 矩形の高さ
     */
    get reset() {
        this.vector.reset;
        this.width = 0;
        this.height = 0;
    }
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     * @param {number} width 矩形の幅
     * @param {number} height 矩形の高さ
     */
    set(x, y, width = this.width, height = this.height) {
        this.vector.set(x, y);
        this.width = width;
        this.height = height;
    }
    /**
     * @param {Rectangle} other 当たり判定対象
     */
    collisionDetection(other) {
        const horizontal = (other.vector.x < this.vector.x + this.width) &&
            (this.vector.x < other.vector.x + other.width);
        const vertical = (other.vector.y < this.vector.y + this.height) &&
            (this.vector.y < other.vector.y + other.height);
        return (horizontal && vertical);
    }
}

/**
 * ベクトルクラス
 */
class Vector2 {
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    get reset() {
        this.x = 0;
        this.y = 0;
    }
    /**
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * @param {Vector2} b 足したいベクトル
     */
    add(b) {
        let a = this;
        return new Vector2(a.x + b.x, a.y + b.y);
    }
    /**
     * @param {Vector2} b 引きたいベクトル
     */
    sub(b) {
        let a = this;
        return new Vector2(a.x - b.x, a.y - b.y);
    }
    /**
     * このベクトルの実数s倍を求める。
     * @param {number} s 何倍するか
     */
    mult(s) {
        return new Vector2(s * this.x, s * this.y);
    }
    /**
     * このベクトルの実数s倍を求める。
     * @param {number} s 何倍するか
     */
    div(s) {
        return new Vector2(this.x / s, this.y / s);
    }
    /**
     * このベクトルの大きさを求める。
     */
    get mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    get copy() {
        return new Vector2(this.x, this.y);
    }
}

/**
 * 処理開始
 */
window.onload = function() {
    canvas = document.getElementById("main");       // mainキャンバスの要素を取得
    canvasCon = canvas.getContext("2d");            // キャンバスの2D描画コンテキストを取得

    screen = document.createElement("canvas");      // フィールドの作成
    screen.width = SCREEN_WIDTH;                    // フィールドの定義 幅
    screen.height = SCREEN_HEIGHT;                  // フィールドの定義 高さ
    screenCon = screen.getContext("2d");            // フィールドの2D描画コンテキストを取得

    map = new FieldMap(screen);                                // マップの定義
    player = new Player();                // プレイヤーの定義
    map.add(player);
    character = new Character(["character"], 23, 20);
    map.add(character);
    canvasSize();
    setInterval(
        function(){
            ProcessingPerFrame();
            frame++;
        }
        , Math.floor(1 / FPS * 1000)
    );
}
/**
 * キーボード入力イベント
 */
window.onkeydown = function(event) {
    keyBuffer[event.key] = 1;
};
/**
 * キーボード入力終了イベント
 */
window.onkeyup = function(event) {
    keyBuffer[event.key] = 0;
};
/**
 * ブラウザサイズ変更イベント
 */
window.onresize = canvasSize;

/**
 * キャンバスサイズの設定
 */
function canvasSize() { 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.width / SCREEN_WIDTH < canvas.height / SCREEN_HEIGHT){
        fieldHeight = SCREEN_HEIGHT * canvas.width / SCREEN_WIDTH;
        fieldWidth = canvas.width;
    } else {
        fieldHeight = canvas.height;
        fieldWidth = SCREEN_WIDTH * canvas.height / SCREEN_HEIGHT;
    }
}

/**
 * フレームごとの処理
 */
function ProcessingPerFrame() {
    map.update();
    ScreenDepiction();
}

/**
 * 画面の描画
 */
function ScreenDepiction() {
    mainDepiction();
    if (DEVELOP_MODE) {
        canvasCon.imageSmoothingEnabled = 0;
    }
    canvasCon.drawImage(screen, 0, 0, screen.width, screen.height, 0, 0, fieldWidth, fieldHeight)
}

/**
 * メイン要素の描画
 */
function mainDepiction(){
    //map.draw("main", player.position);
    if (DEVELOP_MODE) {
        screenCon.fillStyle = "#ff0000";                                // 中線の描画　デバッグ用
        screenCon.fillRect(0, SCREEN_HEIGHT / 2 - 1, SCREEN_WIDTH, 2);
        screenCon.fillRect(SCREEN_WIDTH /2 - 1, 0, 2, SCREEN_HEIGHT);
    }

    if (opacity > 0) {                                                  // 操作キーウィンドウ
        if (frame > 165) {
            opacity -= 1 / 100;                                         // 時間経過でフェードアウト
            screenCon.fillStyle = "rgba(0, 0, 0, " + opacity +")";
            screenCon.fillRect(100, 3, 25, 42)
            screenCon.font = FONT_SIZE + "px" + FONT;
            screenCon.fillStyle =  "rgba(255, 255, 255, " + opacity +")";
        } else {
            screenCon.fillStyle = WINDOW_STYLE;
            screenCon.fillRect(100, 3, 25, 42)
            screenCon.font = FONT_SIZE + "px" + FONT;
            screenCon.fillStyle =  FONT_STYLE;
        }
        screenCon.fillText("↑=W", 102, 12);
        screenCon.fillText("←=a", 102, 22);
        screenCon.fillText("→=d", 102, 32);
        screenCon.fillText("↓=s", 102, 42);
    }
    //character.draw();
    //player.draw();
    eventWindow(player);
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

function eventWindow(player) {
    let index;
    let text;
    let lineHeight = 1.1618;

    index = getMapIndex(                                // 移動後のタイルのインデックスを取得
        "main"                                              // 使用するマップの種類を指定
        , player.destination.x / TILE_SIZE                      // 使用するマップタイルの座標 x値　プレイヤー前方のドット座標をタイル座標に変換
        , player.destination.y / TILE_SIZE                      // 使用するマップタイルの座標 y値　プレイヤー前方のドット座標をタイル座標に変換
    );
    if (eventTarget.castle.tiles.includes(index)) {                   // 移動後のタイルが移動不可の場合
        text = eventTarget.castle.text;
    } else if (eventTarget.village.tiles.includes(index)) {                   // 移動後のタイルが移動不可の場合
        text = eventTarget.village.text;
    }

    if (text) {
        let texts=text.split( "\n" );
        let l=texts.length;

        screenCon.fillStyle = WINDOW_STYLE;                                 // メッセージウィンドウ
        screenCon.fillRect(3, 93, 122, 24)
        screenCon.font = FONT_SIZE + "px" + FONT;
        screenCon.fillStyle =  FONT_STYLE;
        for(let i=0; l > i; i++) {
            screenCon.fillText(
                texts[i]
                , 5
                , 103 + FONT_SIZE * lineHeight * i
            );
        }
    }
}
