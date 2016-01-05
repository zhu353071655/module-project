define(function (require, exports) {

    var commonErrors = require('./commonErrors');

    /**
     * 发送 post 请求
     *
     * @inner
     * @param {string} url 请求 url
     * @param {Object} data 发送的数据
     * @param {Object=} options
     * @property {boolean} options.sync 是否是同步请求
     * @property {Object=} options.errorHandler 自定义 error 处理
     *
     * @return {Promise}
     */
    exports.post = function (url, data, options) {
        options = options || {};
        data = data || {};
        return $.ajax({
            url: url,
            data: JSON.stringify(data),
            method: 'POST',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            async: options.sync ? false : true,
            timeout: 20000,
            beforeSend: options.beforeSend || function () {
                var time = new Date().getTime();
                options._time = time;
                options.holder && options.holder.append('<div class="data-loading data-loading-' + time + '">').addClass('data-loading-relative');
            }
        }).pipe(function (response) {
            options.holder && options.holder.removeClass('data-loading-relative').find('.data-loading-' + options._time).remove();
            if (response.status === 200) {
                return response;
            } else {
                var deferred = $.Deferred();
                if (commonErrors[response.status]) {
                    deferred.reject(response);
                } else {
                    deferred.reject(response);
                }
                return deferred.promise();
            }
        });
    }

    /**
     * 发送跨域的 jsonp请求
     *
     * @param  {string} url
     * @param  {Object} data
     * @return {Promise}
     */
    exports.jsonp = function (url, data, timeout) {
        return $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            timeout: timeout
        });
    };
});