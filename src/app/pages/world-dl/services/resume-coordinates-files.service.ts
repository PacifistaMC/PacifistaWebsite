import {Injectable} from "@angular/core";
import {PacifistaPlayerDataDTO} from "@funixproductions/funixproductions-requests";
import ClaimDto from "../api/dtos/claim.dto";
import HomeDto from "../api/dtos/home.dto";

@Injectable()
export class ResumeCoordinatesFilesService {

    resume: PlayerResumeCoordinatesData[] = []

    public addClaim(player: PacifistaPlayerDataDTO, claim: ClaimDto) {
        let playerData = this.resume.find(p => p.player.minecraftUuid === player.minecraftUuid)

        if (!playerData) {
            playerData = new PlayerResumeCoordinatesData(player)
            this.resume.push(playerData)
        }
        playerData.addClaim(claim)
    }

    public addHome(player: PacifistaPlayerDataDTO, home: HomeDto) {
        let playerData = this.resume.find(p => p.player.minecraftUuid === player.minecraftUuid)

        if (!playerData) {
            playerData = new PlayerResumeCoordinatesData(player)
            this.resume.push(playerData)
        }
        playerData.addHome(home)
    }

}

export class PlayerResumeCoordinatesData {

    player: PacifistaPlayerDataDTO
    claims: ClaimDto[]
    homes: HomeDto[]

    constructor(player: PacifistaPlayerDataDTO, claims: ClaimDto[] = [], homes: HomeDto[] = []) {
        this.player = player
        this.claims = claims
        this.homes = homes
    }

    addClaim(claim: ClaimDto) {
        this.claims.push(claim)
    }

    addHome(home: HomeDto) {
        this.homes.push(home)
    }

}