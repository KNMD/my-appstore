import Base from "./base"

class AppApi extends Base {
    async getApp() {
        return this.get("/manifest.json")
    }
}

export default new AppApi;