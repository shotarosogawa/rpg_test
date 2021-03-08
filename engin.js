"use strict"

/**
 * 独自イベント管理クラス
 */
class EventDispatcher {
    constructor() {
        this._eventListeners = {};
    }

    /**
     * イベントリスナーの作成
     * @param {String} type 
     * @param {Object} callback 
     */
    addEventListener(type, callback) {
        if(this._eventListeners[type] == undefined) {
            this._eventListeners[type] = [];
        }

        this._eventListeners[type].push(callback);
    }

    /**
     * イベントの発火
     * @param {String} type 
     * @param {GameEvent} event 
     */
    dispatchEvent(type, event) {
        const listeners = this._eventListeners[type];
        if(listeners != undefined) listeners.forEach((callback) => callback(event));
    }
}

/**
 * キー入力管理クラス
 */
class Input {
    constructor(keyMap, prevKeyMap) {
        this.keyMap = keyMap;
        this.prevKeyMap = prevKeyMap;
    }

    /**
     * 指定のキーの名称が指定のキーバッファに登録されているかを判別する
     * 登録されていなかった場合はfalseを返す
     * @param {string} keyName 
     * @param {Map} map 
     */
    _getKeyFromMap(keyName, map) {
        if(map.has(keyName)) {
            return map.get(keyName);
        } else {
            return false;
        }
    }

    /**
     * 指定のキーの名称が前回入力のキーバッファに登録されているかを判別する
     * @param {String} keyName 
     */
    _getPrevKey(keyName) {
        return this._getKeyFromMap(keyName, this.prevKeyMap);
    }

    /**
     * 指定のキーの名称がキーバッファに登録されているかを判別する
     * @param {string} keyName 
     */
    getKey(keyName) {
        return this._getKeyFromMap(keyName, this.keyMap);
    }

    /**
     * 指定のキーの名称が入力されたかを判別した結果を返す
     * @param {string} keyName 
     */
    getKeyDown(keyName) {
        const prevDown = this._getPrevKey(keyName);
        const currentDown = this.getKey(keyName);
        return (!prevDown && currentDown);
    }

    /**
     * 指定のキーの名称が入力終了されたかを判別した結果を返す
     * @param {string} keyName 
     */
    getKeyUp(keyName) {
        const prevDown = this._getPrevKey(keyName);
        const currentDown = this.getKey(keyName);
        return (prevDown && !currentDown);
    }
}

/**
 * キー入力イベント管理クラス
 */
class InputReceiver {
    constructor() {
        this._keyMap = new Map();
        this._prevKeyMap = new Map();

        addEventListener('keydown', (ke) => this._keyMap.set(ke.key, true));
        addEventListener('keyup', (ke) => this._keyMap.set(ke.key, false));
    }

    getInput() {
        const keyMap = new Map(this._keyMap);
        const prevKeyMap = new Map(this._prevKeyMap);
        this._prevKeyMap = new Map(this._keyMap);
        return new Input(keyMap, prevKeyMap);
    }
}

/**
 * ゲーム情報クラス
 */
class GameInformation {
    constructor(title, screenRectangle, maxFps, currentFps) {
        this.title = title;
        this.screenRectangle = screenRectangle;
        this.maxFps = maxFps;
        this.currentFps = currentFps;
    }
}

/**
 * ゲームイベントクラス
 */
class GameEvent {
    constructor(target) {
        this.target = target;
    }
}

/**
 * ゲームクラス
 * ゲームそのものの管理　シーンの切り替えなどを行う
 */
class Game {
    /**
     * コンストラクタ
     * @param {string} title タイトル
     * @param {number} width 幅
     * @param {number} height 高さ
     * @param {number} maxFps 最大fps
     */
    constructor(title, width, height, maxFps) {
        this.title = title;
        this.width = width;
        this.height = height;
        this.maxFps = maxFps;
        this.currentFps = 0;

        this.canvas = document.getElementById("main");          // mainキャンバスの要素を取得

        this.screenCanvas = document.createElement('canvas');   // 仮想画面の作成
        this.screenCanvas.height = height;
        this.screenCanvas.width = width;

        this._inputReceiver = new InputReceiver();            // 後々実装したい
        this._prevTimestamp = 0;

        this.addEventListener

        console.log(`${title}が初期化されました。`);
    }

    /**
     * シーンの変更
     * @param {Scene} scene タイトル
     */
    changeScene(scene) {
        this.currentScene = scene;
        this.currentScene.addEventListener('changescene', (e) => this.changeScene(e.target));
        console.log(`シーンが${scene.name}に切り替わりました。`);
    }

