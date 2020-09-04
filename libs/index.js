$.fn.indexAnimate = function(p) {
    p = $.extend({
        window: $(this),
        name: 'indexAnimate',
        rendering: false,
        prevScrollTop: 0,
        initialize: function() {
            if (p.window.data(p.name)) {
                return false;
            }
            p.container = $('div.horizontal_slide');
            if (!p.container || p.container.length != 1) {
                return false;
            }
            p.containerWindow = p.container.find('div.container_window');
            if (!p.containerWindow || p.containerWindow.length != 1) {
                return false;
            }
            p.window.data(p.name, true);
            p.width = p.window.width();
            p.height = p.window.height();
            p.visibleMinHeight = p.container.offset().top;
            p.visibleMaxHeight = p.visibleMinHeight + p.container.height();
            p.containerMaxLeft = p.width - p.containerWindow.width();
            p.step = parseInt(p.width / 6);
            p.speed = 120;
            return true;
        },
        containerHasVisible: function(scrollTop) {
            return p.height + scrollTop - p.visibleMaxHeight >= 0 && scrollTop <= p.visibleMinHeight;
        },
        getContainerStatus: function(left) {
            if (left == 0) {
                return 'LEFT';
            }
            if (left == p.containerMaxLeft) {
                return 'RIGHT';
            }
            return 'CENTER';
        },
        getScrollTop: function() {
            return p.window.scrollTop();
        },
        pause: function(scrollTop) {
            p.window.scrollTop(scrollTop);
        }
    }, p || {});
    if (!p.initialize()) {
        return p.window;
    }
    p.process = function(e, scrollTop, type) {
        var left = p.containerWindow.position().left;
        var status = p.getContainerStatus(left);
        var visible = p.containerHasVisible(scrollTop);
        visible = visible ? visible : p.containerHasVisible(p.prevScrollTop);
        visible = visible ? visible : status == 'CENTER';
        if (visible && type == 'DOWN' && status == 'LEFT') {
            p.horizontalToRight(left);
            return false;
        }
        if (visible && type == 'DOWN' && status == 'CENTER') {
            p.horizontalToRight(left);
            return false;
        }
        if (visible && type == 'UP' && status == 'CENTER') {
            p.horizontalToLeft(left);
            return false;
        }
        if (visible && type == 'UP' && status == 'RIGHT') {
            p.horizontalToLeft(left);
            return false;
        }
        return true;
    };
    p.horizontalToRight = function(left) {
        p.rendering = true;
        p.containerWindow.animate({ left: Math.max(left - p.step, p.containerMaxLeft) }, p.speed, function() {
            p.rendering = false;
        });
    }
    p.horizontalToLeft = function(left) {
        p.rendering = true;
        p.containerWindow.animate({ left: Math.min(left + p.step, 0) }, p.speed, function() {
            p.rendering = false;
        });
    };
    p.window.scroll(function(e) {
        var current = p.getScrollTop();
        if (current == p.prevScrollTop || p.rendering) {
            p.pause(p.prevScrollTop);
            return true;
        }
        if (p.process(e, current, current < p.prevScrollTop ? 'UP' : 'DOWN')) {
            p.prevScrollTop = current;
        } else {
            p.pause(p.prevScrollTop);
        }
    });
    return p;
};
$(function() {
    $(window).indexAnimate();
});