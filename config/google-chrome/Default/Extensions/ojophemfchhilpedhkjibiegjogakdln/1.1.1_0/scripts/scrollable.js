(function($){
	$.fn.scrollable = function(innerSelector) {
		var $this = $(this),
			$inner = $(innerSelector).css('position', 'absolute');

		if ($this.length == 0 || $inner.length == 0) {
			return;
		}

		var $document = $(document),
			$scrollbar = $('<div class="scrollbar" style="display:none"></div>').appendTo($this),
			step = 0;

		function getMousePos(evt) {
			var offset = $scrollbar.offset();
			return {
				x : evt.pageX - offset.left,
				y : evt.pageY - offset.top
			};
		}

		function scrollTo(x) {
			// normalize
			x = Math.min(
				Math.max(x, 0),
				$this.width() - $scrollbar.width()
			);

			$scrollbar.css('left', x);
			$inner.css('left', step * -x);
		}

		function updateScrollbar() {
			var innerWidth = $inner.width(),
				containerWidth = $this.width();
			if (innerWidth > containerWidth) {
				var scrollWidth = containerWidth / (innerWidth / containerWidth);
				$scrollbar.width(scrollWidth);
				// update step
				step = innerWidth / containerWidth;
				scrollTo(containerWidth - scrollWidth);
				$scrollbar.show();
			}
			else {
				$inner.css('left', '0');
				$scrollbar.hide();
			}
		}

		// attach event handlers
		$document.on('mousedown', '.scrollbar', function(evt){
			evt.preventDefault();
			evt.stopPropagation();
			$scrollbar.addClass('active');
			var anchor = getMousePos(evt).x;
			// bind mousemove only from mousedown and unbind in mouseup
			$document.on('mousemove', function(evt){
				evt.preventDefault();
				scrollTo(
					$scrollbar.position().left - (anchor - getMousePos(evt).x)
				);
			});
		}).on('mouseup', function(evt){
			$scrollbar.removeClass('active');
			$document.off('mousemove');
		}).on('scrollbar:update', updateScrollbar);

		$this.on('mousewheel', function(evt){
			evt.preventDefault();
			evt.stopPropagation();

			scrollTo(
				$scrollbar.position().left +
				(evt.originalEvent.wheelDelta > 0 ? -50 : 50)
			);
		});

		$(window).resize(updateScrollbar);
	};
})(jQuery);