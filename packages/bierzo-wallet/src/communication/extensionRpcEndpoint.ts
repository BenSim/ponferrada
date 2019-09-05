/*global chrome*/
import { Identity, isIdentity, TransactionId } from "@iov/bcp";
import { TransactionEncoder } from "@iov/encoding";
import { isJsonRpcErrorResponse, JsonRpcRequest, parseJsonRpcResponse } from "@iov/jsonrpc";

import { getConfig } from "../config";
import { GetIdentitiesResponse, RpcEndpoint, SignAndPostResponse } from "./rpcEndpoint";

function isExtensionContext(): boolean {
  return typeof chrome.runtime !== "undefined" && typeof chrome.runtime.sendMessage !== "undefined";
}

function isArrayOfIdentity(data: any): data is readonly Identity[] {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every(isIdentity);
}

function parseGetIdentitiesResponse(response: any): readonly Identity[] {
  const parsedResponse = parseJsonRpcResponse(response);
  if (isJsonRpcErrorResponse(parsedResponse)) {
    console.error(parsedResponse.error.message);
    throw new Error("Received unexpected json rpc response");
  }

  const parsedResult = TransactionEncoder.fromJson(parsedResponse.result);
  if (!isArrayOfIdentity(parsedResult)) {
    throw new Error("Got unexpected type of result");
  }

  return parsedResult;
}

export const extensionRpcEndpoint: RpcEndpoint = {
  notAvailableMessage: "You need to install IOV extension.",
  noMatchingIdentityMessage: "Please login to the IOV extension to continue.",
  sendGetIdentitiesRequest: async (request: JsonRpcRequest): Promise<GetIdentitiesResponse | undefined> => {
    if (!isExtensionContext()) return undefined;

    const config = await getConfig();

    return new Promise(resolve => {
      chrome.runtime.sendMessage(config.extensionId, request, response => {
        if (response === undefined) {
          resolve(undefined);
          return;
        }

        try {
          const identities = parseGetIdentitiesResponse(response);
          resolve(identities);
        } catch (error) {
          console.error(error);
          resolve([]);
        }
      });
    });
  },
  sendSignAndPostRequest: async (request: JsonRpcRequest): Promise<SignAndPostResponse | undefined> => {
    if (!isExtensionContext()) return undefined;

    const config = await getConfig();

    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(config.extensionId, request, response => {
        try {
          const parsedResponse = parseJsonRpcResponse(response);
          if (isJsonRpcErrorResponse(parsedResponse)) {
            reject(parsedResponse.error.message);
            return;
          }

          const parsedResult = TransactionEncoder.fromJson(parsedResponse.result);
          if (typeof parsedResult === "string") {
            resolve(parsedResult as TransactionId);
          } else if (parsedResult === null) {
            resolve(null);
          } else {
            reject("Got unexpected type of result");
          }
        } catch (error) {
          reject(error);
        }
      });
    });
  },
};
