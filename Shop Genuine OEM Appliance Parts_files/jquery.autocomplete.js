function initAutocomplete() {
    jQuery('.autocomplete-form').autoCompleteForm({
        resultsHolder: 'div.ajax-drop',
        inputField: 'input.ac-input',
        listItemsFillsInput: true,
        filterResults: false,
        alwaysRefresh: true
    });
}


// autocomplete plugin
; (function ($, window) {
    // jquery plugin interface
    $.fn.autoCompleteForm = function (opt) {
        opt = $.extend({
            startCount: 3,
            dataAttr: 'q',
            ajaxAttr: 'ajax=1',
            listItems: 'li',
            listItemsFillsInput: true,
            alwaysRefresh: false,
            filterResults: true,
            highlightMatches: false,
            selectedClass: 'selected-line',
            resultsHolder: '.ajax-holder',
            inputField: 'input.text-input',
            hideDelay: 200
        }, opt);
        return this.each(function () {
            var form = $(this);
            var input = form.find(opt.inputField).attr('autocomplete', 'off');
            var target = input.attr('data-autocomplete');
            var ajaxHolder = form.find(opt.resultsHolder).hide();
            var acXHR, listItems, lastData, inFocus, focusTimer, visibleItems, visibleCount, currentIndex = 0;
            if (opt.filterResults) opt.alwaysRefresh = false;


            // load autocomplete data
            function loadData(callback) {
                // abort previous request if not completed
                if (acXHR && typeof acXHR.abort === 'function') {
                    acXHR.abort();
                }

                // start new request
                acXHR = $.ajax({
                    url: target,
                    dataType: 'text',
                    data: opt.ajaxAttr + '&' + opt.dataAttr + '=' + input.val(),
                    success: function (msg) {
                        // updating results
                        updateDrop(msg);
                        filterData();
                        showDrop();
                    },
                    error: function () {
                        // ajax error handling
                        if (typeof opt.onerror === 'function') {
                            opt.onerror.apply(this, arguments);
                        }
                    }
                })
            }

            // filter loaded data
            function filterData() {
                if (listItems) {
                    showDrop();

                    // show only items containing input text
                    if (opt.filterResults) {
                        listItems.show().each(function () {
                            var item = $(this);
                            item.html(item.data('orightml'));
                            if (item.text().toLowerCase().indexOf(input.val().toLowerCase()) != -1) {
                                item.show();
                            }
                            else {
                                item.hide();
                            }
                        });
                        if (!listItems.filter(':visible').length) {
                            hideDrop();
                        }
                    }

                    // highlight matches
                    if (opt.highlightMatches) {
                        listItems.children().each(function (i, obj) {
                            if (input.val().length >= opt.startCount) {
                                jQuery(obj).html(highlightWords(jQuery(obj).text(), input.val()));
                            }
                        });
                    }
                }
            }

            // update dropdown content
            function updateDrop(text) {
                if (lastData != text) {
                    lastData = text;
                    currentIndex = -1;
                    ajaxHolder.html(text);
                    listItems = ajaxHolder.find(opt.listItems);
                    listItems.each(function () {
                        // save original html data
                        var curItem = $(this);
                        curItem.data('orightml', curItem.html());

                        // element click behavior
                        curItem.click(function () {
                            return selectItem(curItem, true);
                        });

                        // element hover behavior
                        curItem.hover(function () {
                            listItems.removeClass(opt.selectedClass);
                            curItem.addClass(opt.selectedClass);
                            currentIndex = listItems.filter(':visible').index(curItem);
                        });
                    });

                }
            }

            // toggle autocomplete dropdown
            function showDrop() {
                if (input.val().length >= opt.startCount) {
                    ajaxHolder.show();
                    if (!listItems.filter(':visible').length) hideDrop();
                } else {
                    ajaxHolder.hide();
                }
            }
            function hideDrop() {
                ajaxHolder.hide();
            }
            function selectItem(obj, realEvent) {

                if (obj == null) {
                    return false;
                }

                hideDrop();

                if (opt.listItemsFillsInput) {

                    try {

                        input.val(obj.data("q")).focus();

                        var nav = obj.find('a').attr("href");
                        if (nav != '#') {

                            window.location.href = nav;
                            return false;
                        }

                    } catch (e) {}
                    
                    if (obj.closest('.autocomplete-form').find('input[type="submit"], button[type="submit"]').length > 0) {
                        obj.closest('.autocomplete-form').find('input[type="submit"], button[type="submit"]').click();
                    }

                    if (obj.closest('.autocomplete-form').find('.aslink').length > 0) {
                        eval(obj.closest('.autocomplete-form').find('.aslink').attr('href'));
                    }

                    return false;
                } else {
                    // example redirect
                    if (!realEvent) {
                        window.location.href = obj.find('a:eq(0)').attr('href');
                    }
                }
            }


            // event handlers
            input.keyup(function (e) {
                // skip system keys
                if (e.keyCode == 27 || e.keyCode == 13 || e.keyCode == 38 || e.keyCode == 40) return;

                // load data
                if (input.val().length < opt.startCount) hideDrop();
                if (opt.alwaysRefresh) {
                    loadData();
                } else {
                    if (!listItems) {
                        loadData();
                    }
                    filterData();
                }
            }).keydown(function (e) {
                if (listItems) {
                    visibleItems = listItems.filter(':visible');
                    visibleCount = visibleItems.length;
                    switch (e.keyCode) {
                        case 13:  // enter
                            if (currentIndex >= 0) {

                                if (visibleCount > 0)
                                    selectItem(visibleItems.eq(currentIndex));
                                else
                                    selectItem(listItems.eq(currentIndex));

                                break;
                            }
                            else {
                                hideDrop();
                                break;
                            }
                        case 27:  // escape
                            hideDrop();
                            break;
                        case 38:  // up
                            if (currentIndex >= 0) currentIndex--;
                            break;
                        case 40:  // down
                            if (currentIndex < visibleCount - 1) currentIndex++;
                            break;
                    }

                    // update classes
                    listItems.removeClass(opt.selectedClass);
                    if (currentIndex != -1) {

                        var currentItem;

                        if (visibleCount > 0)
                            currentItem = visibleItems.eq(currentIndex)
                        else
                            currentItem = listItems.eq(currentIndex);

                        currentItem.addClass(opt.selectedClass);

                        input.val(currentItem.data("q")).focus();

                    }
                }
            }).focus(function () {
                clearTimeout(focusTimer);
                inFocus = true;
            }).blur(function () {
                inFocus = false;
                focusTimer = setTimeout(hideDrop, opt.hideDelay);
            });
            form.submit(function () {
                return false;
            });
        });
    }

    // regexp highlight function
    function escapeRegExp(str) {
        return str.replace(new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"), "\\$&");
    }
    function highlightWords(str, word) {
        var regex = new RegExp("(" + escapeRegExp(word) + ")", "gi");
        return str.replace(regex, "<strong>$1</strong>");
    }
}(jQuery, this));