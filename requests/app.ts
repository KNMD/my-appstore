import Base from "./base"

class AppApi extends Base {
    async getApp(id) {
        return this.get(`/api/manifest?appId=${id}`)
    }
}

export default new AppApi;