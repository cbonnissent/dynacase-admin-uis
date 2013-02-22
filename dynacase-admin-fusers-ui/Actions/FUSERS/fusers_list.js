(function ($) {
    $.widget("ui.combobox", {
        options:{
            autocomplete:{},
            mode:"input"
        },
        _create:function () {
            var input = this.options.mode == "input" ? "<input>" : "<button></button>",
                that = this,
                wasOpen = false,
                select = this.element.hide(),
                value = select.val() ? select.val() : "",
                wrapper = this.wrapper = $("<span>")
                    .addClass("ui-combobox")
                    .insertAfter(select);

            input = $(input)
                .appendTo(wrapper)
                .attr({
                    "title":select.attr("title"),
                    "id":select.prop("id")
                })
                .val(value)
                .addClass("ui-state-default ui-combobox-input")
                .autocomplete(this.options.autocomplete)
                .addClass("ui-widget ui-widget-content ui-corner-left")
                .on("focusout", function () {
                    var oldValue = $(this).attr("data-old-value");
                    if (oldValue) {
                        $(this).val(oldValue);
                        $(this).attr("data-old-value", "");
                    }
                });
            if (this.options.mode == "button") {
                input.html(select.html());
                input.on({
                    "click":function (event, ui) {
                        if (wasOpen) {
                            $(this).autocomplete("close");
                            return false;
                        }
                        $(this).autocomplete("search");
                        return false;
                    },
                    "mousedown":function () {
                        wasOpen = input.autocomplete("widget").is(":visible");
                    }}).css("cursor", "pointer").removeClass("ui-corner-left").addClass("ui-corner-all");
            }

            input.data("autocomplete")._renderItem = function (ul, item) {
                var html = "<a>";
                if (item.imgsrc) {
                    if (!item.imgclass) {
                        html += '<img title="' + item.label + '" src="' + item.imgsrc + '"/>';
                    } else {
                        html += '<span  class="' + item.imgclass + '"><img title="' + item.label + '" src="' + item.imgsrc + '" class="ui-icon-empty"/></span>';
                    }
                } else {
                    html += item.label
                }
                html += "</a>";
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append(html)
                    .appendTo(ul);
            };
            if (this.options.mode == "input") {
                $("<a>")
                    .attr("tabIndex", -1)
                    .attr("title", "[TEXT:Show All Items]")
                    .appendTo(wrapper)
                    .button({
                        icons:{
                            primary:"ui-icon-triangle-1-s"
                        },
                        text:false
                    })
                    .removeClass("ui-corner-all")
                    .addClass("ui-corner-right ui-combobox-toggle")
                    .on({
                        "mousedown":function () {
                            wasOpen = input.autocomplete("widget").is(":visible");
                        },
                        "click":function () {
                            input.attr("data-old-value", input.val());
                            input.focus();
// close if already visible
                            if (wasOpen) {
                                return;
                            }
                            input.val("");
// pass empty string as value to search for, displaying all results
                            input.autocomplete("search");
                        }
                    });
            }
            select.remove();
        },
        _destroy:function () {
            this.wrapper.remove();
            this.element.show();
        }
    });
})(jQuery);

$(function () {
    $.ui.dialog.prototype._makeDraggable = function () {
        this.uiDialog.draggable({
            containment:false
        });
    };
});

function focuskey(expand) {
    var o = document.getElementById("kid");
    if (o) {
        o.focus();
        o.select();
    }
    if (expand) {
        expandTree('gtree');
        expandTree('gtreeeall')
    }
}

