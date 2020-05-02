interface RouteDefinition {
  methodName: string | symbol
  path: string
  requestMethod: string
}

function routeDecorator(
  path: string = "/",
  requestMethod: string,
): MethodDecorator {
  return (target: Object, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata("routes", target.constructor)) {
      Reflect.defineMetadata("routes", [], target.constructor)
    }

    const routes = Reflect.getMetadata("routes", target.constructor) as Array<
      RouteDefinition
    >

    routes.push({
      methodName: propertyKey,
      path: path,
      requestMethod: requestMethod,
    })

    Reflect.defineMetadata("routes", routes, target.constructor)
  }
}

export const Delete = (path: string) => routeDecorator(path, "DELETE")
export const Get = (path: string) => routeDecorator(path, "GET")
export const Options = (path: string) => routeDecorator(path, "OPTIONS")
export const Post = (path: string) => routeDecorator(path, "POST")
export const Put = (path: string) => routeDecorator(path, "PUT")
