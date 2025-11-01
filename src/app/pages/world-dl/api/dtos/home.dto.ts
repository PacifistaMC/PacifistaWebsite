import {ApiDTO, PacifistaServerType} from "@funixproductions/funixproductions-requests";

export default class HomeDto extends ApiDTO {
    name!: string
    worldUuid!: string
    serverType!: PacifistaServerType
    x!: number
    y!: number
    z!: number
}
