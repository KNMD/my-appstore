import axios from 'axios';


export default class Base {
  private _http: any;
  constructor(config = {}) {
    this._http = axios.create(Object.assign({
      baseURL: "",
      timeout: 10 * 60 * 1000,
      withCredentials: false
    }, config))
    this._http.interceptors.request.use(
      (request) => {
        request.headers['X-GW-CONSUMER-USER-ID'] = 'test'
        return request
      },
    )
    this._http.interceptors.response.use(function (res) {
      if(res.data.status && res.data.status !== 200) {
        console.error("res:::", res.data)
      }
      return res.data
    }, err => {
      console.error("err:::", [err])
      
      return err
    })
  }

  async get(url: string, options: any = {}) {
    options = Object.assign({
      headers: { 
        ...(options.headers || {})
      }
    }, options)
    return this._http.get(url, options)
  }
}