    /**
     * ゲームの開始
     */
    start() {
        requestAnimationFrame(this._loop.bind(this));
    }

    /**
     * フレームごとの処理
     */
    _loop(timestamp) {
        const elapsedSec = (timestamp - this._prevTimestamp) / 1000;
        const accuracy = 0.9;                           // あまり厳密にするとフレームが飛ばされることがあるので
        const frameTime = 1 / this.maxFps * accuracy;   // 精度を落とす
        if(elapsedSec <= frameTime) {
            requestAnimationFrame(this._loop.bind(this));
            return;
        }

        frame++;
        this._prevTimestamp = timestamp;
        this.currentFps = 1 / elapsedSec;

        const screenRectangle = new Rectangle(0, 0, this.width, this.height);
        const info = new GameInformation(
            this.title
            , screenRectangle
            , this.maxFps
            , this.currentFps
        );
        const input = this._inputReceiver.getInput();    // 後々実装したい
        this.currentScene.update(info, input);

        requestAnimationFrame(this._loop.bind(this));
    }
}

/**
 * シーンクラス
 * フィールドやバトルなど、シーンごとにゲームオブジェクト全体の制御を行う
 */
class Scene extends EventDispatcher {
    /**
     * コンストラクタ
     * @param {Object} canvas   マップの種類
     * @param {Object} renderingTarget 描画対象
     */
    constructor(canvas, renderingTarget) {
        super();
        this.objects = [];                              // ゲームオブジェクト一覧
        this.canvas = canvas;                           // キャンバス
        this.canvasContext = canvas.getContext("2d");   // 実画面コンテキスト
        this.renderingTarget = renderingTarget;         // 仮想画面
        this.isGameEvent = false;
        this.gameEvent = null;

        this.canvasResize();
        addEventListener('resize', (e) => this.canvasResize());

        this._destroyedObjects = [];
        this._accessDenyTiles = [];                     // 侵入不可タイル
    }

    /**
     * ゲームオブジェクトの追加
     * @param {GameObject} object
     */
    addObject(object) {
        this.objects.push(object);
        object.addEventListener(
            'startGameEvent'
            , (e) => this.startGameEvent(e.target)
        );
        object.addEventListener(
            'stopGameEvent'
            , (e) => this.stopGameEvent()
        );
    }

    /**
     * ゲームオブジェクトの削除
     * @param {GameObject} object
     */
    removeObject(object) {
        const index = this.objects.indexOf(object);
        this.objects.splice(index, 1);
    }

    startGameEvent(event) {
        this.isGameEvent = true;
        this.gameEvent = event;
    }

    stopGameEvent() {
        this.isGameEvent = false;
        this.gameEvent = null;
    }

    /**
     * シーンの変更
     * @param {Scene} scene
     */
    changeScene(scene) {
        const event = new GameEvent(scene);
        this.dispatchEvent('changescene', event);
    }

    /**
     * シーンの更新
     * @param {GameInformation} gameInfo
     */
    update(gameInfo, input) {
        this._updateAll(input);
        this._collisionDetection();//当たり判定を処理する
        this._playerActionDecision(input);
        this._disposeDestroyedObjects();
        this._clearScreen(gameInfo);
        this._drawAll();
    }

    /**
     * キャンバスサイズの設定
     */
    canvasResize() { 
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        if (this.canvas.width / SCREEN_WIDTH < this.canvas.height / SCREEN_HEIGHT){
            this.targetHeight = SCREEN_HEIGHT * this.canvas.width / SCREEN_WIDTH;
            this.targetWidth = this.canvas.width;
        } else {
            this.targetHeight = this.canvas.height;
            this.targetWidth = SCREEN_WIDTH * this.canvas.height / SCREEN_HEIGHT;
        }
    }

    /**
     * 全てゲームオブジェクトの一括更新
     * @param {Input} input
     */
    _updateAll(input) {
        if(this.isGameEvent) {
            this.gameEvent.update(input);
        } else {
            this.objects.forEach((object) => object.update(input));
        }
    }

