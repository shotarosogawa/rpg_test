"use strict"

const DEBUG_MODE = true;
const FONT = "12px monospace";                  // 使用フォント
const FONT_STYLE = "white";                     // 文字色
const WINDOW_STYLE = "rgba(0, 0, 0, 0.75)";     // 情報ウィンドウの色
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
const MAP_COLUMN = 32;                          // マップ高さ（タイル）
const MAP_ROW = 32;                             // マップ幅（タイル）
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
let player;                             // プレイヤー
let character;                          // キャラクター
let frame = 0;                          // 内部カウンタ
let keyBuffer = new Uint8Array(0x100);	// キーバッファ

/**
 * マップクラス
 */
class Map {
    constructor() {
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
    draw(type, playerPos) {
        let mx;                                                         // 描画するマップタイルのタイル座標 x値
        let my;                                                         // 描画するマップタイルのタイル座標 y値
        let dx;                                                         // 描画イメージ矩形のタイル座標 x値
        let dy;                                                         // 描画イメージ矩形のタイル座標 y値
        let index;                                                      // マップタイルのインデックス
        let drawCorrection = new Vector2(                               // 描画イメージ矩形の補正値　プレイヤーがタイル中央に描画されるように補正する
            playerPos.x % TILE_SIZE - this.middlePointPos.x % TILE_SIZE     // プレーヤーのタイル座標 小数部 x値 - 画面中心点のタイル座標 小数部 x値
            , playerPos.y % TILE_SIZE - this.middlePointPos.y % TILE_SIZE   // プレーヤーのタイル座標 小数部 y値 - 画面中心点のタイル座標 小数部 y値
        );
        
        for (let y = -this.drawRange.y; y <= this.drawRange.y; y++) {
            my = y + Math.floor(playerPos.y / TILE_SIZE);                   // 使用するマップタイルの座標 y値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
            dy = y + Math.floor(this.middlePointPos.y / TILE_SIZE);         // 描画イメージ矩形の座標 y値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
            for (let x = -this.drawRange.x; x <= this.drawRange.x; x++) {
                mx = x + Math.floor(playerPos.x / TILE_SIZE);                   // 使用するマップタイルの座標 x値　プレイヤー座標を基準に描画するので、プレーヤーのタイル座標の整数部を加算
                dx = x + Math.floor(this.middlePointPos.x / TILE_SIZE);         // 描画イメージ矩形の座標 x値　　　基準とするプレイヤーはマップの中心点に描画するので、画面の中心点のタイル座標の整数部を加算
                index = getMapIndex(                                            // 描画するタイルのインデックスを取得
                    type                                                            // 使用するマップの種類を指定
                    , mx                                                            // 使用するマップタイルの座標 x値
                    , my                                                            // 使用するマップタイルの座標 y値
                );

                this.con.drawImage(
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
}

/**
 * キャラクタークラス
 */
class Character {
    /**
     * @param {Vector2} position キャラクター座標
     */
    constructor(position = new Vector2) {
        this.img = new Image();
        this.img.src = "img/player.png";                    // キャラチップファイル
        this.con = screenCon;                               // 2D描画コンテキストを取得
        this.position = new Vector2(                        // 座標
            position.x * TILE_SIZE + TILE_SIZE / 2              // 開始位置のタイル座標をドット座標に変換
            , position.y * TILE_SIZE + TILE_SIZE / 2            // 開始位置のタイル座標をドット座標に変換
        );
        this.angle = 0;                                     // 向き
        this.act = 0;                                       // 動き
        this.move = new Vector2(0, 0);                      // 移動量
        this.drawCorrection = new Vector2(                  // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                      // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                       // キャラの高さ - タイルサイズの1/2
        );
    }
    /**
     * キャラクターの描画を行う
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
        let index;

        this.act = frame >> 4 & 1;                          // 通常動作の定義

        if (this.move.mag() === 0) {                        // 歩行動作の定義
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

        index = getMapIndex(                                // 移動後のタイルのインデックスを取得
            "main"                                              // 使用するマップの種類を指定
            , this.position.add(this.move).x / TILE_SIZE        // 使用するマップタイルの座標 x値　移動後のドット座標をタイル座標に変換
            , this.position.add(this.move).y / TILE_SIZE        // 使用するマップタイルの座標 y値　移動後のドット座標をタイル座標に変換
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

/**
 * プレイヤークラス
 */
class Player extends Character {
    constructor() {
        super();
        this.img = new Image();
        this.img.src = "img/player.png";                // プレイヤーチップファイル
        this.con = screenCon;                           // 2D描画コンテキストを取得
        this.position = new Vector2(                    // 座標 ドット単位
            START_X * TILE_SIZE + TILE_SIZE / 2             // 開始位置のタイル座標をドット座標に変換
            , START_Y * TILE_SIZE + TILE_SIZE / 2           // 開始位置のタイル座標をドット座標に変換
        );
        this.angle = 0;                                 // 向き
        this.act = 0;                                   // 動き
        this.move = new Vector2(0, 0);                  // 移動量
        this.drawCorrection = new Vector2(              // 描画イメージ矩形の補正値　プレイヤーが画面中央に描画されるように補正する
            CHAR_WIDTH / 2                                  // キャラの幅の1/2
            , CHAR_HEIGHT - TILE_SIZE / 2                   // キャラの高さ - タイルサイズの1/2
        );
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

    map = new Map();                                // マップの定義
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
    player.update();
    ScreenDepiction();
}

/**
 * 画面の描画
 */
function ScreenDepiction() {
    mainDepiction();
    if (DEBUG_MODE) {
        canvasCon.imageSmoothingEnabled = 0;
    }
    canvasCon.drawImage(screen, 0, 0, screen.width, screen.height, 0, 0, fieldWidth, fieldHeight)
}

/**
 * メイン要素の描画
 */
function mainDepiction(){
    map.draw("main", player.position);
    if (DEBUG_MODE) {
        screenCon.fillStyle = "#ff0000";                                // 中線の描画
        screenCon.fillRect(0, SCREEN_HEIGHT / 2 - 1, SCREEN_WIDTH, 2);
        screenCon.fillRect(SCREEN_WIDTH /2 - 1, 0, 2, SCREEN_HEIGHT);

        screenCon.fillStyle = WINDOW_STYLE;
        screenCon.fillRect(20, 103, 105, 15)
        screenCon.font = FONT;
        screenCon.fillStyle =  FONT_STYLE;
        screenCon.fillText("X = " + Math.floor(player.position.x / TILE_SIZE) + ", Y = " + Math.floor(player.position.y / TILE_SIZE), 25, 115);
    }
    //character.draw(player.position);
    player.draw();
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