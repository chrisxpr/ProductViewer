import axios from 'axios';
import { unexpectedError } from './unexpectedError.js';

const defaultOptions = {
  contentType: 'application/json',
};

export class ApiHelper {
  constructor(props) {
    this.configuration = props.configuration;

    this.createRequestHeaders = this.createRequestHeaders.bind(this);
    this.createCallProperties = this.createCallProperties.bind(this);
    this.prepareRequest = this.prepareRequest.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.get = this.get.bind(this);
    this.delete = this.delete.bind(this);
  }

  createRequestHeaders = (options) => {
    let headers = {
      'Content-Type': options.contentType,
    };

    if (options.connectType === 'FRONT_CHANNEL') {
      var corsHeader = { 'Access-Control-Allow-Origin': '*' };
      headers = { ...headers, ...corsHeader };
    }

    return headers;
  };

  createCallProperties = (headers) => {
    if (!this.configuration.apiUrl) {
      throw new Error(
        'Unable to read property apiUrl please check your configuration file'
      );
    }

    return {
      baseURL: this.configuration.apiUrl,
      timeout: this.configuration.timeout,
      headers: headers,
    };
  };

  prepareRequest = (uri, method, options) => {
    const headers = this.createRequestHeaders(options);
    const callParams = this.createCallProperties(headers);
    const actionUri = uri;

    console.log(`method:${method} and actionUri: ${actionUri}`);

    return { actionUri, callParams };
  };

  post = async (message, uri, options) => {
    try {
      const callOptions = { ...defaultOptions, ...options };
      const { actionUri, callParams } = this.prepareRequest(
        uri,
        'post',
        callOptions
      );
      return await axios.post(actionUri, message, callParams);
    } catch (error) {
      return unexpectedError(error);
    }
  };

  put = async (message, uri, options) => {
    try {
      const callOptions = { ...defaultOptions, ...options };
      const { actionUri, callParams } = this.prepareRequest(
        uri,
        'put',
        callOptions
      );
      return await axios.put(actionUri, message, callParams);
    } catch (error) {
      return unexpectedError(error);
    }
  };

  get = async (uri, options) => {
    try {
      const callOptions = { ...defaultOptions, ...options };

      const { actionUri, callParams } = this.prepareRequest(
        uri,
        'get',
        callOptions
      );
      return await axios.get(actionUri, callParams);
    } catch (error) {
      return unexpectedError(error);
    }
  };

  delete = async (uri, options) => {
    try {
      const callOptions = { ...defaultOptions, ...options };

      const { actionUri, callParams } = this.prepareRequest(
        uri,
        'delete',
        callOptions
      );
      return await axios.delete(actionUri, callParams);
    } catch (error) {
      return unexpectedError(error);
    }
  };
}
