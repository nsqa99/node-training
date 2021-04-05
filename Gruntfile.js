module.exports = (grunt) => {
    ['grunt-mocha-test'].forEach((task) => {
        grunt.loadNpmTasks(task);
    });

    grunt.initConfig({
        mochaTest: {
            src: ['src/qa/tests-*.js'], 
            options: { ui: 'tdd' }
        }
    });

    grunt.registerTask('default', ['mochaTest']);
}