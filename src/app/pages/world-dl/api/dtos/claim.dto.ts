import {ApiDTO, PacifistaServerType} from "@funixproductions/funixproductions-requests";

export default class ClaimDto extends ApiDTO {
    serverType!: PacifistaServerType
    worldId!: string
    lesserBoundaryCornerX!: number
    lesserBoundaryCornerZ!: number
    greaterBoundaryCornerX!: number
    greaterBoundaryCornerZ!: number
}