    /**
     * 当たり判定を処理する
     */
    _collisionDetection() {
        const length = this.objects.length;

        let obj1;
        let obj2;
        let index;
        let collision;

        for(let i=0; i < length; i++) {
            obj1 = this.objects[i];
            index = getMapIndex(                                    // 移動後のタイルのインデックスを取得
                "main"                                                  // 使用するマップの種類を指定
                , obj1.destination.x / TILE_SIZE                        // 使用するマップタイルの座標 x値　移動後のドット座標をタイル座標に変換
                , obj1.destination.y / TILE_SIZE                        // 使用するマップタイルの座標 y値　移動後のドット座標をタイル座標に変換
            );
            if(this._accessDenyTiles.includes(index)) {                   // 移動先がマップの侵入不可タイルの場合
                obj1.dispatchEvent('collision', new GameEvent(obj1));
                continue;
            }

            for(let j=0; j < length; j++) {
                if (i === j) continue;
                obj1 = this.objects[i];
                obj2 = this.objects[j];
                if (obj1.destination.sub(obj1.position).mag >= obj2.destination.sub(obj2.position).mag) { // obj1が既に移動を始めている時は判定を行わない
                    collision = obj1.destinationArea.collisionDetection(obj2.collisionArea);
                    if(collision) {                                 // 移動先がゲームオブジェクトの場合
                        if(
                            obj2.tags.includes("character")
                            || obj2.tags.includes("door") && obj2.lockFlg
                        ) {
                            obj1.dispatchEvent('collision', new GameEvent(obj2));
                            break;
                        }
                    }
                }
            }
        }
    }

    /**
     * プレイヤーのアクションに応じてイベントを発火する
     */
    _playerActionDecision() {
        const length = this.objects.length;
        const index = this.objects.findIndex((element) => element instanceof Player);
        const player = this.objects[index];

        let obj;
        let action;

        for(let i=0; i < length; i++) {
            obj = this.objects[i];
            if (obj instanceof Player) continue;

            action = player.actionArea.collisionDetection(obj.collisionArea);
            if(action) {                                 // 移動先がゲームオブジェクトの場合
                player.dispatchEvent('dispatchGameEvent', new GameEvent(player));
                obj.dispatchEvent('message', new GameEvent(player));
            }
        }
    }

    /**
     * 描画のクリア
     * @param {GameInformation} gameInfo
     */
    _clearScreen(gameInfo) {
        const context = this.renderingTarget.getContext('2d');
        const width = gameInfo.screenRectangle.width;
        const height = gameInfo.screenRectangle.height;
        context.fillRect(0, 0, width, height);
    }

    /**
     * 全ての要素を一括描画
     */
    _drawAll() {
        this.objects.forEach((obj) => obj.draw(this.renderingTarget));
        if(this.isGameEvent) {
            this.gameEvent.draw(this.renderingTarget);
        }

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

    /**
     * 削除予定のゲームオブジェクトを配列で管理
     * @param {GameInformation} gameInfo
     */
    _addDestroyedObject(object) {
        this._destroyedObjects.push(object);
    }

    /**
     * ゲームオブジェクトを一括削除
     * @param {GameInformation} gameInfo
     */
    _disposeDestroyedObjects() {
        this._destroyedObjects.forEach((object) => this.removeObject(object));
        this._destroyedObjects = [];
    }
}

/**
 * ゲームオブジェクトクラス
 */
class GameObject extends EventDispatcher {
    /**
     * @param {Array} tags タグ　オブジェクトの種類を識別
     * @param {number} x ベクトルのx成分
     * @param {number} y ベクトルのy成分
     */
    constructor(tags = [], x, y) {
        super();
        this.img = new Image();
        this.img.src = "img/player.png";                    // オブジェクトチップファイル
        this.position = new Vector2(                        // 座標
            x * TILE_SIZE + TILE_SIZE / 2                       // 開始位置のタイル座標をドット座標に変換
            , y * TILE_SIZE + TILE_SIZE / 2                     // 開始位置のタイル座標をドット座標に変換
        );
        this.destination = this.position.copy;              // 移動先のドット座標　移動量0なので、現在値に設定
        this.move = new Vector2(0, 0);                      // 移動量
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
        this.speed = DEVELOP_MODE ? DEVELOP_SPEED : 1       // 移動スピード
        this.tags = tags;                                   // タグ
        this.collisionArea = new Rectangle(                 // 当たり判定エリア
            this.position.x
            , this.position.y
            , TILE_SIZE
            , TILE_SIZE
        );
        this.destinationArea = new Rectangle(               // 移動先エリア
            this.destination.x
            , this.destination.y
            , TILE_SIZE
            , TILE_SIZE
        );

        this.addEventListener("collision", (e) => {         // 当たり判定イベントの追加 オブジェクトの向きと逆向きに移動スピードを加える
            if(this.angle === ANGLE_RIGHT) this.position.x -= this.speed;
            if(this.angle === ANGLE_DOWN) this.position.y -= this.speed;
            if(this.angle === ANGLE_LEFT) this.position.x += this.speed;
            if(this.angle === ANGLE_UP) this.position.y += this.speed;

            this.position = mapLoop(this.position);                             // マップをループさせているので、座標調整　当たり判定まで終わった後に調整した方がよくね？
            this.move.reset;                                                    // 移動量のリセット
            this.collisionArea.set(this.position.x, this.position.y);           // 当たり判定の更新
            this.destination.set(this.position.x, this.position.y);             // 移動先座標の更新　移動量0なので、現在値に設定
            this.destinationArea.set(this.destination.x, this.destination.y);   // 移動先判定の更新
        });
    }

