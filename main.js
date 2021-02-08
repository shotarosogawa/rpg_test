"use strict"

const DEBUG_MODE = true;
const START_X = 15;                                 // プレイヤー初期位置 x値
const START_Y = 17;                                 // プレイヤー初期位置 ｙｙ値
const FONT = "12px monospace";                      // 使用フォント
const FONT_STYLE = "white";
const DEBUG_WINDOW_STYLE = "rgba(0, 0, 0, 0.75)";
const FIELD_HEIGHT = 120;
const FIELD_WIDTH = 128;
const TILE_COLUMN = 4;
const TILE_ROW = 4;
const TILE_SIZE = 8;
const CHAR_COLUMN = 8;
const CHAR_ROW = 9;
const MAP_COLUMN = 32;
const MAP_ROW = 32;
const MAP = {
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
};                  // マップをインデックスで定義
const gKey = new Uint8Array(0x100);

let canvas;         // キャンバス
let canvasCon;      // キャンバスの2D描画コンテキスト
let field;          // フィールド
let fieldCon;       // フィールドの2D描画コンテキスト
let frame = 0;      // 内部カウンタ
let imgMap;         // マップ
let player;         // プレイヤー
let character;      // キャラクター
let gHeight;
let gWidth;
let middlePoint;    // 中点の初期座標

class Map {
    constructor() {
        this.img = new Image();
        this.img.src = "img/map.png";           // マップチップファイル
        this.con = fieldCon;                    // 2D描画コンテキスト
        this.size = new Vector2 (
            FIELD_WIDTH / TILE_SIZE + 1
            , FIELD_HEIGHT / TILE_SIZE + 1
        );                                      // フィールドサイズ　描画サイズではなくマップを生成する時のサイズ
        if ((FIELD_WIDTH / 8) % 2 === 0) {      // フィールド幅を16の倍数とした時、キャラがマップタイルの間に立ってしまうので補正値を設定
            this.correction = TILE_SIZE / 2;
        } else {
            this.correction = 0;
        }
    }
    /**
     * @param {string}  type   マップの種類
     * @param {Object} player プレイヤークラス
     */
    draw(type, player) {
        let index;                              // 使用するマップタイルのインデックス
        let ix;                                 // どのマップタイルを使用するか　x値
        let iy;                                 // どのマップタイルを使用するか　y値
        let dx = Math.floor(player.relative.x); // プレイヤーの移動座標　x値
        let dy = Math.floor(player.relative.y); // プレイヤーの移動座標　y値
        
        for (let y = 0; y <= this.size.y; y++) {
            for (let x = 0; x <= this.size.x; x++) {
                index = getMapIndex(
                    type
                    , x + dx
                    , y + dy
                );
                ix = (index % TILE_COLUMN) * TILE_SIZE;
                iy = Math.floor(index / TILE_ROW) * TILE_SIZE;
                this.con.drawImage(
                    this.img                            // マップチップ
                    , ix                                // どのタイルを使用するか　x値
                    , iy                                // どのタイルを使用するか　y値
                    , TILE_SIZE
                    , TILE_SIZE
                    , (x + dx - player.relative.x) * TILE_SIZE - this.correction
                    , (y + dy - player.relative.y) * TILE_SIZE
                    , TILE_SIZE
                    , TILE_SIZE
                );
            }
        }
    }
}

class Character {
    constructor() {
        this.img = new Image();
        this.img.src = "img/player.png";                // キャラチップファイル
        this.con = fieldCon;                            // 2D描画コンテキストを取得
        this.position = new Vector2(16, 16);            // 座標
        this.relative = this.position.sub(middlePoint); // 中心からの相対座標
        this.angle = 0;                                 // 向き
        this.act = 0;                                   // 動き
        this.move = new Vector2(0, 0);                  // 移動量
    }
    /**
     * @param {Vector2} player_pos プレイヤー座標
     */
    draw(player_pos) {
        this.con.drawImage(
            this.img
            , this.act
            , this.angle
            , CHAR_COLUMN
            , CHAR_ROW
            , this.position.x - CHAR_COLUMN / 2 - player_pos.x * TILE_SIZE
            , this.position.y - CHAR_ROW + TILE_SIZE - player_pos.y * TILE_SIZE
            , CHAR_COLUMN
            , CHAR_ROW
        );
    }
    update() {
        let index;

        this.act = (frame >> 4 & 1) * CHAR_COLUMN;  // 通常動作の定義

        if (this.move.mag() === 0) {                // 歩行動作の定義
            if (gKey["a"]) {                            // 左に動く
                this.move.x = -1;
                this.angle = 9;
            } else if (gKey["w"]) {                     // 上に動く
                this.move.y = -1;
                this.angle = 27;
            } else if (gKey["d"]) {                     // 右に動く
                this.move.x = 1;
                this.angle = 18;
            } else if (gKey["s"]) {                     // 下に動く
                this.move.y = 1;
                this.angle = 0;
            }
        }

        index = getMapIndex(
            "main"
            , this.move.x + this.position.x
            , this.move.y + this.position.y
        );                                                      // 移動後のタイルのインデックスを取得
        if (index === 0 || index === 1 || index === 2) {        // 移動後のタイルが移動不可の場合
            this.move.x = 0;                                        // 移動距離のx座標を0とする
            this.move.y = 0;                                        // 移動距離のy座標を0とする
        }
        if (this.move.mag() != 0) {                             // 移動距離が0でない場合、座標の更新を行う
            this.position.x += Math.sign(this.move.x) / TILE_SIZE;  // 座標の更新　x値
            this.position.y += Math.sign(this.move.y) / TILE_SIZE;  // 座標の更新　y値
            this.move.x -= Math.sign(this.move.x) / TILE_SIZE;      // 移動距離のx座標が0になるまで減算
            this.move.y -= Math.sign(this.move.y) / TILE_SIZE;      // 移動距離のy座標が0になるまで減算

            if (this.position.x < 0) {                              // マップのループに対応するためにx座標を更新
                this.position.x += MAP_COLUMN;
            } else if(this.position.x >= MAP_COLUMN) {
                this.position.x %= MAP_COLUMN;
            }
            if (this.position.y < 0) {                              // マップのループに対応するためにy座標を更新
                this.position.y += MAP_ROW;
            } else if(this.position.y >= MAP_ROW) {
                this.position.y %= MAP_ROW;
            }
    
            this.relative = this.position.sub(middlePoint);         // 中心の初期値からの相対座標を更新
        }
    }
}