function refreshRightSide(action, grp) {
    $.post("?app=FUSERS", {
        "action":"FUSERS_DATATABLES_LAYOUT",
        "type":action,
        "group":grp
    }, function (data) {
        $("#finfo").html(data);
        var searchCols = [];
        var columnDefs = [];
        switch (action) {
            case "user":
                columnDefs = [
                    {
                        "aTargets":['icon'],
                        "mDataProp":"icon",
                        "sWidth":"55px",
                        "sClass":"typeimg ui-corner-tl",
                        "bSortable":false,
                        bUseRendered:false,
                        fnRender:function (data) {
                            return '<img src="' + data.aData.icon + '">';
                        }
                    },
                    {
                        "aTargets":['us_login'],
                        "mDataProp":"us_login",
                        bUseRendered:false,
                        fnRender:function (data) {
                            return '<a href="[CORE_STANDURL]&app=FDL&action=FDL_CARD&id=' + data.aData.id + '">' + data.aData.us_login + '</a>';
                        }
                    },
                    {
                        "aTargets":['us_lname'],
                        "mDataProp":"us_lname",
                        bUseRendered:false,
                        fnRender:function (data) {
                            return data.aData.us_lname ? data.aData.us_lname : "";
                        }
                    },
                    {
                        "aTargets":['us_fname'],
                        "mDataProp":"us_fname",
                        bUseRendered:false,
                        fnRender:function (data) {
                            return data.aData.us_fname ? data.aData.us_fname : "";
                        }
                    },
                    {
                        "aTargets":['us_mail'],
                        "mDataProp":"us_mail",
                        bUseRendered:false,
                        fnRender:function (data) {
                            return  data.aData.us_mail ? data.aData.us_mail : "";
                        }
                    }
                ];
                searchCols = ["us_login", "us_lname", "us_fname", "us_mail"];
                break;
            case "role":
                columnDefs = [
                    {
                        "aTargets":['icon'],
                        "mDataProp":"icon",
                        "sWidth":"55px",
                        "sClass":"typeimg ui-corner-tl",
                        "bSortable":false,
                        bUseRendered:false,
                        fnRender:function (data) {
                            return '<a class="type" title="' + "[TEXT:Modify type]" + '" href="#"><img src="' + data.aData.icon + '"></a> ';
                        }
                    },
                    {
                        "aTargets":['title'],
                        "mDataProp":"title",
                        fnRender:function (data) {
                            return'<a href="[CORE_STANDURL]&app=FDL&action=FDL_CARD&id=' + data.aData.id + '">' + data.aData.title + '</a>';
                        }
                    }
                ];
                searchCols = ["title"];
                break;
            case "group":
                columnDefs = [
                    {
                        "aTargets":['icon'],
                        "mDataProp":"icon",
                        "sWidth":"55px",
                        "sClass":"typeimg ui-corner-tl",
                        "bSortable":false,
                        bUseRendered:false,
                        fnRender:function (data) {
                            return '<a class="type" title="' + "[TEXT:Modify type]" + '" href="#"><img src="' + data.aData.icon + '"></a> ';
                        }
                    },
                    {
                        "aTargets":['us_login'],
                        "mDataProp":"us_login",
                        fnRender:function (data) {
                            return '<a href="[CORE_STANDURL]&app=FDL&action=FDL_CARD&id=' + data.aData.id + '">' + data.aData.us_login + '</a>';
                        }
                    },
                    {
                        "aTargets":['grp_name'],
                        "mDataProp":"grp_name"
                    }
                ];
                searchCols = ["title"];
                break;
        }
        window.datatable = setDatatable(columnDefs, action);

        findSearchString($("#header").find("input"), searchCols, datatable);
        $("#menu").hide().menu().children().each(function () {
            var parent = $(this);
            parent.on("click", function () {
                displayWindow(400, 600, parent.find("a").attr("href"), action);
                $("#menu").hide();
                return false;
            });
        });
        $("#mainaction").button().on("click", function () {
            displayWindow(400, 600, $(this).attr("href"), action);
            return false;
        });
        $("#otheraction").button({
            text:false,
            icons:{
                primary:"ui-icon-triangle-1-s"
            }
        }).on("click", function () {
                var menu = $("#menu");
                if (menu.css("display") != "none") {
                    menu.hide();
                    return false;
                }
                menu.show().position({
                    my:"left top",
                    at:"left bottom",
                    of:this
                });
                $(window).one("click", function () {
                    menu.hide();
                });
                return false;
            });
        $("#buttonset").buttonset();
    });


    return false;
}

function addFieldToData(aoData, fieldName, fieldValue) {
    $.each(aoData, function (c) {
        if (aoData[c].name == fieldName && fieldValue != undefined) {
            aoData[c].value = fieldValue;
            return false;
        }
        return true;
    });
    return aoData;
}

