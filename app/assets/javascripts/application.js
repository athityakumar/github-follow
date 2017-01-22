//= require jquery
//= require dataTables/jquery.dataTables
//= require dataTables/bootstrap/3/jquery.dataTables.bootstrap
//= require_tree
'use strict';

$(document).ready(function() {
  $.fn.randomString = function(length) {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".split("");
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
    var str = "";
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  $.fn.show_request_access_modal = function() {
    // Set to scrollTop
    $(document).scrollTop($('#section_7').position().top);
    // Show the bootstrap modal
    $('#request_access_modal').modal({
      backdrop: 'static',
      keyboard: false
    });
  }
  $.fn.get_early_access = function(eve, element) {
    eve = eve || window.event;
    eve.preventDefault();
    var form = $(element).closest('form');
    var email = form.find('input[type="email"]');
    if (email.val() == "") {
      var err_ele = form.find('.email-error');
      err_ele.text('Could you fill the email address please?');
      email.on('focus', function() {
        err_ele.text('')
      });
      return false;
    } else {
      $('#concierge_email').val(email.val());
      $('#request_access_modal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
  }
  if ( $('#concierge_modal').length > 0 ) {
    $('#concierge_modal').parsley();
    $('#concierge_modal').on('submit', function(e) {
      e.preventDefault();
      var form = $(this);
      form.parsley().validate();
      if (form.parsley('isValid')) {
        $('#request_access_submit').val('Requesting...').attr('disabled', 'true');
        $.ajax({
          url: form.attr('action'),
          data: form.serialize(),
          type: 'post',
          success: function() {
            $('.clearfield').val("");
            $('#request_access_modal .modal-body-1, #request_access_modal .modal-body-2').toggle();
            $('#request_access_submit').val('REQUEST ACCESS').removeAttr('disabled');
          },
          error: function() {
            $('#request_access_submit').val('REQUEST ACCESS').removeAttr('disabled');
            alert("There was a problem with us receiving your data. Please refresh this page and try again. Or contact us at info@contractiq.com. We're sorry this happened! :(");
          }
        });
      } else {
        alert("This form isn't valid");
      }
    });
    $('#concierge_name').on('blur', function() {
      var name = $(this).val();
      $('#request_person_name').text(name);
    })
  }
  if ( $('#twitter_form').length > 0 ) {
    $('#twitter_form').parsley();
  }
  if ( $('#twitter_followers').length > 0 ) {
    var twitterTable = $('#twitter_followers').dataTable({
      sPaginationType: "simple_numbers",
      bInfo: true,
      bProcessing: true,
      bServerSide: true,
      sDom: 'rt<"bottom"p><"clear">',
      language: {
        "sInfoEmpty": 'No entries to show',
        "sEmptyTable": 'There are no followers to show.'
      },
      "deferRender": true,
      "autoWidth": false,
      aoColumns: [
        {
          "sWidth": "225px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "100px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "50px",
          "sClass": "text-center",
          "bSortable": false,
          "bVisible": true
        },
        {
          "bVisible": false
        }
      ],
      sAjaxSource: $('#twitter_followers').data('source'),
      drawCallback: function( settings ) {
        var api = this.api();
        var info = api.page.info();
        if (info.recordsTotal <= info.length) {
          $("#twitter_datatable .dataTables_paginate").hide();
        }
        else{
          $("#twitter_datatable .dataTables_paginate").show();
        }
        // DataTable Custom Select Option
        $('#dataTablesInfo').html(
          'Showing '+(info.start+1)+' - '+info.end+ ' of ' +info.recordsTotal+' documents'
        );
      }
    });
    var twitterTableApi = twitterTable.api();
    // DataTable Custom Search
    $('#twitterFollowerSearch').keyup(function(){
      twitterTableApi.search($(this).val()).draw();
    });
    $('#twitterScreenName').on('change', function() {
      var element = $(this);
      var id = element.val();
      if (id == "") {
        twitterTableApi.ajax.url("/admin/twitter.json").load();
        $('#twitterUpdateLink').html("");
      } else {
        var name = element.find("option:selected").text();
        twitterTableApi.ajax.url("/admin/twitter/"+id+"/followers.json").load();
        $('#twitterUpdateLink').html(
          $('<a>', {href: "/admin/twitter/"+id+"/job"})
            .addClass('update-tweet-confirmation')
            .css("text-decoration", "underline")
            .attr("data-name", name)
            .text("Update '"+name+"' Followers List")
        );
      }
    });
    $.fn.changeDataTableLength = function(length) {
      twitterTableApi.page.len(length).draw();
    }
    $(document).on('click', '.update-tweet-confirmation', function () {
      var screenName = $(this).attr("data-name");
      return confirm('Are you sure want to update the twitter user "'+screenName+'"?');
    });
    // setInterval(function() {
    //   twitterTableApi.ajax.reload();
    // }, 15000);
  }
  if ( $('#inbound_form').length > 0 ) {
    $('#inbound_form').parsley();
  }
  if ($('#inbound_followers').length > 0) {
    var inboundTable = $('#inbound_followers').dataTable({
      sPaginationType: "simple_numbers",
      bInfo: true,
      bProcessing: true,
      bServerSide: true,
      sDom: 'rt<"bottom"p><"clear">',
      language: {
        "sInfoEmpty": 'No entries to show',
        "sEmptyTable": 'There are no Inbound users to show.'
      },
      "deferRender": true,
      "autoWidth": false,
      aoColumns: [
        {
          "sWidth": "200px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "100px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "100px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "200px",
          "bSortable": false,
          "bVisible": true
        }
      ],
      sAjaxSource: $('#inbound_followers').data('source'),
      drawCallback: function( settings ) {
        var api = this.api();
        var info = api.page.info();
        if (info.recordsTotal <= info.length) {
          $("#inbound_datatable .dataTables_paginate").hide();
        }
        else{
          $("#inbound_datatable .dataTables_paginate").show();
        }
        // DataTable Custom Select Option
        $('#dataTablesInfo').html(
          'Showing '+(info.start+1)+' - '+info.end+ ' of ' +info.recordsTotal+' documents'
        );
      }
    });
    var inboundTableApi = inboundTable.api();
    // DataTable Custom Search
    $('#inboundFollowerSearch').keyup(function(){
      var search = $('#inboundFollowerSearch').val()
      var search2 = $('#inboundFollowerSearch2').val()
      var query = search.concat(":select:",search2);
      inboundTableApi.search(query).draw();
    });
    $('#inboundFollowerSearch2').change(function(){
      var search = $('#inboundFollowerSearch').val()
      var search2 = $('#inboundFollowerSearch2').val()
      var query = search.concat(":select:",search2);
      search2 = parseInt(search2);
      if (search2 > 4) {
        document.getElementById('inboundFollowerSearch').placeholder = 'For example, 0-100';
      } else {
        document.getElementById('inboundFollowerSearch').placeholder = 'Search';
      }
      inboundTableApi.search(query).draw();
    });
    $.fn.changeDataTableLength = function(length) {
      inboundTableApi.page.len(length).draw();
    }
    $(document).on("click", ".inbound-user-update", function() {
      inboundTableApi.ajax.reload();
    });
    $(document).on("click", ".inbound-user-modal", function() {
      var user_id = $(this).data("user-id");
      $.get("/admin/inbound/"+user_id);
    });
  }
  if ($('#concierge').length > 0) {
    var conciergeTable = $('#concierge').dataTable({
      sPaginationType: "simple_numbers",
      bInfo: true,
      bProcessing: true,
      bServerSide: true,
      sDom: 'rt<"bottom"p><"clear">',
      language: {
        "sInfoEmpty": 'No entries to show',
        "sEmptyTable": 'There are no concierge users to show.'
      },
      "iDisplayLength": 20,
      "deferRender": true,
      "autoWidth": false,
      aoColumns: [
        {
          "sWidth": "50px",
          "sClass": "text-center",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "250px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "170px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "bSortable": false,
          "bVisible": true
        },
        {
          "sWidth": "70px",
          "bSortable": true,
          "bVisible": true
        }
      ],
      sAjaxSource: $('#concierge').data('source'),
      drawCallback: function( settings ) {
        var api = this.api();
        var info = api.page.info();
        if (info.recordsTotal <= info.length) {
          $("#concierge_datatable .dataTables_paginate").hide();
        } else{
          $("#concierge_datatable .dataTables_paginate").show();
        }
        // DataTable Custom Select Option
        $('#dataTablesInfo').html(
          'Showing '+(info.start+1)+' - '+info.end+ ' of ' +info.recordsTotal+' records'
        );
      }
    });
    var conciergeTableApi = conciergeTable.api();
    // DataTable Custom Search
    $('#conciergeSearch').keyup(function(){
      conciergeTableApi.search($(this).val()).draw();
    });
    $.fn.changeDataTableLength = function(length) {
      conciergeTableApi.page.len(length).draw();
    }
    $(document).on("click", ".concierge-table-update", function() {
      conciergeTableApi.ajax.reload();
    });
  }
  if ($('#twitter_tweets').length > 0) {
    var tweetsTable = $('#twitter_tweets').dataTable({
      sPaginationType: "simple_numbers",
      bInfo: true,
      bProcessing: true,
      bServerSide: true,
      sDom: 'rt<"bottom"p><"clear">',
      language: {
        "sInfoEmpty": 'No entries to show',
        "sEmptyTable": 'There are no Inbound users to show.'
      },
      "deferRender": true,
      "autoWidth": false,
      aoColumns: [
        {
          "sWidth": "200px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "100px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "100px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "200px",
          "bSortable": false,
          "bVisible": true
        }
      ],
      sAjaxSource: $('#twitter_tweets').data('source'),
      drawCallback: function( settings ) {
        var api = this.api();
        var info = api.page.info();
        if (info.recordsTotal <= info.length) {
          $("#tweets_datatable .dataTables_paginate").hide();
        }
        else{
          $("#tweets_datatable .dataTables_paginate").show();
        }
        // DataTable Custom Select Option
        $('#dataTablesInfo').html(
          'Showing '+(info.start+1)+' - '+info.end+ ' of ' +info.recordsTotal+' documents'
        );
      }
    });
    var tweetsTableApi = tweetsTable.api();
    // DataTable Custom Search
    $('#twitterTweetSearch').keyup(function(){
      var search = $(this).val()
      tweetsTableApi.search(search).draw();
    });
    $.fn.changeDataTableLength = function(length) {
      tweetsTableApi.page.len(length).draw();
    }
    $(document).on("click", ".twitter-tweets-update", function() {
      tweetsTableApi.ajax.reload();
    });
  }
  if ($('#twitter_tweets_all').length > 0) {
    var tweetsAllTable = $('#twitter_tweets_all').dataTable({
      sPaginationType: "simple_numbers",
      bInfo: true,
      bProcessing: true,
      bServerSide: true,
      sDom: 'rt<"bottom"p><"clear">',
      language: {
        "sInfoEmpty": 'No entries to show',
        "sEmptyTable": 'There are no Inbound users to show.'
      },
      "deferRender": true,
      "autoWidth": false,
      aoColumns: [
        {
          "sWidth": "800px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "150px",
          "bSortable": true,
          "bVisible": true
        },
        {
          "sWidth": "200px",
          "bSortable": false,
          "bVisible": true
        }
      ],
      sAjaxSource: $('#twitter_tweets_all').data('source'),
      drawCallback: function( settings ) {
        var api = this.api();
        var info = api.page.info();
        if (info.recordsTotal <= info.length) {
          $("#twitter_tweets_all .dataTables_paginate").hide();
        }
        else{
          $("#twitter_tweets_all .dataTables_paginate").show();
        }
        // DataTable Custom Select Option
        $('#dataTablesInfo0').html(
          'Showing '+(info.start+1)+' - '+info.end+ ' of ' +info.recordsTotal+' documents'
        );

      }
    });
    var tweetsAllTableApi = tweetsAllTable.api();
    // DataTable Custom Search
    $('#twitterTweetAllSearch').keyup(function(){
      var search = $(this).val()
      tweetsAllTableApi.search(search).draw();
    });
    $.fn.changeDataTableLength = function(length) {
      tweetsAllTableApi.page.len(length).draw();
    }
  }
});

