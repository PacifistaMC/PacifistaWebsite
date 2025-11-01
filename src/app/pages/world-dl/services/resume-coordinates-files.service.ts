import {Injectable} from "@angular/core";
import {PacifistaPlayerDataDTO} from "@funixproductions/funixproductions-requests";
import ClaimDto from "../api/dtos/claim.dto";
import HomeDto from "../api/dtos/home.dto";
import McaService from "./mca.service";

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

    public toBlob(): Blob {
        let csvContent = "Pseudo,Type,Nom,X,Y,Z,Serveur Alpha\n";

        this.resume.forEach(playerData => {
            playerData.claims.forEach(claim => {
                csvContent += `${playerData.player.minecraftUsername},Claim,N/A,${claim.lesserBoundaryCornerX},0,${claim.lesserBoundaryCornerZ},${McaService.isWorldUuidAlpha(claim.worldId) ? 'Oui' : 'Non'}\n`;
            });
            playerData.homes.forEach(home => {
                csvContent += `${playerData.player.minecraftUsername},Home,${home.name},${home.x},${home.y},${home.z},${McaService.isWorldUuidAlpha(home.worldUuid) ? 'Oui' : 'Non'}\n`;
            });
        });

        const encodedUri = encodeURI(csvContent);
        return new Blob([decodeURIComponent(encodedUri)], { type: 'text/csv;charset=utf-8;' });
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