function setDatatable(columnDef, type) {
    return $(".dataTable").dataTable({
        bServerSide:true,
        bJQueryUI:true,
        bProcessing:true,
        bPaginate:true,
        iDisplayLength:$("#fusersDisplayLength").val(),
        sAjaxSource:"?app=FUSERS&action=FUSERS_GET_DATATABLE_INFO",
        bDeferRender:true,
        sDom:'rt<"F"ip>l',
        "aaSorting":[
            [1, 'asc']
        ],
        fnRowCallback:function (nRow, aData, iDisplayIndex) {
            $(nRow).addClass("tableRow").on("click", function () {
                displayWindow(400, 600, '[CORE_STANDURL]&app=FDL&action=FDL_CARD&id=' + aData["id"], type);
                return false;
            });
            return nRow;
        },
        fnServerParams:function (aoData) {
            var oSettings = this.fnSettings();
            $("#header").find("th").each(function (i) {
                var value = $(this).find("input").val();
                if ($(this).children(0).find(".ui-combobox").length > 0) {
                    value = $("#typeValue").val();
                }
                aoData = addFieldToData(aoData, 'sSearch_' + i, value);
            });
            aoData.push({ "name":"totalRow", "value":oSettings._iRecordsTotal },
                {"name":"totalSearch", "value":oSettings._iRecordsDisplay},
                {"name":"type", "value":$("#fusersType").val()},
                {"name":"group", "value":$("#fusersGroup").val()});
        },
        fnDrawCallback:function () {
            $("#icon").combobox({
                mode:"button",
                autocomplete:{
                    minLength:0,
                    source:function (request, response) {
                        $.getJSON("?app=FUSERS&action=GET_TYPE_IMAGE&type=" + $("#fusersType").val(), function (data) {
                            response(data);
                        });
                    },
                    select:function (event, ui) {
                        if (! ui.item.imgclass) {
                            $(this).html('<img src="' + ui.item.imgsrc + '" title="' + ui.item.label + '"/>');
                        } else {
                             $(this).html('<span  class="' + ui.item.imgclass + '"><img title="' + ui.item.label + '" src="' + ui.item.imgsrc + '" class="ui-icon-empty"/></span>')
                        }
                        $("#typeValue").val(ui.item.value);
                        datatable.fnDraw();
                        return false;
                    }
                }
            });
        },
        "oLanguage":{
            "sZeroRecords":"[TEXT:No matching record found]",
            "sInfo":"[TEXT:Showing _START_ to _END_ of _TOTAL_ ]",
            "sInfoEmpty":"[TEXT:No result]",
            "sInfoFiltered":"",
            "sInfoThousands":" ",
            "sLengthMenu":"[TEXT:show _MENU_ per page]"
        },
        aoColumnDefs:columnDef
    });
}

function findSearchString($elements, fields, dataTable) {
    $elements.each(function (index, element) {
        $(element).on({
            "keypress":function (e) {
                if (e.keyCode == 13) {
                    var index = $.inArray(this.name, fields);
                    if (index == -1) {
                        /* Filter on all columns  of this element */
                        dataTable.fnFilter(this.value);
                    } else {
                        /* Filter on column (index) of this element */
                        dataTable.fnFilter(this.value, index);
                    }
                    return false;
                }
                return true;
            },
            "click":function (e) {
                //Prevent bubbling event
                return false;
            }
        });
    });
}

function displayWindow(height, width, ref, type) {
    var dialog = $("#dialogmodal");
    var $width = $(window).width() * 0.8;
    var $height = $(window).height() * 0.8;
    if (dialog.length <= 0) {
        dialog = $('<iframe id="dialogmodal" style="padding: 0;" src="' + ref + '" frameborder="0"></iframe>').appendTo('body');
    } else {
        dialog.attr("src", ref);
    }
    dialog.dialog({
        autoOpen:true,
        modal:true,
        draggable:false,
        resizable:true,
        height:$height,
        width:$width,
        overlay:{
            opacity:0.5,
            background:"black"
        },
        position:"center",
        beforeClose:function () {
            $(this).attr("src", "Images/1x1.gif");
            return false;
        }
    }).width($width).height($height).on("load", function () {
            var $this = $(this), doc, oldFrame;
            doc = this.contentDocument || this.contentWindow.document;
            if (doc) {
                dialog.dialog("option", "title", doc.title || "");
            }
            if (doc && doc.location && doc.location.href &&
                doc.location.href.toLowerCase().indexOf("images/1x1.gif") > -1) {
                oldFrame = $("#oldFrame");
                if (oldFrame.length === 0) {
                    oldFrame = $('<div id="oldFrame" style="display : none;"></div>');
                    $("body").append(oldFrame);
                }
                oldFrame.empty();
                /**detach and reattach iframe to handle ff infinite load bug**/
                $this.remove();
                datatable.fnDraw();
                if (type == "group") refreshLeftSide();
                oldFrame.append($this);
            }
        });
}

function refreshLeftSide() {
    $.post("?app=FUSERS&action=FUSERS_LIST", function (data) {
        $("#flist").html(data);
        convertTrees();
        focuskey(true);
    });
}
$(window).on("load", function (e) {
    convertTrees();
    focuskey(e);
    refreshRightSide('user');
});