import express from "express"

export class HttpServer {
  private app: any
  private appModule: any

  constructor() {
    this.app = express()
  }

  public initialize(appModule: any) {
    this.appModule = appModule
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.appModule.controllers.foreach((controller: any) => {
      const instance = new controller()
      const prefix = Reflect.getMetadata("prefix", controller)
      const routes = Reflect.getMetadata("routes", controller)

      routes.foreach((route: any) => {
        this.app[route.requestMethod](
          prefix + route.path,
          (req: express.Request, res: express.Response) => {
            instance[route.methodName](req, res)
          },
        )
      })
    })
  }

  public listen(
    port: number,
    callback?: ((...args: any[]) => void) | undefined,
  ) {
    this.app.listen(port, callback)
  }
}