    /**
     * タグ検索
     * @param {string} tagName
     */
    hasTag(tagName) {
        return this.tags.includes(tagName);
    }

    /**
     * オブジェクトの描画を行う
     * @param {Object} target
     * @param {Camera} camera
     */
    draw(target, camera) {
        const context = target.getContext("2d");            // 仮想画面のコンテキスト取得

        context.drawImage(
            this.img                                        // 描画するイメージ
            , this.act * CHAR_WIDTH                         // 元イメージ使用範囲の矩形のx座標
            , this.angle * CHAR_HEIGHT                      // 元イメージ使用範囲の矩形のy座標
            , CHAR_WIDTH                                    // 元イメージ使用範囲の矩形の幅
            , CHAR_HEIGHT                                   // 元イメージ使用範囲の矩形の高さ
            , SCREEN_WIDTH / 2 - this.drawCorrection.x + this.position.x - camera.position.x      // 描画イメージ矩形のx座標
            , SCREEN_HEIGHT / 2 - this.drawCorrection.y + this.position.y - camera.position.y     // 描画イメージ矩形のy座標
            , CHAR_WIDTH                                    // イメージを描画する幅
            , CHAR_HEIGHT                                   // イメージを描画する高さ
        );
    }

    /**
     * オブジェクトの動作の更新
     */
    update(input) {
        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag === 0) {                          // 歩行動作の定義
            //this.move.x = -TILE_SIZE;                     乱数でNPCの動きを決めるとかやりたい
            //this.angle = ANGLE_LEFT;
            //this.destination = this.position.add(this.move);
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
    
    /**
     * このベクトルを複製して返す。
     */
    get copy() {
        return new Vector2(this.x, this.y);
    }
}

/**
 * カメラクラス
 */
class Camera {
    constructor(x, y) {
        this.position = new Vector2(x, y);
    }

    update(vec){
        this.position.set(vec.x, vec.y);
    }
}

class MessageEvent extends EventDispatcher {
    constructor(x, y, width, height, messages) {
        super();
        this.style = WINDOW_STYLE;
        this.font = FONT_SIZE + "px" + FONT;
        this.fontStyle =  FONT_STYLE;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lineHeight = 1.1618;
        this.messages = messages;
        this.activeFlg = true;
        this.index = 0;

        this.currentMessage = this.messages[this.index];    // 次のメッセージ取り出す
    }

    /**
     * メッセージウィンドウの描画を行う
     * @param {Object} target
     */
    draw(target) {
        const context = target.getContext("2d");            // 仮想画面のコンテキスト取得

        let texts = this.currentMessage.split("\n");
        let l = texts.length;

        context.fillStyle = WINDOW_STYLE;                   // メッセージウィンドウ
        context.fillRect(3, 93, 122, 24)
        context.font = FONT_SIZE + "px" + FONT;
        context.fillStyle =  FONT_STYLE;
        for(let i=0; l > i; i++) {
            context.fillText(
                texts[i]
                , 5
                , 103 + FONT_SIZE * this.lineHeight * i
            );
        }
    }

    /**
     * メッセージウィンドウの動作の更新
     */
    update(input) { //セリフを次の表示にする記述
        if(input.getKeyDown(' ')) {
            this.index++;
            // もう空っぽだったらstopGameEventイベントを発生させる
            if(this.messages[this.index] === undefined) {
                this.currentMessage = ''; // undefinedのままだと一瞬undefinedが描画されるかもしれないので…
                this.dispatchEvent("stopGameEvent", new GameEvent(this))
            }
            this.currentMessage = this.messages[this.index]; // 次のメッセージ取り出す
        }
    }
}
