# grunt-init proj_normal

> ウェブサイト制作用[grunt-init][]テンプレート

[grunt-init]: http://gruntjs.com/project-scaffolding

## インストール

テンプレートをインストールする前に、[grunt-init][]をインストールしてください。

[grunt-init][]インストールした後、このテンプレートを`~/.grunt-init/`に置くか、
ターミナルにて以下の`git clone`コマンドを実行してください：
```
git clone https://github.com/yuking11/grunt-init-proj_normal.git ~/.grunt-init/proj_normal
```

## 使い方

### Step 1. テンプレートを展開

ターミナルを起動し、プロジェクト用ディレクトリに移動して、以下のコマンドを実行してください。

```
grunt-init proj_normal
```

しばらくするとプロンプトへの回答が求められます。
そのままでよければ`return`を押してください。
また、いくつかオプションがあるので、下記を参考に設定してください。

- Doctype デフォルト HTML5 // or HTML4（html4.01t）
- Source Code Selfの使用： デフォルト true // or false
- font-awesomeの使用： デフォルト true // or false

### Step 2. node_modulesをインストール

続けて以下のコマンドを実行してください。

```
npm install
```

### Step 3. `grunt`を使って制作開始

`grunt`を実行すると、ローカルサーバーが立ち上がります。

- `http://localhost:8080/` 通信帯域制限 なし
- `http://localhost:8081/` 通信帯域制限 500 * 1024
- `http://localhost:8082/` 通信帯域制限 1000 * 1024

`src`及び`bin`ディレクトリ下の編集が保存されると、編集されたファイルは自動的にコンパイルされ、ブラウザは自動的にリロードを行います。

### Step 4. `grunt check`で開発用ファイル生成

`grunt check`を実行すると、`release`ディレクトリが生成され、開発用ファイルがコンパイルされます。

### Step 5. `grunt release`で本番用ファイル生成

`grunt release`を実行すると、`release`ディレクトリ内のファイルが整理（不要ファイル削除/圧縮）され、本番用ファイルが生成されます。

## ディレクトリ構成

```
root
├─ bin
│  ├─ css
│  ├─ img
│  │  ├─ _sprite
│  │  │  └─ サンプル画像ファイル
│  │  ├─ apple-touch-icon.png
│  │  └─ favicon.ico
│  └─ js
│  │  ├─ libs
│  │  │  ├─ css_browser_selector.min.js
│  │  │  ├─ css3-mediaqueries.min.js
│  │  │  ├─ html5shiv.js
│  │  │  ├─ jquery-1.10.2.min.js
│  │  │  └─ selectivizr-min.js
│  │  └─ application.js
│  └─ index.html
├─ node_modules
├─ src
│  └─ _sass
│      ├─ partials
│      │  ├─ _default.scss
│      │  ├─ _mixin.scss
│      │  ├─ _modules.scss
│      │  ├─ _normalize.scss
│      │  └─ _variables.scss
│      ├─ _styles.scss
│      ├─ application.scss
│      └─ config.rb
├─ Gruntfile.js
├─ LICENSE-MIT
├─ package.json
└─ README.md
```

## 使用プラグイン

下記プラグインがインストールされているので、状況に応じて追加/設定してください。

* grunt: ~0.4.2
* grunt-contrib: ~0.9.0
* grunt-contrib-copy: ~0.5.0
* grunt-contrib-concat: ~0.3.0
* grunt-contrib-clean: ~0.5.0
* grunt-contrib-compass: ~0.7.2
* grunt-contrib-htmlmin: ~0.2.0
* grunt-contrib-cssmin: ~0.7.0
* grunt-contrib-sass: ~0.7.2
* grunt-contrib-csslint: ~0.2.0
* grunt-contrib-watch: ~0.5.3
* grunt-contrib-uglify: ~0.3.2
* grunt-contrib-requirejs: ~0.4.1
* grunt-contrib-compress: ~0.6.1
* grunt-contrib-connect: ~0.6.0
* grunt-contrib-livereload: ~0.1.2
* grunt-autoprefixer: ~0.7.2
* grunt-throttle: ~0.2.0
* css-parse: ~1.5.3