class Player extends Character {
    constructor() {
        super();
        this.img = new Image();
        this.img.src = "img/player.png";                // プレイヤーチップファイル
        this.con = fieldCon;                            // 2D描画コンテキストを取得
        this.position = new Vector2(
            START_X
            , START_Y
        );                                              // 座標
        this.relative = this.position.sub(middlePoint); // 中心からの相対座標
        this.angle = 0;                                 // 向き
        this.act = 0;                                   // 動き
        this.move = new Vector2(0, 0);                  // 移動量
    }
    draw() {
        this.con.drawImage(
            this.img
            , this.act
            , this.angle
            , CHAR_COLUMN
            , CHAR_ROW
            , FIELD_WIDTH / 2 - CHAR_COLUMN / 2
            , FIELD_HEIGHT / 2 - CHAR_ROW + TILE_SIZE / 2
            , CHAR_COLUMN
            , CHAR_ROW
        );
    }
}

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
     * @param {Vector2} b 足したいベクトル
     */
    add(b) {
        let a = this;
        return new Vector2(a.x+b.x, a.y+b.y);
    }
    /**
     * @param {Vector2} b 引きたいベクトル
     */
    sub(b) {
        let a = this;
        return new Vector2(a.x-b.x, a.y-b.y);
    }
    /**
     * このベクトルの実数s倍を求める。
     * @param {number} s 何倍するか
     */
    mult(s) {
        return new Vec2(s*this.x, s*this.y);
    }
    /**
     * このベクトルの大きさを求める。
     */
    mag() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
}

window.onload = function() {
    canvas = document.getElementById("main");       // mainキャンバスの要素を取得
    canvasCon = canvas.getContext("2d");            // キャンバスの2D描画コンテキストを取得

    field = document.createElement("canvas");       // フィールドの作成
    field.width = FIELD_WIDTH;                      // フィールドの定義　幅
    field.height = FIELD_HEIGHT;                    // フィールドの定義　高さ
    fieldCon = field.getContext("2d");              // フィールドの2D描画コンテキストを取得

    middlePoint = new Vector2(
        Math.floor(FIELD_WIDTH / TILE_SIZE / 2)
        , Math.floor(FIELD_HEIGHT / TILE_SIZE / 2)
    );                                              // 中点の初期座標の定義
    imgMap = new Map();                             // マップの定義
    player = new Player();                          // プレイヤーの定義
    //character = new Character();
    canvasSize();
    setInterval(
        function(){
            ProcessingPerFrame();
            frame++;
        }
        , 33
    );
}
window.onkeydown = function(event) {
    gKey[event.key] = 1;
};
window.onkeyup = function(event) {
    gKey[event.key] = 0;
};
window.onresize = canvasSize;

function canvasSize() { 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (canvas.width / FIELD_WIDTH < canvas.height / FIELD_HEIGHT){
        gHeight = FIELD_HEIGHT * canvas.width / FIELD_WIDTH;
        gWidth = canvas.width;
    } else {
        gHeight = canvas.height;
        gWidth = FIELD_WIDTH * canvas.height / FIELD_HEIGHT;
    }
}

function ProcessingPerFrame() {
    player.update();
    ScreenDepiction();
}

function ScreenDepiction() {
    mainDepiction();
    if (DEBUG_MODE) {
        canvasCon.imageSmoothingEnabled = 0;
    }
    canvasCon.drawImage(field, 0, 0, field.width, field.height, 0, 0, gWidth, gHeight)
}

function mainDepiction(){
    imgMap.draw("main", player);
    if (DEBUG_MODE) {
        fieldCon.fillStyle = "#ff0000";// 中心の描画
        fieldCon.fillRect(0, FIELD_HEIGHT / 2 - 1, FIELD_WIDTH, 2);
        fieldCon.fillRect(FIELD_WIDTH /2 - 1, 0, 2, FIELD_HEIGHT);

        fieldCon.fillStyle = DEBUG_WINDOW_STYLE;
        fieldCon.fillRect(20, 103, 105, 15)
        fieldCon.font = FONT;
        fieldCon.fillStyle =  FONT_STYLE;
        fieldCon.fillText("X = " + Math.floor(player.position.x) + ", Y = " + Math.floor(player.position.y), 25, 115);
    }
    //character.draw(player.position);
    player.draw();
}

function getMapIndex(type, x, y) {
    return MAP[type][(x + MAP_COLUMN) % MAP_COLUMN + (y + MAP_ROW) % MAP_ROW * MAP_COLUMN];
}