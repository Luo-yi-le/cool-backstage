import { BaseService } from "./base";

// @ts-ignore
export const service = {
	request: new BaseService().request
};

export * from "./base";
