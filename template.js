/*
 * grunt-init-kyc-proj
 *
 * Copyright (c) 2013 KAYAC Ltd.
 */

'use strict';

// Basic template description.
exports.description = 'Create a clean proj, with mocha unit test';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ MUST be camelCase or hyphen-connected.';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt server_, ' +
  '_grunt test_ or _grunt build_.';
// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'site'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title'),
    init.prompt('description', 'Some descriptions.'),
    init.prompt('version', '0.0.1'),
    init.prompt('licenses', 'MIT'),
    init.prompt('doctype', 'HTML5'),
    init.prompt('font_sourcecode', 'true'),
    init.prompt('fontawesome', 'true'),
    init.prompt('author_name', 'yuking11'),
    init.prompt('author_email', 'yuking11@yuking11.net'),
    init.prompt('author_url', 'http://yuking11.net')
  ], function(err, props) {
    // A few additional properties.
    props.appName = props.name.replace(/(\-[a-z])/g,
      function ($1) {
        return $1.toUpperCase().replace('-','');
      });
    props.keywords = [];

    var SKIPS = [
      '**/*.png',
      '**/*.jpg',
      '**/*.gif',
      '**/*.ico',
      '**/libs/**'
    ];
    
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: SKIPS});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json', {
      name: 'proj_normal',
      version: '0.0.0',
      node_version: '>= 0.10.25',
      devDependencies: {
        "grunt": "~0.4.2",
        "grunt-contrib": "~0.9.0",
        "grunt-contrib-copy": "~0.5.0",
        "grunt-contrib-concat": "~0.3.0",
        "grunt-contrib-clean": "~0.5.0",
        "grunt-contrib-compass": "~0.7.2",
        "grunt-contrib-htmlmin": "~0.2.0",
        "grunt-contrib-cssmin": "~0.7.0",
        "grunt-contrib-sass": "~0.7.2",
        "grunt-contrib-csslint": "~0.2.0",
        "grunt-contrib-watch": "~0.5.3",
        "grunt-contrib-uglify": "~0.3.2",
        "grunt-contrib-requirejs": "~0.4.1",
        "grunt-contrib-compress": "~0.6.1",
        "grunt-contrib-connect": "~0.6.0",
        "grunt-contrib-livereload": "~0.1.2",
        "grunt-autoprefixer": "~0.7.2",
        "grunt-throttle": "~0.2.0",
        "css-parse": "~1.5.3"
      },
      engines: {
        'node': '>=0.10.25'
      }
    });

    // All done!
    done();
  });

};
