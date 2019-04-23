import $ from 'jquery';
import _ from 'lodash';

const dom = $('<div>');
dom.html(_.join(['dell', 'lee'], '---'));
$('body').append(dom);