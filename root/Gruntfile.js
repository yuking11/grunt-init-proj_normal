'use strict';
// livereload用の処理
var path = require('path'),
        lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
        folderMount = function folderMount(connect, point) {
            return connect.static(path.resolve(point));
        };

module.exports = function(grunt) {
    var pkg, taskName;
    pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({
        pkg: pkg,
        dir: {
            src:'src',
            bin:'bin',
            release:'release',
            js: 'js',
            css: 'css',
            img:'img',
            sass:'_sass'
        },
        // ファイルをコピーする
        copy: {
            html: {
                expand: true,
                // コピー元のディレクトリ
                cwd: '<%= dir.bin %>/',
                src: ['**/*.html'],
                // コピー先のディレクトリ
                dest: '<%= dir.release %>/'
            },
            css: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['<%= dir.css %>/**'],
                dest: '<%= dir.release %>/'
            },
            images: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['<%= dir.img %>/**'],
                dest: '<%= dir.release %>/'
            },
            js: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['<%= dir.js %>/**'],
                dest: '<%= dir.release %>/'
            },
            php: {
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['**/*.php'],
                dest: '<%= dir.release %>/'
            }
        },
        // HTMLを圧縮する
        htmlmin: {
            all: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeCDATASectionsFromCDATA: true,
                    collapseWhitespace: true,
                    //removeRedundantAttributes: true,
                    //removeOptionalTags: true
                },
                expand: true,
                cwd: '<%= dir.bin %>/',
                src: ['**/*.html'],
                dest: '<%= dir.release %>/'
            }
        },
        // ファイルを結合する
        concat: {
            options: {
                separator: ';'
            },
            regacy: {
                src: [
                    '<%= dir.bin %>/<%= dir.js %>/libs/html5shiv.js',
                    '<%= dir.bin %>/<%= dir.js %>/libs/css3-mediaqueries.min.js'
                ],
                dest: '<%= dir.bin %>/<%= dir.js %>/libs/html5shiv-mediaqueries.js'
            },
            dist: {
                src: [
                    '<%= dir.bin %>/<%= dir.js %>/libs/css_browser_selector.min.js',
                    '<%= dir.bin %>/<%= dir.js %>/application.js'
                ],
                dest: '<%= dir.bin %>/<%= dir.js %>/application.min.js'
            }
        },
        // JSを圧縮する
        uglify: {
            min: {
                expand: true,
                cwd: '<%= dir.release %>/<%= dir.js %>/',
                src: ['application.min.js'],
                dest: '<%= dir.release %>/<%= dir.js %>/'
            }
        },
        // CSSを圧縮する
        cssmin: {
            all: {
                expand: true,
                cwd: '<%= dir.bin %>/<%= dir.css %>/',
                src: ['*.css'],
                dest: '<%= dir.release %>/<%= dir.css %>/'
            }
        },
        // 不要なファイルを削除する
        clean: {
            // releaseフォルダ内を削除する
            deleteReleaseFolder: {
                src: '<%= dir.release %>/'
            },
            // releaseから不要なファイルを削除する
            deleteReleaseFile: {
                src: [
                '<%= dir.release %>/<%= dir.img %>/_sprite'
                ],
            }
        },
        // localhostの設定
        // http://localhost:8080/で内容を確認することができます。
        connect: {
            livereload: {
                options: {
                    port: 8080,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, 'bin')];
                    }
                }
            }
        },
        // 通信帯域制限
        throttle: {
            server1: {
                remote_host: 'localhost',
                remote_port: 8080,
                local_port: 8081,
                upstream: 10 * 1024,
                downstream: 500 * 1024
            },
            server2: {
                remote_host: 'localhost',
                remote_port: 8080,
                local_port: 8082,
                upstream: 10 * 1024,
                downstream: 1000 * 1024
            }
        },
        // Compassの設定
        compass: {
            dist: {
                options: {
                    config: '<%= dir.src %>/<%= dir.sass %>/config.rb'
                }
            }
        },
        // ファイルを監視する
        watch: {
            options: {
                livereload: true,
                nospawn: true
            },
            html: {
                files: '<%= dir.bin %>/**/*.html',
                tasks: []
            },
            sass: {
                files: ['<%= dir.src %>/<%= dir.sass %>/**'],
                tasks: ['compass'/*, 'csscomb'*/]
            },
            js: {
                files: ['<%= dir.bin %>/<%= dir.js %>/**'],
                tasks: ['concat:dist']
            }
        },
        // CSSのプロパティを揃える
        csscomb:{
            dev:{
                expand: true,
                cwd: '<%= dir.bin %>/<%= dir.css %>/',
                src: ['*.css'],
                dest: '<%= dir.bin %>/<%= dir.css %>/'
            }
        }
    });

    // pakage.jsonに記載されているパッケージを自動読み込み
    for(taskName in pkg.devDependencies) {
        if(taskName.substring(0, 6) == 'grunt-') {
            grunt.loadNpmTasks(taskName);
        }
    }

    // sassをコンパイルするgruntコマンド
    grunt.registerTask('default', ['connect', 'throttle', 'concat', 'watch']);

    // 社内確認用のファイルを作るためのgruntコマンド
    grunt.registerTask('check', ['clean:deleteReleaseFolder', 'copy:html', 'copy:css', 'copy:images', 'copy:js', 'copy:php', 'clean:deleteReleaseFile']);

    // 納品用のファイルを作るためのgruntコマンド
    grunt.registerTask('release', ['clean:deleteReleaseFolder', 'copy:images', 'copy:js', 'copy:php', 'htmlmin', 'cssmin', 'uglify', 'clean:deleteReleaseFile']);

    grunt.registerTask('eatwarnings', function() {
        grunt.warn = grunt.fail.warn = function(warning) {
            grunt.log.error(warning);
        };
    });
};