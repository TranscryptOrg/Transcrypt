// vim: ft=html
riot.tag2('sample', '<h1>Riot Native Tag</h1> <h5 each="{lv}">name: {name} - counter: {this.count()}</h5>', 
'sample h1,[riot-tag="sample"] h1,[data-is="sample"] h1{color: red}', '', function(opts) {
        this.counter = 0

        this.count = function() { this.counter += 1; return this.counter }.bind(this)

        window.native_tag = this

        this.on('update', function() {
            this.lv = [{name: 'n1'}, {'name': 'n2'}]
            this.update()
        })
});
