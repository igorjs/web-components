'use strict';

(function () {

    var interpolate = (function(template, obj) {
        if (typeof obj === 'object') {
            for (var key in obj) {
                var find = '${' + key + '}';

                if (template.indexOf(find) > -1) {
                    template = template.replace(find, obj[key]);
                    delete obj[key];
                }
            }
        }
        return template;
    });

    var fromJson = (function(str) {
        var obj = null;

        if (typeof str === 'string') {
            try {
                obj = JSON.parse(str);
            } catch (e) {
                throw new Error("Invalid JSON string provided. ");
            }
        }
        return obj;
    });

    /**
     * Componente de renderização do Menu Tree View
     *
     * @WebComponent
     * @type {HTMLElement}
     */
    var MenuTreeView = (function() {

        var prototype = Object.create(HTMLElement.prototype);

        // Lifecycle Events
        prototype.createdCallback = function() {
            if (!!this.getAttribute('shadow')) {
                this.createShadowRoot();
            }
        };

        prototype.attachedCallback = function() {
            this.render();
        };

        prototype.render = function() {
            var model = this.getAttribute('model');
            var element = this.getAttribute('element');
            var template = this.innerHTML;

            var html = (element !== null ) ? '<' + element.toLowerCase() + '>' : '';

            if (Array.isArray(content)) {
                content.forEach(function(item){
                    html += interpolate(template, item);
                });
            } else {
                throw new Error('Content should be an Array of objects.');
            }

            html += (element !== null ) ? '</' + element.toLowerCase() + '>' : '';

            if (!!this.getAttribute('shadow')) {
                this.shadowRoot.innerHTML = html;
                this.innerHTML = '';
            } else {
                this.innerHTML = html;
            }
        };

        prototype.attributeChangedCallback = function(name) {
            if (name === 'content') {
                this.render();
            }
        };

    })();

    document.registerElement('menu-tree-view', MenuTreeView);

})();
