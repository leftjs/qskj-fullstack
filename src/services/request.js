/**
 * Created by jason on 6/2/16.
 */
import qs from 'query-string';
import config from '../config';
import fetch from 'isomorphic-fetch'

const urlPrefix = config.domain;


function filterJSON(res) {
	return res.json();
}


function filterStatus(res) {

	console.log('filterStatus', res)
	if (res.status >= 200 && res.status < 400) {
		return res
	}
	else {
		let error = new Error(res.statusText);
		error.res = res.json()
		error.type = 'http';
		throw error;
	}
}



export function get(url,params,headers) {
	url = urlPrefix + url;
	if (params) {
		url += `?${qs.stringify(params)}`;
	}


	console.info(`GET: `, url);
	console.info(`Params: `, params)

	return fetch(url, {
		method: 'GET',
		headers: {
			...headers
		},
	})
		.then(filterStatus)
		.then(filterJSON);
}
export function remove(url,params,headers) {
	url = urlPrefix + url;
	if (params) {
		url += `?${qs.stringify(params)}`;
	}

	console.info(`Delete: `, url);
	console.info(`Params: `, params)

	return fetch(url, {
		method: 'DELETE',
		headers: {
			...headers
		}
	})
		.then(filterStatus)
		.then(filterJSON);
}


export function post(url, body, headers) {
	url = urlPrefix + url;

	console.info(`POST: `, url);
	console.info(`Body: `, body)
	console.info(`Headers: `, headers)

	return fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}


export function put(url, body, headers) {
	url = urlPrefix + url;

	console.info(`PUT: `, url);
	console.info(`Body: `, body)
	console.info(`Headers: `, headers)

	return fetch(url, {
		method: 'PUT',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			...headers
		},
		body: JSON.stringify(body)
	})
		.then(filterStatus)
		.then(filterJSON);
}


export function postFormData(url, body, headers) {
	url = urlPrefix + url;

	console.info(`POST: `, url);
	console.info(`Body: `, body)
	console.info(`Headers: `, headers)

	return fetch(url, {
		method: 'POST',
		headers: {
			...headers
		},
		body: body
	})
		.then(filterStatus)
		.then(filterJSON);
}


export function upload(url, data) {
	url = urlPrefix + url;

	console.info(`POST: `, url);
	console.info(`Body: `, data)

	return fetch(url, {
		method: 'POST',
		body: data,

	})
		.then(filterStatus)
		.then(filterJSON);
}




