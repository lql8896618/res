$(function () {

	var Accordion = function (el, multiple) {
		this.el = el || {};
		// more then one submenu open?
		this.multiple = multiple || false;

		var dropdownlink = this.el.find('.dropdownlink');
		dropdownlink.on('click',
			{el: this.el, multiple: this.multiple},
			this.dropdown);
	};

	Accordion.prototype.dropdown = function (e) {
		var $el = e.data.el,
			$this = $(this),
			//this is the ul.submenuItems
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');

		if (!e.data.multiple) {
			//show only one menu at the same time
			$el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
		}
	}

	$.getJSON('loadFunctionTree', {}, function (root_node) {
		console.log('+ root ' + root_node.code);
		if (root_node.childs.length <= 0) return;
		var child_html = '';
		$.each(root_node.childs, function () {
			console.log("----+ each childs " + this.code)
			child_html += '<li>';
			child_html += '    <div class="dropdownlink">';
			child_html += '        <i class="fa fa-road" aria-hidden="true"></i>';
			child_html += '        ' + this.label;
			child_html += '        <i class="fa fa-chevron-down" aria-hidden="true"></i>';
			child_html += '   </div>';
			if (!this.is_leaf && this.childs.length > 0) {
				child_html += '<ul class="submenuItems">';
				$.each(this.childs, function () {
					console.log("--------+ each childs " + this.code)
					child_html += '    <li>';
					child_html += '       <a href="javascript:  $(\'#div_container\').load(\'pageChanged\', {mid: \'' + this.page + '\'})">';
					child_html += '            ' + this.label;
					child_html += '        </a>';
					child_html += '    </li>';
				})
				child_html += '</ul>';
			}
			child_html += '</li>';
		});
		$('.accordion-menu').append(child_html);
		var accordion = new Accordion($('.accordion-menu'), false);
	});
})