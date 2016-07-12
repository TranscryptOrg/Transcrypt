// vim: ft=html
<sample>

    <h1>Riot Native Tag</h1>

    <h5 each="{lv}">name: {name} - counter: {this.count()}</h5>

    <script>
        this.counter = 0

        // riot's synctactic sugar:
        count() { this.counter += 1; return this.counter }

        // to test stuff on console:
        window.native_tag = this

        this.on('update', function() {
            this.lv = [{name: 'n1'}, {'name': 'n2'}]
            this.update()
        })
    </script>
    <style scoped>
    h1 {color: red}
    </style>

</sample>
