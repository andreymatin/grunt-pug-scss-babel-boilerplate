module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

  // configure the tasks
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * Babel
     */
    babel: {
      options: {
        'sourceMap': false,
        presets: ['@babel/preset-env']
      },
      dist: {
        files: {
          'html/js/app.compiled.js': 'html/js/app.js'
        }
      }
    },

    /**
     * Concatinate all JavaScript files to one
     */
    concat: {
      dist: {
        src: [
          'html/js/text-slider.js',
          'html/js/app.compiled.js'
        ],

        dest: 'html/js/script.js'
      }
    },

    /**
     * Minify JavaScript files with UglifyJS
     */
    uglify: {
      build: {
        src: 'html/js/script.js',
        dest: 'html/js/script.min.js'
      }
    },

    /**
     *  copy from the source directory to build
     */
    copy: {
      build: {
        cwd: 'html',
        src: [
          '**',
          '!**/*.pug',
          '!sass',
          '!sass/*',
          '!**/*.scss',
          '!partials',
          '!partials/*'
        ],
        dest: 'html',
        expand: true
      },
    },

    /**
     *  clean the build directory
     */
    clean: {
      build: {
        src: ['html']
      },
    },

    /**
     * Pug to HTML
     */
    pug: {
      compile: {
        options: {
          data: {}
        },
        files: [{
          expand: true,
          cwd: 'html',
          src: ['**/*.pug'],
          dest: 'html',
          ext: '.html'
        }]
      }
    },

    /**
     * SCSS
     */
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: [{
          expand: true,
          cwd: 'html/scss',
          src: ['*.scss'],
          dest: 'html/css',
          ext: '.css'
        }]
      }
    },

    /**
     * Watcher
     */
    watch: {
      options: {
        livereload: true,
        spawn: false
      },
      sass: {
        files: [
          'html/scss/*.scss',
          'html/scss/*/*.scss'
        ],
        tasks: ['sass']
      },
      pug: {
        files: 'html/**/*.pug',
        tasks: ['pug']
      },
      scripts: {
        files: ['html/js/*.js'],
        tasks: ['concat', 'uglify']
      }
    },

    /**
     * Local server
     */
    connect: {
      server: {
        options: {
          port: 4000,
          base: 'html',
          hostname: '*'
        }
      }
    }
  });

  /**
   * Tasks
   */
  grunt.registerTask(
    'build',
    ['pug', 'sass', 'babel', 'concat', 'uglify']
  );

  grunt.registerTask(
    'default',
    ['build', 'connect', 'watch']
  );
};