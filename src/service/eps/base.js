// @ts-nocheck
import { isObject } from "lodash-es";
import service from "../../utils/request";

export function Service( value ) {
	return function (target) {
		// 命名
		if (typeof value == "string") {
			target.prototype.namespace = value;
		}

		// 复杂项
		if (isObject(value)) {
			target.prototype.namespace = value.namespace;
			target.prototype.mock = value.mock;

			// 代理
			if (value.url) {
                target.prototype.url = value.url;
            }
		}
	};
}

export class BaseService {
	constructor( options = {} ) {
		if (options?.namespace) {
			this.namespace = options.namespace;
		}
	}

	request(options = {}) {
		if (!options.params) options.params = {};

		let ns = "";


		// 拼接前缀
		if (this.namespace) {
			ns += "/" + this.namespace;
		}


		return service(options);
	}

	list(data) {
		return this.request({
			url: "/list",
			method: "POST",
			data
		});
	}

	page(data) {
		return this.request({
			url: "/page",
			method: "POST",
			data
		});
	}

	info(params) {
		return this.request({
			url: "/info",
			params
		});
	}

	update(data) {
		return this.request({
			url: "/update",
			method: "POST",
			data
		});
	}

	delete(data) {
		return this.request({
			url: "/delete",
			method: "POST",
			data
		});
	}

	add(data) {
		return this.request({
			url: "/add",
			method: "POST",
			data
		});
	}
}
