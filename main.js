"use strict"

const DEBUG_MODE = true;
const START_X = 15;                                 // プレイヤー初期位置 タイル座標 x値
const START_Y = 17;                                 // プレイヤー初期位置 タイル座標 y値
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

class Map {
    constructor() {
        this.img = new Image();
        this.img.src = "img/map.png";           // マップチップファイル
        this.con = fieldCon;                    // 2D描画コンテキスト
        this.middlePointPos = new Vector2(      // 画面の中心点の座標
            FIELD_WIDTH / 2
            , FIELD_HEIGHT / 2
        );
        this.drawRange = new Vector2(           // 描画範囲
            Math.ceil(this.middlePointPos.x / TILE_SIZE)
            , Math.ceil(this.middlePointPos.y / TILE_SIZE)
        );
    }
    /**
     * プレイヤーの座標を基準にマップの描画を行う
     * 
     * @param {string}  type   マップの種類
     * @param {Vector2} playerPos プレイヤー座標
     */
    draw(type, playerPos) {
        let mx;                             // 描画するマップタイルのタイル座標 x値
        let my;                             // 描画するマップタイルのタイル座標 y値
        let dx;                             // 描画イメージ矩形のタイル座標 x値
        let dy;                             // 描画イメージ矩形のタイル座標 y値
        let index;                          // マップタイルのインデックス
        let drawCorrection = new Vector2(   // 描画イメージ矩形の補正値
            playerPos.x % TILE_SIZE - this.middlePointPos.x % TILE_SIZE     // プレーヤーのタイル座標 小数部 x値 - 画面中心点のタイル座標 小数部 x値
            , playerPos.y % TILE_SIZE - this.middlePointPos.y % TILE_SIZE   // プレーヤーのタイル座標 小数部 y値 - 画面中心点のタイル座標 小数部 y値
        );
        
        for (let y = -this.drawRange.y; y <= this.drawRange.y; y++) {
            my = y + Math.floor(playerPos.y / TILE_SIZE);                   // プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
            dy = y + Math.floor(this.middlePointPos.y / TILE_SIZE);         // 基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
            for (let x = -this.drawRange.x; x <= this.drawRange.x; x++) {
                mx = x + Math.floor(playerPos.x / TILE_SIZE);               // プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
                dx = x + Math.floor(this.middlePointPos.x / TILE_SIZE);     // 基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
                index = getMapIndex(                                        // 描画するタイルのインデックスを取得
                    type
                    , mx
                    , my
                );

                this.con.drawImage(
                    this.img                                    // 描画するイメージ
                    , (index % TILE_COLUMN) * TILE_SIZE         // 元イメージ使用範囲の矩形のx座標
                    , Math.floor(index / TILE_ROW) * TILE_SIZE  // 元イメージ使用範囲の矩形のy座標
                    , TILE_SIZE                                 // 元イメージ使用範囲の矩形の幅
                    , TILE_SIZE                                 // 元イメージ使用範囲の矩形の高さ
                    , dx * TILE_SIZE - drawCorrection.x         // 描画イメージ矩形のx座標
                    , dy * TILE_SIZE - drawCorrection.y         // 描画イメージ矩形のy座標
                    , TILE_SIZE                                 // イメージを描画する幅
                    , TILE_SIZE                                 // イメージを描画する高さ
                );
            }
        }
    }
}

class Character {
    constructor() {
        this.img = new Image();
        this.img.src = "img/player.png";            // キャラチップファイル
        this.con = fieldCon;                        // 2D描画コンテキストを取得
        this.position = new Vector2(16, 16);        // 座標
        this.angle = 0;                             // 向き
        this.act = 0;                               // 動き
        this.move = new Vector2(0, 0);              // 移動量
    }
    /**
     * @param {Vector2} player_pos プレイヤー座標
     */
    draw(player_pos) {
        this.con.drawImage(
            this.img
            , this.act * CHAR_COLUMN
            , this.angle * CHAR_ROW
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

        this.act = (frame >> 4 & 1);  // 通常動作の定義

        if (this.move.mag() === 0) {                // 歩行動作の定義
            if (gKey["a"]) {                            // 左に動く
                this.move.x = -TILE_SIZE;
                this.angle = 1;
            } else if (gKey["w"]) {                     // 上に動く
                this.move.y = -TILE_SIZE;
                this.angle = 3;
            } else if (gKey["d"]) {                     // 右に動く
                this.move.x = TILE_SIZE;
                this.angle = 2;
            } else if (gKey["s"]) {                     // 下に動く
                this.move.y = TILE_SIZE;
                this.angle = 0;
            }
        }

        index = getMapIndex(                        // 移動後のタイルのインデックスを取得
            "main"
            , this.position.add(this.move).x / TILE_SIZE
            , this.position.add(this.move).y / TILE_SIZE
        );
        if (index === 0 || index === 1 || index === 2) {    // 移動後のタイルが移動不可の場合
            this.move.x = 0;                                    // 移動距離のx座標を0とする
            this.move.y = 0;                                    // 移動距離のy座標を0とする
        }
        if (this.move.mag() != 0) {                         // 移動距離が0でない場合、座標の更新を行う
            this.position.x += Math.sign(this.move.x);          // 座標の更新　x値
            this.position.y += Math.sign(this.move.y);          // 座標の更新　y値
            this.move.x -= Math.sign(this.move.x);              // 移動距離のx座標が0になるまで減算
            this.move.y -= Math.sign(this.move.y);              // 移動距離のy座標が0になるまで減算

            if (this.position.x < 0) {                          // マップのループに対応するためにx座標を更新
                this.position.x += MAP_COLUMN * TILE_SIZE;
            } else if(this.position.x >= MAP_COLUMN * TILE_SIZE) {
                this.position.x %= MAP_COLUMN * TILE_SIZE;
            }
            if (this.position.y < 0) {                          // マップのループに対応するためにy座標を更新
                this.position.y += MAP_ROW * TILE_SIZE;
            } else if(this.position.y >= MAP_ROW * TILE_SIZE) {
                this.position.y %= MAP_ROW * TILE_SIZE;
            }
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
            START_X * TILE_SIZE + TILE_SIZE / 2
            , START_Y * TILE_SIZE + TILE_SIZE / 2
        );                                              // 座標　ドット単位
        this.angle = 0;                                 // 向き
        this.act = 0;                                   // 動き
        this.move = new Vector2(0, 0);                  // 移動量
    }
    draw() {
        this.con.drawImage(
            this.img
            , this.act * CHAR_COLUMN
            , this.angle * CHAR_ROW
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
    imgMap.draw("main", player.position);
    if (DEBUG_MODE) {
        fieldCon.fillStyle = "#ff0000";// 中心の描画
        fieldCon.fillRect(0, FIELD_HEIGHT / 2 - 1, FIELD_WIDTH, 2);
        fieldCon.fillRect(FIELD_WIDTH /2 - 1, 0, 2, FIELD_HEIGHT);

        fieldCon.fillStyle = DEBUG_WINDOW_STYLE;
        fieldCon.fillRect(20, 103, 105, 15)
        fieldCon.font = FONT;
        fieldCon.fillStyle =  FONT_STYLE;
        fieldCon.fillText("X = " + Math.floor(player.position.x / TILE_SIZE) + ", Y = " + Math.floor(player.position.y / TILE_SIZE), 25, 115);
    }
    //character.draw(player.position);
    player.draw();
}

function getMapIndex(type, x, y) {
    return MAP[type][(Math.floor(x) + MAP_COLUMN) % MAP_COLUMN + (Math.floor(y) + MAP_ROW) % MAP_ROW * MAP_COLUMN];
}