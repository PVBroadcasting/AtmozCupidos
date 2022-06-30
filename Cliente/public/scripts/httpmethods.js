var Executing = false;

function HTTP_POST(url, data, callback) {
  showLoading(true);
  if (Executing == false) {
        Executing = true;
        try {
            $.ajax({
                type: 'POST',
                url: url,
                data: data
            })
                .done(function (data, textStatus, jqXHR) {
                    Executing = false;
                    if (data.Success == false) {
                        showLoading(false);
                        showError(data);
                    }
                    else {
                        showLoading(false);
                        if (callback != undefined) {
                            callback(data);
                        }
                    }
                })
                .fail(function (xhr, textStatus, errorThrown) {
                    Executing = false;
                    showLoading(false);
                    showError(xhr.responseText);
                });
        } catch (error) {
            Executing = false;
            showLoading(false);
        }
    }
}

function HTTP_GET(url, div_html, callback, data, showSpiners) {
    try {
        if (showSpiners == undefined) { showLoading(true)  } else { if (showSpiners == true) { showLoading(true) } }
        $.get(url, data, function () {
        })
            .done(function (response) {
                if (showSpiners == undefined) { showLoading(false)  } else { if (showSpiners == true) { showLoading(false) } }
                if (response.Success || div_html != undefined) {
                    if (div_html != undefined) {
                        $("#" + div_html).html(response);
                    }
                    if (callback != undefined) {
                        callback(response);
                    }
                } else {
                    showError(response);
                }
            })
            .fail(function (xhr, textStatus, errorThrown) {
                if (showSpiners == undefined) { showLoading(false) } else { if (showSpiners == true) { showLoading(false)  } }
                showError(xhr.responseText);
            })
    } catch (error) {
        showLoading(false);
    }
}

function showError(response, callback) {
    swal(response == undefined ? "There was a error processing the request" : response.Message, {
        icon: "warning",
    });
    if (callback != undefined) {
      
    }
}

function showSuccess(response, callback) {
    if (response.Success) {
        swal(response == undefined ? "There was a error processing the request" : response.Message, {
            icon: "success",
        })
        if (callback != undefined) {
            callback();
        }
    }
    else {
        swal(response == undefined ? "There was a error processing the request" : response.Message, {
            icon: "warning",
        });
        if (callback != undefined) {
            callback();
        }
    }
}
