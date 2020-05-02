import { Controller } from "@lib/common"

@Controller("/accounts")
export class AccountController {
  public test() {
    return "Hello from AccountController"
  }
}
